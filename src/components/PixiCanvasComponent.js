import React, { useRef, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as PIXI from 'pixi.js';
import { useViewport } from '../hooks/useViewport';
import { usePixiApp } from '../hooks/usePixiApp';
import { useLoadSVG } from '../hooks/useLoadSVG';
import { useCreateIsoGrid } from '../hooks/useCreateIsoGrid';
import { useLoadItems } from '../hooks/useLoadItems';
import { useRemoveItems } from '../hooks/useRemoveItems';
import { useContainerConnections } from '../hooks/useContainerConnections';
import { useCenterContainers } from '../hooks/useCenterContainers';
import { useCreateInventoryIcon } from '../hooks/useCreateInventoryIcon';

const PixiCanvasComponent = () => {
    // load dispatch variable
    const dispatch = useDispatch();

    //create an app reference
    const appRef = usePixiApp();

    // Initialize stageRef with a new PIXI Container so it can be used in useEffects
    const stageRef = useRef(new PIXI.Container());

    //create a reference for the mainContainer
    const mainContainerRef = useRef(new PIXI.Container());

    //get the viewport Ref
    const viewportRef = useViewport(appRef, stageRef);

    //get the gridContainerRef
    const gridContainerRef = useRef(new PIXI.Container());

    const [texture, setTexture] = useState(null);

    // Define the tile width and height according to your requirements
    const tileWidth = 64; // or your specific value
    const tileHeight = 64; // or your specific value

    //declaring the svgURL and the useLoadSVG hook outside the useEffect below
    const svgURL = process.env.PUBLIC_URL + '/squareIsoTest4.svg';

        const handleTextureLoaded = useCallback((newlyLoadedTexture) => {
        setTexture(newlyLoadedTexture); // Or do something else
    }, []);


    const loadedTexture = useLoadSVG(svgURL, handleTextureLoaded);
   

    //create a reference for the objectsContainer
    const objectsContainerRef = useRef(new PIXI.Container());
    useCreateInventoryIcon(appRef);
    
    // This is the useEffect to render the isometric tiles using the loaded texture
   useCreateIsoGrid(gridContainerRef, texture, tileWidth, tileHeight);

    //connect the app -> stage -> viewport -> main container -> grid container
    useContainerConnections(viewportRef, stageRef, appRef, mainContainerRef, gridContainerRef, objectsContainerRef); 
   

    useCenterContainers(mainContainerRef, gridContainerRef);



    // Use the hook to load and display items on the object container
    useLoadItems(objectsContainerRef);
    useRemoveItems(objectsContainerRef);
  
  
    return (<div id="pixi-container">
    </div>);
}

export default PixiCanvasComponent;