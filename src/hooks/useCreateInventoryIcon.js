import { useDispatch } from 'react-redux';
import * as PIXI from 'pixi.js';
import { toggleInventory } from '../store/slices/inventorySlice';
import { useEffect, useContext } from 'react';
import AppContext from '../contexts/AppContext';
import { loadPNGAsTexture } from '../utils/loadPNGAsTexture'; 

export const useCreateInventoryIcon = () => {
  const { appRef } = useContext(AppContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!appRef.current) {
      console.log("appRef is not current" + appRef.current);
      return;
    }

    const bag = process.env.PUBLIC_URL + '/inventoryBag.svg';
    
    //utility function to load the texture
    loadPNGAsTexture(bag).then((inventoryTexture) => {
      const inventorySprite = new PIXI.Sprite(inventoryTexture);

      // Position at the bottom of the app screen
      inventorySprite.x = appRef.current.screen.width - inventorySprite.width;
      inventorySprite.y = appRef.current.screen.height - inventorySprite.height;

      // Add interactivity
      inventorySprite.interactive = true;
      inventorySprite.buttonMode = true;
      inventorySprite.on('pointerdown', () => dispatch(toggleInventory()));

      // Add sprite to stage
      appRef.current.stage.addChild(inventorySprite);
      
    }).catch((error) => {
      console.error('Error loading inventory icon:', error);
    });
  }, [appRef.current]); // Only re-run the effect if appRef.current changes
};
