// Default Assets
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import routes from './routes'

import './App.css'



class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {
            },
			userGoals: [],
            loggedIn: false
        }
    }
    getUser(){
	
    }

    logOutUser(){
      
    }

    render() {
		return (
			<BrowserRouter>
			    {routes}
		    </BrowserRouter>
		)
    }
}

export default App;
