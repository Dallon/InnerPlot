import './App.css';
import LoginComponent from './components/ui/LoginComponent';
import PixiCanvasComponent from './components/PixiCanvasComponent';
import UserProfileComponent from './components/ui/UserProfileComponent';
import InventoryComponent from './components/ui/InventoryComponent';
import useAuthListener from './hooks/useAuthListener';
import { useEffect, useRef, useState } from 'react';
import AppContext from './contexts/AppContext';
import { usePixiApp } from './hooks/usePixiApp';
import { useLoadPNG } from './hooks/useLoadPNG';
import * as PIXI from 'pixi.js';
import { AssetManifest } from './AssetManifest';

function App() {
  useAuthListener();

  const disableScroll = (event) => {
    event.preventDefault();
  };

  const { appRef, isAppReady } = usePixiApp();
  const inventoryContainerRef = useRef(new PIXI.Container());

  const [texture, setTexture] = useState(null);
  const pngURL = AssetManifest.images.textures.grass;

  // Call the useLoadPNG hook here
  useLoadPNG(pngURL, setTexture);

  useEffect(() => {
    // Attach the event listener
    window.addEventListener('wheel', disableScroll, { passive: false });

    // Cleanup: remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('wheel', disableScroll);
    };
  }, []);


  return (
    <AppContext.Provider value={{ appRef, inventoryContainerRef }}>
      <div className="App">
        <header >
        </header>
        <LoginComponent />
        {isAppReady && <PixiCanvasComponent texture={texture}  />}
        {isAppReady && <InventoryComponent />}
        {isAppReady && <UserProfileComponent />}
      </div>
    </AppContext.Provider>
  );
};

export default App;
