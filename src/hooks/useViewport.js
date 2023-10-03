import { useEffect, useRef } from 'react';
import { Viewport } from 'pixi-viewport';



export const useViewport = (appRef, stageRef) => {
    console.log("debug");
    const viewportRef = useRef(null);

    useEffect(() => {
        if (!appRef.current || !stageRef.current) return;
        const screenWidth = appRef.current.screen.width;
        const screenHeight = appRef.current.screen.height;

        viewportRef.current = new Viewport({
            screenWidth,
            screenHeight,
            worldWidth: 1000,
            worldHeight: 1000,
            events: appRef.current.renderer.events,
        });


        // Add stage to viewportRef
        viewportRef.current.addChild(stageRef.current);

        // Activate viewportRef plugins
        viewportRef.current.drag().pinch().wheel().decelerate();
        viewportRef.current.clampZoom({
            minWidth: 500,  // minimum width
            minHeight: 300,  // minimum height
            maxWidth: 2000,  // maximum width
            maxHeight: 1500  // maximum height
        });
    }, [appRef, stageRef]);

    return viewportRef;
}

