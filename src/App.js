import React, {Component} from 'react';
import MessageList from './Components/MessageList.js';
import ChannelList from './Components/ChannelList.js';
import Header from './Components/Header.js';
import MessageBox from './Components/MessageBox.js';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Firebase from 'firebase';
import _ from 'lodash';



// Initialize Firebase
// var config = {
//     apiKey: "AIzaSyBa7AHgeeKObEk0AoNNi8E3AGE7HVIdo0g",
//     authDomain: "thrive-app-3a3bc.firebaseapp.com",
//     databaseURL: "https://thrive-app-3a3bc.firebaseio.com",
//     projectId: "thrive-app-3a3bc",
//     storageBucket: "thrive-app-3a3bc.appspot.com",
//     messagingSenderId: "869272160764"
// };
// firebase.initializeApp(config);

class App extends Component {

    constructor(){
        super();
    }

    render() {

        var style = {
            margin: '20px'
        };
        return (
            <div>
                <Header/>
                <Grid container justify="space-around" gutter={24}>
                    <Grid item  xs={4}>
                        <ChannelList />
                    </Grid>

                    <Grid item  xs={8}>
                        <MessageList />
                    </Grid>
                    <Grid item  xs={12}>
                        <MessageBox />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default App;
