import 'react-app-polyfill/ie11';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';

const domContainer = document.getElementById('root');
if (typeof(domContainer) != 'undefined' && domContainer != null)
{
    ReactDOM.render(<App />, domContainer);
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
