import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as PIXI from 'pixi.js';
import { usePixiApp } from '../hooks/usePixiApp';
import { useCreateIsoGrid } from '../hooks/useCreateIsoGrid';
import { useLoadItems } from '../hooks/useLoadItems';
import { useRemoveItems } from '../hooks/useRemoveItems';
import { useContainerConnections } from '../hooks/useContainerConnections';
import { useCenterContainers } from '../hooks/useCenterContainers';
import { useCreateInventoryIcon } from '../hooks/useCreateInventoryIcon';
import { useInventoryContainer } from '../hooks/useInventoryContainer';

const PixiCanvasComponent = () => {
    // load dispatch variable
    const dispatch = useDispatch();

    //create an app reference
    const appRef = usePixiApp();
    
       // Initialize stageRef with a new PIXI Container so it can be used in useEffects
       const stageRef = useRef(new PIXI.Container()); 


    //create a reference for the mainContainer
    const mainContainerRef = useRef(new PIXI.Container());
    mainContainerRef.name = 'mainContainer';

    //get the gridContainerRef
    const gridContainerRef = useRef(new PIXI.Container());
    gridContainerRef.name = 'gridContainer';

    //create a reference for the objectsContainer
    const objectsContainerRef = useRef(new PIXI.Container());
    objectsContainerRef.name = 'objectContainer';

    //create a reference to the item container for each item
    const itemContainerRefs = useRef();


    //create the inventory Icon, append to the app.
    useCreateInventoryIcon(appRef);

    //create a reference for the inventory container
    const inventoryContainerRef = useRef(new PIXI.Container());

    
    // This is the useEffect to render the isometric tiles using the loaded texture
   useCreateIsoGrid(gridContainerRef);

    //connect the app -> stage -> viewport -> main container -> grid container
    useContainerConnections(appRef, stageRef, mainContainerRef, gridContainerRef, objectsContainerRef, inventoryContainerRef); 
    
    //center the containers
    useCenterContainers(mainContainerRef, gridContainerRef);


    // Use the hook to load and display items on the object container
    useLoadItems(objectsContainerRef, itemContainerRefs);
    useRemoveItems(objectsContainerRef, itemContainerRefs);
  
  
    return (<div id="pixi-container">
    </div>);
}

export default PixiCanvasComponent;