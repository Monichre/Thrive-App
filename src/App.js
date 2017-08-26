// Default Assets
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, IndexRoute, Link, Switch, Redirect } from 'react-router-dom';
import routes from './routes'

// Dispatcher
import AppDispatcher from './Dispatcher/AppDispatcher'

// Store
import AppStore from './Stores/AppStore'

// Components
import Header from './Components/Header.js'
import Welcome from './Components/Welcome.js'
import Dashboard from './Components/Dashboard.js'

// Assets
import _ from 'lodash';
import Firebase from './firebase'


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
	_onChange(){
    	this.setState({user: AppStore.data.session_user,
			loggedIn: true
		})
  	}
    componentWillMount(){
		console.log(this.state)
    }
         // Add change listeners to stores
	componentDidMount(){
		AppStore.addChangeListener(this._onChange.bind(this))
	}

	// Remove change listeners from stores
	componentWillUnmount(){
		AppStore.removeChangeListener(this._onChange.bind(this))
	}
    getUser(user){
		// const dataBaseRef = Firebase.database().ref('users')
		// let session_user
		// let existing_user
		// let new_user
		//
		// dataBaseRef.on('value', (snapshot) => {
		// 	let users = _.valuesIn(snapshot.val())
		// 	existing_user = _.find(users, ['email', user.email])
		// 	console.log(users)
		// 	console.log(existing_user)
		// })
		// if (existing_user) {
		//
		// } else {
		// 	new_user = {
		// 		name: user.name,
		// 		profile_picture: user.picture.data.url,
		// 		email: user.email
		// 	}
		// 	dataBaseRef.push(session_user)
		// }
		// session_user = existing_user ? existing_user : new_user
		// this.setState({user: session_user, loggedIn: true})
    }

    logOutUser(){
        // this.setState({
        //     user: '',
        //     loggedIn: false
        // }, () => {
        //     localStorage.removeItem('User');
		// 	localStorage.removeItem('LoggedIn');
        // });
    }

    render() {

		if (this.state.loggedIn){
			return(<Dashboard />)
		} else {
			return (
				<Welcome />
			)
		}
    }
}

export default App;
