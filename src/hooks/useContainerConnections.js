import { useEffect } from "react";
import * as PIXI from 'pixi.js';
import { useViewport } from '../hooks/useViewport';
import { useInventoryContainer } from '../hooks/useInventoryContainer'; // Import the hook

export const useContainerConnections = (appRef, stageRef, mainContainerRef, gridContainerRef, objectsContainerRef, inventoryContainerRef) => {
    // First, set up the inventory container
    useInventoryContainer(appRef, inventoryContainerRef); 

    const viewportRef = useViewport(appRef, stageRef);

    useEffect(() => {
        // Check for all null references before proceeding
        const refsToCheck = [viewportRef.current, stageRef.current, appRef.current.stage, gridContainerRef.current, objectsContainerRef.current];
        const refNames = ['viewportRef', 'stageRef', 'appRef.stage'];

        refsToCheck.forEach((ref, index) => {
            if (!ref) console.error(`${refNames[index]}.current is not initialized`);
        });

        // If all checks pass, then add viewportRef to the app's stage
        appRef.current.stage.addChild(viewportRef.current);
        appRef.current.stage.addChild(inventoryContainerRef.current);
        appRef.current.stage.sortableChildren = true;


        //move this to a new independent file
        const inventorySprite = PIXI.Sprite.from(process.env.PUBLIC_URL + '/InventoryBag.svg');
        inventorySprite.y = appRef.current.screen.height;
        console.log("inventorySpriteY:" + inventorySprite.y);

        // Add mainContainer to the viewport
        viewportRef.current.addChild(mainContainerRef.current);

        //z index specified to ensure loading order of objects on top
        mainContainerRef.current.addChildAt(gridContainerRef.current, 0);
        mainContainerRef.current.addChildAt(objectsContainerRef.current, 1);
        objectsContainerRef.current.name = 'ground';
    
    }, []);

};