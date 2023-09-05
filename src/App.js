import logo from './logo.svg';
import './App.css';
import LoginComponent from './components/LoginComponent';


function App() {

  



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <LoginComponent/>
      </header>
    </div>
  );
}

export default App;
