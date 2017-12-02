// Default Assets
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Dispatcher from './Dispatcher/Dispatcher'
import AppStore from './AppStore/AppStore'
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
    componentDidMount() {
        AppStore.addChangeListener(this._onChange.bind(this))
    }
    componentWillUnMount() {
        AppStore.removeChangeListener(this._onChange.bind(this))
    }
    getStore() {
        Dispatcher.dispatch({
            action:'get-app-store'
        })
    }
    componentWillMount() {
        this.getStore()
    }
    _onChange() {
        this.setState(AppStore)
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
