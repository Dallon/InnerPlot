import { useEffect, useRef } from "react";
import * as PIXI from 'pixi.js';
import { useViewport } from '../hooks/useViewport';
import { useInventoryContainer } from '../hooks/useInventoryContainer'; // Import the hook
import { useCreateIsoGrid } from "./useCreateIsoGrid";
import { useCreateInteractiveGrid } from "./useCreateInteractiveGrid";
import { useContext } from "react";
import AppContext from "../contexts/AppContext";

export const useContainerConnections = (mainContainerRef, objectsContainerRef, texture) => {
    
    const { appRef, inventoryContainerRef } = useContext(AppContext);

    // Initialize stageRef with a new PIXI Container so it can be used in useEffects
    const stageRef = useRef(new PIXI.Container());
    const UIContainerRef = useRef(new PIXI.Container());
   
    //get the gridContainerRef
    const gridContainerRef = useRef(new PIXI.Container());
    gridContainerRef.name = 'gridContainer';

    const gameContainerRef = useRef(new PIXI.Container());
    // This is the useEffect to render the isometric tiles using the loaded texture
    useCreateIsoGrid(gridContainerRef, texture);

    //the interactive grid goes on top of the isometric grid
    const interactiveGridContainerRef = useRef(new PIXI.Container());
    useCreateInteractiveGrid(interactiveGridContainerRef)

    const viewportRef = useViewport(appRef, stageRef);

    useEffect(() => {

        console.log(`container connections hook is running`);//debugging
        // Check for all null references before proceeding
        const refsToCheck = [viewportRef.current, stageRef.current, appRef.current, gridContainerRef.current, objectsContainerRef.current];
        const refNames = ['viewportRef', 'stageRef', 'appRef.current', 'gridContainerRef', 'objectsContainerRef'];

        refsToCheck.forEach((ref, index) => {
            if (!ref) console.error(`${refNames[index]}.current is not initialized`);
        });

        // If all checks pass, then add viewportRef to the app's stage
        appRef.current.stage.addChild(viewportRef.current);
        appRef.current.stage.addChild(inventoryContainerRef.current);

        //move this to a new independent file
        const inventorySprite = PIXI.Sprite.from(process.env.PUBLIC_URL + '/InventoryBag.svg');
        inventorySprite.y = appRef.current.screen.height;

        // Add mainContainer to the viewport
        viewportRef.current.addChild(mainContainerRef.current);

        //z index specified to ensure loading order of objects on top
        mainContainerRef.current.addChildAt(gameContainerRef.current, 0);
        mainContainerRef.current.addChildAt(UIContainerRef.current, 1);
        gameContainerRef.current.addChildAt(gridContainerRef.current, 0);
        gameContainerRef.current.addChildAt(interactiveGridContainerRef.current, 1);
        gameContainerRef.current.addChildAt(objectsContainerRef.current, 2);
        gameContainerRef.current.sortableChildren = true;

        objectsContainerRef.current.name = 'ground';


    }, []);

};