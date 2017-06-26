// Default Assets
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, IndexRoute, Link, Switch } from 'react-router-dom';


// Components
import Header from './Components/Header.js';
import Welcome from './Components/Welcome.js';
import Dashboard from './Components/Dashboard.js';
import MessageList from './Components/MessageList.js';
import ChannelList from './Components/ChannelList.js';
import MessageBox from './Components/MessageBox.js';

// Styles
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

// Assets
import Auth0Lock from 'auth0-lock';
import Firebase from 'firebase';
import _ from 'lodash';



// Initialize Firebase
var config = {
    apiKey: "AIzaSyBa7AHgeeKObEk0AoNNi8E3AGE7HVIdo0g",
    authDomain: "thrive-app-3a3bc.firebaseapp.com",
    databaseURL: "https://thrive-app-3a3bc.firebaseio.com",
    projectId: "thrive-app-3a3bc",
    storageBucket: "thrive-app-3a3bc.appspot.com",
    messagingSenderId: "869272160764"
};

Firebase.initializeApp(config);

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {

            },
            loggedIn: false
        }
    }
    static defaultProps = {
        clientId: "ZsULRd7mfOY8N4dijDo3CmbTto3UDQGW",
        domain: "monichre.auth0.com"
    }
    componentWillMount(){
        this.lock = new Auth0Lock(this.props.clientId, this.props.domain);
        this.lock.on('authenticated', (authResult)=> {

            this.lock.getProfile(authResult.idToken, (error, profile) => {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log(authResult);
                console.log(profile);
                this.storeUser(authResult.idToken, profile);
            });
        });
        this.getUser();
    }
    storeUser(idToken, profile){

        if(idToken){
            localStorage.setItem('User', JSON.stringify(profile));
            localStorage.setItem('LoggedIn', true);
            var newUser = profile;
            this.setState({
                user: newUser,
                loggedIn: true
            }, function(){
                console.log(this.state.user);
            });
            Firebase.database().ref('/users/').push(newUser);
        }
    }
    getUser(){
        if (localStorage.getItem('LoggedIn')){
            var currentUser = JSON.parse(localStorage.getItem('User'));
            this.setState({
                user: currentUser
            }, () => {
                console.log(this.state);
            });
        }
    }
    showLock(){
        this.lock.show();
    }
    logOutUser(){

        this.setState({
            user: '',
            loggedIn: false
        }, () => {
            localStorage.removeItem('User');
        });
    }

    render() {

        let page,
            path;

        if(localStorage.getItem('LoggedIn')){
            page = <Dashboard />;
        } else {
            page = <Welcome />;
        }

        return (
            <div>
                <Header
                    onLoginClick={this.showLock.bind(this)}
                    onLogoutClick={this.logOutUser.bind(this)}
                    loggedIn={this.state.loggedIn}
                    userName={this.state.user.given_name}
                    userGoals={this.state.user.goals}
                    lock={this.lock}/>
                {page}
            </div>
        );
    }
}

export default App;
