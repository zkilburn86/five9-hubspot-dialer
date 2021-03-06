import './App.css';
import DispositionHandler from './utilities/DispositionHandler';
import { X, LogOut } from 'react-feather';
import { LoopCircleLoading } from 'react-loadingg';
import { useEffect, useState } from 'react';
import axios from 'axios';

function dialerElement(isHidden: boolean): JSX.Element {
  return(
      <div className="App-body">
        <div  hidden={isHidden}>
          <div className="Five9-header">
            <div className="flex-container">
              <div className="flex-child">
                <X color="white" size={20} id="exit-five9" cursor="pointer" />
              </div>
              <div className="flex-child">
                <a href={"/auth/logout"}>
                  <LogOut color="white" size={20} id="logout-hs" cursor="pointer" />
                </a>
              </div>
            </div>
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

function App() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    axios.get('/auth/current-session', {withCredentials: true}).then(({data}) => {
      setAuth(data);
    });
  }, []);

  if (auth === null) {
    return (
      <div className="App">
          <header className="App-header">
              <LoopCircleLoading/>
          </header>
          {dialerElement(true)}
      </div>
    );
  }
  if (auth) {
    DispositionHandler.storeDispositions();
    return (
      <div className="App">
        <header className="App-header">
        </header>
        {dialerElement(false)}
      </div>
    );
  }
  return(
    <div className="App">
      <header className="App-header">
          <p>
              Please sign in to use the dialer
          </p>
          <a
              className="App-link"
              href={"/auth/login"}
          >
              <button className="Login-button">
                Login with HubSpot
              </button>
          </a>
      </header>
      {dialerElement(true)}
    </div>
  )
}

export default App;
