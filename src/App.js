import logo from './logo.svg';
import './App.css';
import LoginComponent from './components/ui/LoginComponent';
import PixiCanvasComponent from './components/PixiCanvasComponent';
import UserProfileComponent from './components/ui/UserProfileComponent';

function App() {

  



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
         </header> 
      <LoginComponent/>
      <PixiCanvasComponent/>
      <UserProfileComponent/>
    </div>
  );
}

export default App;
