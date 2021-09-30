import './App.css';
import { X } from 'react-feather';
import { useEffect, useState } from 'react';
import axios from 'axios';

function dialerElement(isHidden: boolean): JSX.Element {
  return(
      <div className="App-body">
        <div  hidden={isHidden}>
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

function App() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    axios.get('/auth/current-session').then(({data}) => {
      setAuth(data);
    })
  }, []);

  if (auth === null) {
    return (
      <div className="App">
          <header className="App-header">
              <p>
                  Loading...
              </p>
          </header>
          {dialerElement(true)}
      </div>
    );
  }
  if (auth) {
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
              You are not logged in
          </p>
          <a
              className="App-link"
              href={"/auth/login"}
          >
              Login Here
          </a>
      </header>
      {dialerElement(true)}
    </div>
  )
}

export default App;
