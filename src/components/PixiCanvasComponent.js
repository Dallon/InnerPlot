import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as PIXI from 'pixi.js';
import { addObject, removeObject } from '../store/slices/gameStateSlice';
import { useViewport } from '../hooks/useViewport';
import { usePixiApp } from '../hooks/usePixiApp';
import { updateCellDimensions } from '../store/slices/boxSlice';


const PixiCanvasComponent = () => {

    //send or dispatch an action to the redux store 
    //by giving the action as an argument to the dispatch variable
    const dispatch = useDispatch();

    // extract data from the Redux store state for 
    // use in this component, runs whenever the component renders
    //unless reference hasnt changed since previous render
    const gameState = useSelector((state) => state.gameState);

    //global variable of the stage so it can be used in multiple useEffects
    const stageRef = useRef(null);

    //create an app reference, already appended to virtual document object model
    const appRef = usePixiApp();

    // Initialize the stage container first
    useEffect(() => {
        if (!stageRef.current) {
            stageRef.current = new PIXI.Container();
        }
    }, []); // Empty dependency array to ensure this runs only once

    //get the viewportRef from useViewport
    const viewportRef = useViewport(appRef, stageRef);

    // Main setup (remains unchanged, only comments added)
    useEffect(() => {
        // Check for all null references before proceeding


        if (!viewportRef.current) {
            console.error("viewportRef.current is not initialized");
            return;
        }

        if (!stageRef.current) {
            console.error("stageRef.current is not initialized");
            return;
        }

        if (!appRef.current.stage) {
            console.error("appRef.current.stage is not initialized");
            return;
        }

        // If all checks pass, then add viewportRef to the app's stage
        appRef.current.stage.addChild(viewportRef.current);


        //initialize PixiJS objects for each object in gameState.objects.byId
        Object.values(gameState.objects.byId).forEach(addPixiObject);

        // Create the background sprite with a basic white texture
        let bg = new PIXI.Sprite(PIXI.Texture.WHITE);
        // Set it to fill the screen
        bg.width = appRef.current.screen.width;
        bg.height = appRef.current.screen.height;

        // Add a click handler
        bg.interactive = true;
        stageRef.current.addChild(bg);

        // Add a new object when clicking on the stage
        bg.on('pointerdown', (event) => {
            const global = event.data.global;
            const local = viewportRef.current.toLocal(global);
            const newObject = {
                x: local.x,
                y: local.y,
                type: 'tree',
                id: String(new Date().getTime()),
            };

            addPixiObject(newObject); // Add to PIXI stage
            dispatch(addObject(newObject)); // Update Redux state
        });
    }, []);

    // Function to add a new PIXI object
    const addPixiObject = (object) => {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(object.type === 'tree' ? 0x00FF00 : 0xFF0000);
        graphics.drawCircle(object.x, object.y, 10);
        graphics.endFill();
        stageRef.current.addChild(graphics);
    };

    // Watch for gameState.objects.byId changes and initialize PixiJS objects
    useEffect(() => {
        Object.values(gameState.objects.byId).forEach(addPixiObject);
    }, [gameState.objects.byId]);

    return (<div id="pixi-container"></div>);
}

export default PixiCanvasComponent;