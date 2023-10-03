import {useRef, useEffect} from 'react';
import * as PIXI from 'pixi.js';

export const usePixiApp = () =>{
    
    //global var of the app so it can also be used in multiple useEffects
    const appRef = useRef(null);

    // Initialize PIXI application
    useEffect(() => {
        appRef.current = new PIXI.Application({
            width: 1280,
            height: 720,
            backgroundColor: 0xAAAAAA,
            
        });
        // append app reference to DOM here to ensure it has one reference.
        console.log('App Dimensions:', appRef.current.screen.width, appRef.current.screen.height);
        document.getElementById("pixi-container").appendChild(appRef.current.view);
    }, []);

    return appRef;
};

 