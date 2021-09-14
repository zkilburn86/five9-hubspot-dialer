import './App.css';
import { X } from 'react-feather';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="App-body">
        <div className="Five9-header">
          <X color="white" size={20} id="exit-five9" cursor="pointer" />
        </div>
        <div className='Panel-body'>
          <iframe 
            id="iframe-api-v2-panel" 
            title='Five9' 
            src="https://app.five9.com/clients/integrations/adt.li.main.html?f9crmapi=true&f9verticalthreshold=300px"
            height="400px">
          </iframe>
        </div>
      </div>
    </div>
  );
}

export default App;
