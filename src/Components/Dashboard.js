import React, {Component} from 'react';
import ReactDOM from 'react-dom';


// Firebase

import _ from 'lodash';

import Header from './Header.js'
import SideBar from './Partials/SideBar.js'
import AddGoal from './AddGoal.js'
// import SimpleAssessment from '../ChatBot/Persis'
import '../css/dashboard.css'

import Firebase from '../firebase.js'


export default class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            index: 0
        }
    }

    handleChange(event, index) {
        this.setState({index});
    }

    handleAddGoalSubmit(goal) {
        console.log(goal);
        // Firebase.database().ref('/users/' + this.props.user.clientID + '/goals/').push(goal);
        console.log("AddGoal Handling submitted to Firebase");
    }
	componentWillMount() {}
	
    componentDidMount() {
		console.log(Firebase.auth().currentUser)
        console.log(this.props)
    }

    render() {


		return (
			<div className="wrapper">
				<SideBar />

				<div className="main-panel" id="main-panel">
				<div className="overlay"></div>
					<Header/>
					
					<div className="content">
						<button type="" className="btn btn-white btn-round btn-just-icon" id="chatBotButton">
									<i className="material-icons">search</i><div className="ripple-container"></div>
						</button>
					</div>
				</div>
			</div>

		)
	}
}
