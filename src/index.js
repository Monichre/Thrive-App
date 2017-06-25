import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, IndexRoute, Link, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <MuiThemeProvider>
            <App />
        </MuiThemeProvider>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
