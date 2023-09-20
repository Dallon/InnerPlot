import {useRef, useEffect} from 'react';
import * as PIXI from 'pixi.js';

export const usePixiApp = () =>{
    
    //global var of the app so it can also be used in multiple useEffects
    const appRef = useRef(null);

    // Initialize PIXI application
    useEffect(() => {
        appRef.current = new PIXI.Application({
            width: 800,
            height: 600,
            backgroundColor: 0xAAAAA,
        });
        // append app reference to DOM here to ensure it has one reference.
        document.getElementById("pixi-container").appendChild(appRef.current.view);
    }, []);

    return appRef;
};

 