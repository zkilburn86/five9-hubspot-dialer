import './App.css';
import { X } from 'react-feather';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <script
          src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
          integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        ></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
          integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
        ></script>
      </header>
      <body className="App-body">
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
        <script src="bin/index_combined.js" async></script>
        <script type="text/javascript" src="libs/five9.crm.sdk.js"></script>
      </body>
    </div>
  );
}

export default App;
