import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import DialerInteractionHandler from './utilities/DialerInteractionUtil';

const callback = () => {
  if (
    document.readyState === "interactive" ||
    document.readyState === "complete"
  ) {
    window.setTimeout(() => DialerInteractionHandler.callback(), 1000);
  } else {
    document.addEventListener("DOMContentLoaded", DialerInteractionHandler.callback);
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
  callback
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(null);
