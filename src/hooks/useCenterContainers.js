import { useEffect } from 'react';

export const useCenterContainers = (mainContainerRef, gridContainerRef) => {
  useEffect(() => {
    // Centering logic here
    const containerCenterX = mainContainerRef.current.width;
    const containerCenterY = mainContainerRef.current.height;

    gridContainerRef.x = containerCenterX;
    gridContainerRef.y = containerCenterY;
  }, [mainContainerRef, gridContainerRef]); // Re-run this code whenever mainContainer or grid changes
}