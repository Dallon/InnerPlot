// useCreateInventoryContainer.js
import { useEffect } from 'react';
import * as PIXI from 'pixi.js';
import { useSelector } from 'react-redux';

export const useInventoryContainer = (appRef, inventoryContainerRef) => {
    const inventoryOpen = useSelector(state => state.inventory.isInventoryOpen);

    useEffect(() => {
        console.log(appRef.current.stage.children);
        if (!appRef.current) {
            console.error("App is not initialized.");
            return;
        }

        // Set Dimensions
       
        inventoryContainerRef.current.name = 'inventoryContainer';

     
        // set background color for inventory. Here this gets loaded every time we click the inventory which is bad.
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFFFF, 0.2); // Solid red for clear visibility
        graphics.drawRect(0, 0, 500, 300);
        graphics.endFill();
        inventoryContainerRef.current.addChild(graphics);
        graphics.interactive = true;
        graphics.on('pointerdown', () => {
            console.log("Inventory clicked!");
        });

        // Position the Container at the bottom center of the app screen:
        inventoryContainerRef.current.x = (appRef.current.screen.width / 2) - (inventoryContainerRef.current.width / 2);
        inventoryContainerRef.current.y = appRef.current.screen.height - inventoryContainerRef.current.height - 10; // 10px padding from bottom



        // Add/Remove the inventoryContainerRef to/from stage
        if (inventoryOpen) {
            console.log("test invent open in useInventoryContainer");
            if (!appRef.current.stage.children.includes(inventoryContainerRef.current)) {
                appRef.current.stage.addChild(inventoryContainerRef.current);
                console.log(inventoryContainerRef.current.visible, inventoryContainerRef.current.alpha);

            }
        } else {
            console.log("test invent closed in useInventoryContainer");
            if (appRef.current.stage.children.includes(inventoryContainerRef.current)) {
                appRef.current.stage.removeChild(inventoryContainerRef.current);
            }
        }
    }, [ inventoryOpen]);
};
