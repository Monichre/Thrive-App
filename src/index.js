import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, IndexRoute, Link, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import AppStore from './Stores/AppStore'

ReactDOM.render(
    <BrowserRouter>
        <App data={AppStore.data}/>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
