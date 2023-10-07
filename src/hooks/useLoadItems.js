// useLoadItems.js
import { useEffect } from 'react';
import * as PIXI from 'pixi.js';
import { useSelector, useDispatch } from 'react-redux';
import { loadSVGAsTexture } from '../utils/loadSVGAsTexture';
import { addInventoryItem, removeObject } from '../store/slices/gameStateSlice';
import { createSelector } from 'reselect';

const selectObjectsById = createSelector(
  state => state.gameState.objects.byId,
  byId => Object.values(byId),
);

export const useLoadItems = (containerRef) => {
  const dispatch = useDispatch();
  const itemsFromState = useSelector(selectObjectsById);

  useEffect(() => {
    containerRef.current.removeChildren();
    itemsFromState.forEach(async item => {
      // Convert Cartesian coordinates to isometric
      const isoX = (item.x - item.y) / 2;
      const isoY = (item.x + item.y) / 2;
      console.log("Is it duplicating?")

      try {
        const texture = await loadSVGAsTexture(item.url);
        const itemSprite = new PIXI.Sprite(texture);
        itemSprite.x = isoX;
        itemSprite.y = isoY;
        itemSprite.name = item.id;

        // Event Logic
        itemSprite.eventMode = 'dynamic';
        itemSprite.buttonMode = true;
        itemSprite.on('pointerdown', () => {
          dispatch(addInventoryItem({ id: item.id, type: item.type }));
          dispatch(removeObject(item.id));
        });

        // Add sprite to container
        containerRef.current.addChild(itemSprite);
        
      } catch (error) {
        console.error('Error in loading texture:', error);
      }
    });
  }, [itemsFromState, containerRef.current]);
};
