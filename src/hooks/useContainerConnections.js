import { useEffect } from "react";

    export const useContainerConnections = (viewportRef, stageRef, appRef, mainContainerRef, gridContainerRef) =>{

    // Main setup
    useEffect(() => {
        // Check for all null references before proceeding
        const refsToCheck = [viewportRef.current, stageRef.current, appRef.current.stage];
        const refNames = ['viewportRef', 'stageRef', 'appRef.stage'];

        refsToCheck.forEach((ref, index) => {
            if (!ref) console.error(`${refNames[index]}.current is not initialized`);
        });

        // If all checks pass, then add viewportRef to the app's stage
        appRef.current.stage.addChild(viewportRef.current);

        // Add mainContainer to the viewport
        viewportRef.current.addChild(mainContainerRef.current);
        mainContainerRef.current.addChild(gridContainerRef.current);

    }, []);
};