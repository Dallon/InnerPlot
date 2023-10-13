import { useDispatch, useSelector } from 'react-redux';
import * as PIXI from 'pixi.js';
import { toggleInventory } from '../store/slices/inventorySlice';
import { useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';

const inventoryBoolean = createSelector(
  state => state.inventory.isInventoryOpen,
  isInventoryOpen => Object.values(isInventoryOpen)
);
export const useCreateInventoryIcon = (appRef) => {
    const dispatch = useDispatch();
    const isInventoryOpen = useSelector(inventoryBoolean);
    useEffect (() => {
        if (!appRef.current) {
          console.log("appRef is not current" + appRef.current);

          return;
        };
     
   const bag = process.env.PUBLIC_URL + '/inventoryBag.svg';
    const inventoryTexture = PIXI.Texture.from(bag);
    console.log(inventoryTexture);
    const inventorySprite = new PIXI.Sprite(inventoryTexture);

    // Position at the bottom of the app screen

    inventorySprite.x = appRef.current.screen.width - inventorySprite.width;
    inventorySprite.y = appRef.current.screen.height - inventorySprite.height;


    // Add interactivity
    inventorySprite.eventMode = 'dynamic';
    inventorySprite.buttonMode = true;
    inventorySprite.on('pointerdown', () => dispatch(toggleInventory()));

    // Add sprite to stage
    appRef.current.stage.addChild(inventorySprite);
    //if not appRef.current, nothing loads. not to be confused with appRef, which doesn't have a width value.
}, [appRef.current]);
}
