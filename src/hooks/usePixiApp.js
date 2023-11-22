import {useRef, useEffect, useState} from 'react';
import * as PIXI from 'pixi.js';

export const usePixiApp = () =>{
    
    const appRef = useRef(null);

    

    const [isAppReady, setIsAppReady] = useState(false);

    // Initialize PIXI application
    useEffect(() => {
        console.log(`usePixiApp hook is running`);//debugging
        // if (window.innerWidth > 1280){}

        appRef.current = new PIXI.Application({
            width: 1280,
            height: 720,
            backgroundColor: 0xAAAAAA,
        });
        // append app reference to DOM here to ensure it has one reference.
        console.log('App Dimensions:', appRef.current.screen.width, appRef.current.screen.height);
        setIsAppReady(true); // Set the app as ready after appending
    }, []);

    return { appRef, isAppReady };
};

 