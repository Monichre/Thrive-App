import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, IndexRoute, Link, Switch } from 'react-router-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
