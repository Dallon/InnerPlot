import './App.css';
import LoginComponent from './components/ui/LoginComponent';
import PixiCanvasComponent from './components/PixiCanvasComponent';
import UserProfileComponent from './components/ui/UserProfileComponent';
import useAuthListener from './hooks/useAuthListener';

function App() {
  useAuthListener();

  return (
    <div className="App">
      <header className="App-header">
         </header> 
      <LoginComponent/>
      <PixiCanvasComponent/>
      <UserProfileComponent/>
    </div>
  );
}

export default App;
