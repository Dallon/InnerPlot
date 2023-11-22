import { useEffect } from 'react';
import * as PIXI from 'pixi.js';
import { loadPNGAsTexture } from '../utils/loadPNGAsTexture';
import { handleObjectClick } from '../store/thunks/handleObjectClickThunk';
import { useMemo } from 'react';
import { store } from '../store';

export const useLoadItems = (containerRef, itemContainersRefs) => {

  const itemsFromState = useMemo(() => {
    return Object.values(store.getState().itemState.objects.byId);
  }, [store.getState().itemState.objects.byId]);

  useEffect(() => {
    console.log(`useLoadItems Hook is running`);//debugging
    containerRef.current.removeChildren();

    //for each object in byId
    itemsFromState.forEach(async (item) => {
      // if itemContainerRefs array doesnt contain an object associated with key item.id
      if (!itemContainersRefs[item.id]) {
        //create a new item container, make it interactive, and attach the container to the array with key item.id
        const newItemContainer = new PIXI.Container();
        newItemContainer.interactive = true;  //Make the container interactive
        itemContainersRefs[item.id] = newItemContainer;
      }

      const itemContainer = itemContainersRefs[item.id];
      const isoX = (item.x - item.y) / 2;
      const isoY = (item.x + item.y) / 2;

      try {
        const texture = await loadPNGAsTexture(item.url);
        const itemSprite = new PIXI.Sprite(texture);
        itemSprite.x = isoX;
        itemSprite.y = isoY;
        itemSprite.id = item.id;

        // Assign hitArea to the container to match the sprite's size
        itemContainer.hitArea = new PIXI.Rectangle(0, 0, itemSprite.width, itemSprite.height);


        // Apply the pointerdown interaction to the container
        itemContainer.on('pointerdown', () => {
          console.log("itemSprite.id is " + item.id);
          const dispatchFn = handleObjectClick(item);
          dispatchFn(store.dispatch);

          // Remove the PixiJS container for this item
          itemContainer.removeChildren(); // This removes the sprite from the container
          containerRef.current.removeChild(itemContainer); // This removes the container from the PixiJS stage     
          delete itemContainersRefs[item.id]; //finally, delete the reference to the item id in the container ref.
        });

        itemContainer.addChild(itemSprite);
        containerRef.current.addChild(itemContainer);



      } catch (error) {
        console.error('Error in loading texture in useLoadItems:', error);
      }
    });
  }, []);
};
