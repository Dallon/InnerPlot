export const useResize = (appRef, gameContainerRef) => {
    //resize the container
    const resize = () => {

        // Update renderer size
    appRef.renderer.resize(window.innerWidth, window.innerHeight);

    // Scale the gameContainer
    const scaleFactor = Math.min(
        window.innerWidth / (gameContainerRef.current.width ),
        window.innerHeight / (gameContainerRef.current.height)
    );
    gameContainer.scale.set(scaleFactor);

    // Reposition the gameContainer to center it
    gameContainer.x = (appRef.renderer.width - gameContainerRef.current.width * scaleFactor) / 2;
    gameContainer.y = (appRef.renderer.height - gameContainerRef.current.height * scaleFactor) / 2;
      
    };
  
    useEffect(() => {
      // Attach the resize event listener
      window.addEventListener('resize', resize);
      
      // Call resize initially to set up the initial sizes
      resize();
  
      // Return a cleanup function to remove the event listener
      return () => {
        window.removeEventListener('resize', resize);
      };
    }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount
  };