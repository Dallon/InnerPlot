// useLoadItems.js
import { useEffect } from 'react';
import * as PIXI from 'pixi.js';
import { useSelector, useDispatch } from 'react-redux';
import { loadSVGAsTexture } from '../utils/loadSVGAsTexture';
import { addInventoryItem, removeObject } from '../store/slices/gameStateSlice';

export const useLoadItems = (containerRef) => {
  const dispatch = useDispatch();
  const itemsFromState = useSelector(state => Object.values(state.gameState.objects.byId));

  useEffect(() => {
    itemsFromState.forEach(async item => {
      // Convert Cartesian coordinates to isometric
      const isoX = (item.x - item.y) / 2;
      const isoY = (item.x + item.y) / 2;

      try {
        //load each item as a PIXI texture
        const texture = await loadSVGAsTexture(item.url);
        //create a pixi sprite from the texture
        const itemSprite = new PIXI.Sprite(texture);
        //Set the isometric position
        itemSprite.x = isoX;
        itemSprite.y = isoY;
        // Add click event to sprite (temporarily here)

        itemSprite.interactive = true;
        itemSprite.buttonMode = true;
        itemSprite.on('pointerdown', () => {
          dispatch(addInventoryItem({ id: item.id, type: item.type }));
          console.log("Dispatching removeObject with id:", item.id);
          dispatch(removeObject(item.id));
          console.log(itemSprite + "added to invent");
        });

        //Add sprite to container
        containerRef.current.addChild(itemSprite);
      } catch (error) {
        console.error('Error in loading texture:', error);
      }
    });
  }, [itemsFromState, containerRef.current]);
};
