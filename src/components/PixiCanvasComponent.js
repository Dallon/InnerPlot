import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as PIXI from 'pixi.js';
import { useViewport } from '../hooks/useViewport';
import { usePixiApp } from '../hooks/usePixiApp';
import { useLoadSVG } from '../hooks/useLoadSVG';
import { addPixiObject } from '../utils/pixiUtils';
import { useRenderIsometricTiles } from '../hooks/useRenderIsometricTiles';
import { useContainerConnections } from '../hooks/useContainerConnections';

const PixiCanvasComponent = () => {
    // Dispatch an action to the Redux store
    const dispatch = useDispatch();

    //Extract gameState from the Redux store, runs whenever the component renders
    //unless gameState hasnt changed since previous render
    const gameState = useSelector((state) => state.gameState);

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

    // Define the callback function here, right after your state and ref setup
    const handleTextureLoaded = useCallback((loadedTexture) => {
        setTexture(loadedTexture); // Or do something else
    }, []);

    //declaring the svgURL and the useLoadSVG hook outside the useEffect below
    const svgURL = process.env.PUBLIC_URL + '/squareIsoTest4.svg';

    const loadedTexture = useLoadSVG(svgURL, gridContainerRef, handleTextureLoaded);
    console.log("Loaded Texture" + loadedTexture);

    useEffect(() => {
        if (loadedTexture) {
            setTexture(loadedTexture);
        }
    }, [loadedTexture]);

    //create a reference for the objectsContainer
    const objectsContainerRef = useRef(new PIXI.Container());

    //connect the app -> stage -> viewport -> main container -> grid container
    useContainerConnections(viewportRef, stageRef, appRef, mainContainerRef, gridContainerRef);

    console.log("the current gridContainerRef value is " + gridContainerRef.current);
    console.log("the appRef width is currently " + appRef.current?.screen.width);

    // This is the useEffect to render the isometric tiles using the loaded texture
    useRenderIsometricTiles(mainContainerRef, texture, tileWidth, tileHeight);

    // addPixiObjectToStage handles the access to objectsContainerRef.current, ensuring it is defined correctly when addPixiObject is called
    const addPixiObjectToStage = useCallback((object) => {
        addPixiObject(object, objectsContainerRef.current);
    }, [objectsContainerRef]);

    // Watch for gameState.objects.byId changes and initialize PixiJS objects if change occurs
    useEffect(() => {
        //each array object is passed to addPixiObjectToStage which calls addPixiObject with stageRef.current and the object
        Object.values(gameState.objects.byId).forEach(addPixiObjectToStage);
    }, [gameState.objects.byId]);


    return (<div id="pixi-container"></div>);
}

export default PixiCanvasComponent;