import logo from './logo.svg';
import './App.css';
import LoginComponent from './components/ui/LoginComponent';
import PixiCanvasComponent from './components/PixiCanvasComponent';

function App() {

  



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
         </header> 
      <LoginComponent/>
      <PixiCanvasComponent/>
    </div>
  );
}

export default App;
