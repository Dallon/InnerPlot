import { useEffect } from 'react';

export const useCenterContainers = (mainContainerRef, gridContainerRef) => {

  console.log(`center containers Hook is running`);//debugging

  useEffect(() => {
    // Centering logic here-- the main container will expand to hold the grid right? work on this.
    const containerCenterX = mainContainerRef.current.width;
    const containerCenterY = mainContainerRef.current.height;

    gridContainerRef.x = containerCenterX;
    gridContainerRef.y = containerCenterY;
  }, [mainContainerRef, gridContainerRef]); // Re-run this code whenever mainContainer or grid changes
}