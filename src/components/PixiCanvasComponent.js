import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as PIXI from 'pixi.js';
import { addObject, removeObject } from '../store/slices/gameStateSlice';
import { usePixiGrid } from '../hooks/usePixiGrid';

const PixiCanvasComponent = () => {
    //allows you to send or dispatch an action to the redux store 
    //by giving the action as an argument to the dispatch variable
    const dispatch = useDispatch();

    // Allows you to extract data from the Redux store state for 
    // use in this component, runs whenever the component renders
    //unless reference hasnt changed since previous render
    const gameState = useSelector((state) => state.gameState);

    //global variable of the stage so it can be used in multiple useEffects
    const stageRef = useRef(null);
    
    //app declared outside of useEffects to be used during instantiation and the grid
    let app = new PIXI.Application({
        width: 800,
        height: 600,
        backgroundColor: 0xAAAAAA
    });
    //useEffect used to initialize Pixi canvas after first render only 
    useEffect(() => {

        document.getElementById("pixi-container").appendChild(app.view);

        //create Pixi stage
        stageRef.current = new PIXI.Container();
        app.stage.addChild(stageRef.current);

        //add new pixi object based upon redux state
        const addPixiObject = (object) => {
            const graphics = new PIXI.Graphics();
            graphics.beginFill(object.type === 'tree' ? 0x00FF00 : 0xFF0000);
            graphics.drawCircle(object.x, object.y, 10);
            graphics.endFill();
            stageRef.current.addChild(graphics);
        };


        //initialize PixiJS objects for each object in gameState.objects
        gameState.objects.forEach(addPixiObject);

        // Create the background sprite with a basic white texture
        let bg = new PIXI.Sprite(PIXI.Texture.WHITE);
        // Set it to fill the screen
        bg.width = app.screen.width;
        bg.height = app.screen.height;

        // Add a click handler
        bg.interactive = true;
        stageRef.current.addChild(bg);
        const cellSize = 50;


        //Add a new object when clicking on the stage

        bg.on('pointerdown', (event => {
            const { x, y } = event.data.global;

            // Snap to grid
            // x = Math.floor(x / cellSize) * cellSize;
            // y = Math.floor(y / cellSize) * cellSize;

            const newObject = { x, y, type: 'tree', id: String(new Date().getTime()) };
            addPixiObject(newObject); //addPixiJS object
            dispatch(addObject(newObject)); //Update Redux state
        }));



    }, []);

    usePixiGrid(stageRef.current, app.screen.width, app.screen.height, 50);


    return (<div id="pixi-container"></div>
    );
}

export default PixiCanvasComponent;