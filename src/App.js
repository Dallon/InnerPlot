import './App.css';
import LoginComponent from './components/ui/LoginComponent';
import PixiCanvasComponent from './components/PixiCanvasComponent';
import UserProfileComponent from './components/ui/UserProfileComponent';
import useAuthListener from './hooks/useAuthListener';
import { useEffect } from 'react';

function App() {
  useAuthListener();

 
  const disableScroll = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    // Attach the event listener
    window.addEventListener('wheel', disableScroll, { passive: false });

    // Cleanup: remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('wheel', disableScroll);
    };
  }, []);


  return (
    <div className="App">
      <header >
         </header> 
      <LoginComponent/>
      <PixiCanvasComponent/>
      <UserProfileComponent/>
    </div>
  );
}

export default App;
