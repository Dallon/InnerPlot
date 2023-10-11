import { useEffect, useRef } from 'react';
import { Viewport } from 'pixi-viewport';



export const useViewport = (appRef, stageRef) => {
    const viewportRef = useRef(null);

    useEffect(() => {
        if (!appRef.current || !stageRef.current) return;
        const appRefScreenWidth = appRef.current.screen.width;
        const appRefScreenHeight = appRef.current.screen.height;

        viewportRef.current = new Viewport({
            screenWidth: appRefScreenWidth,
            screenHeight: appRefScreenHeight,
            worldWidth: appRefScreenWidth,
            worldHeight: appRefScreenHeight,
            events: appRef.current.renderer.events,
        });


        // Add stage to viewportRef
        viewportRef.current.addChild(stageRef.current);

        // Activate viewportRef plugins
        viewportRef.current.pinch().drag({ keyToPress: ['ShiftLeft', 'ShiftRight'] }).wheel().decelerate();
        viewportRef.current.clampZoom({
            minWidth: 100,  // minimum width
            minHeight: 100,  // minimum height
            maxWidth: 2000,  // maximum width
            maxHeight: 1500  // maximum height
        });
    }, [appRef, stageRef]);

    return viewportRef;
}

