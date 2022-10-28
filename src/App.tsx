import './App.css';
import Revenu from './Partials/Revenu';

function App() {
  return (
    <div className="App">
      <div className="captus_head">
        <h1 className="nav_title">CAPTUS</h1>
      </div>
      <div className='branche_1'></div>
      <div className='branche_2'></div>
      
      <div className='Revenu-container'>
        <Revenu />
      </div>
    </div>
  );
}

export default App;
