// useCreateInventoryContainer.js
import { useEffect } from 'react';
import * as PIXI from 'pixi.js';
import { useSelector } from 'react-redux';


 let initialized = false;

 export const useInventoryContainer = (appRef, inventoryContainerRef) => {
     const inventoryOpen = useSelector(state => state.inventory.isInventoryOpen);
 
     useEffect(() => {
         if (!appRef.current) {
             console.error("App is not initialized.");
             return;
         }
 
         if (!initialized) {
             initialized = true;
 
             // Create background
             const graphics = new PIXI.Graphics();
             graphics.beginFill(0xFFFFFF, 0.2);
             graphics.drawRect(0, 0, 500, 300);
             graphics.endFill();
             inventoryContainerRef.current.addChild(graphics);
             
             // Initialize your grid and other components here.
 
             // Add to stage only once.
             appRef.current.stage.addChild(inventoryContainerRef.current);
         }
 
         // Toggle visibility and interactivity
         inventoryContainerRef.current.visible = inventoryOpen;
         inventoryContainerRef.current.interactive = inventoryOpen;
 
     }, [inventoryOpen]);
 };
 