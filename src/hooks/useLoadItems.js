import { useEffect } from 'react';
import * as PIXI from 'pixi.js';
import { useSelector, useDispatch } from 'react-redux';
import { loadPNGAsTexture } from '../utils/loadPNGAsTexture';
import { removeObject } from '../store/slices/gameStateSlice';
import { addInventoryItem } from '../store/slices/inventorySlice';
import { createSelector } from 'reselect';

// Memoized selector to access the objects in gameState
const selectObjectsById = createSelector(
  state => state.gameState.objects.byId,
  byId => Object.values(byId),
);

export const useLoadItems = (containerRef, itemContainersRefs) => {
  const dispatch = useDispatch();
  const itemsFromState = useSelector(selectObjectsById);

  useEffect(() => {
    containerRef.current.removeChildren();

    itemsFromState.forEach(async (item) => {
      // Ensure there's a PIXI container for each item
      if (!itemContainersRefs[item.id]) {
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
        itemSprite.name = item.id;

        // Assign hitArea to the container to match the sprite's size
        itemContainer.hitArea = new PIXI.Rectangle(0, 0, itemSprite.width, itemSprite.height); 


        // Apply the pointerdown interaction to the container
        itemContainer.on('pointerdown', () => {
          dispatch(handleObjectClick(item.id));
        });

  
      } catch (error) {
        console.error('Error in loading texture:', error);
      }
    });
  }, [itemsFromState, containerRef, itemContainersRefs, dispatch]);
};
