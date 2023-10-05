import { useEffect } from "react";
import * as PIXI from 'pixi.js';
export const useContainerConnections = (viewportRef, stageRef, appRef, mainContainerRef, gridContainerRef) => {

    // Main setup
    useEffect(() => {
        // Check for all null references before proceeding
        const refsToCheck = [viewportRef.current, stageRef.current, appRef.current.stage];
        const refNames = ['viewportRef', 'stageRef', 'appRef.stage'];

        refsToCheck.forEach((ref, index) => {
            if (!ref) console.error(`${refNames[index]}.current is not initialized`);
        });

        // If all checks pass, then add viewportRef to the app's stage
        appRef.current.stage.addChild(viewportRef.current);
        const uiContainer = new PIXI.Container();
        appRef.current.stage.addChild(uiContainer);
        const inventorySprite = PIXI.Sprite.from(process.env.PUBLIC_URL + '/InventoryBag.svg');
        inventorySprite.y = appRef.current.screen.height;
        console.log("inventorySpriteY:" +inventorySprite.y);
     

        // Add mainContainer to the viewport
        viewportRef.current.addChild(mainContainerRef.current);

        mainContainerRef.current.addChild(gridContainerRef.current);



    }, []);

};