import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import _ from 'lodash';
import Firebase from '../firebase.js'
import YveBot from 'yve-bot'
import JSYAML from 'js-yaml'
// import rules from '../ChatBot/chat'

import Header from './Header.js'
import SideBar from './Partials/SideBar.js'
import AddGoal from './AddGoal.js'
import Goals from './Partials/Goals'
// import '../ChatBot/bot_ui.js'
// import '../ChatBot/bot_core.css'


import '../css/dashboard.css'

const ThriveBot = () => {


}





export default class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user_name: '',
            goals: [],
            occupation: '',
            birth_order: '',
            number_of_siblings: null
        }
    }

    handleChange(event, index) {
        this.setState({ index });
    }

    handleAddGoalSubmit(goal) {
        console.log(goal);
        // Firebase.database().ref('/users/' + this.props.user.clientID + '/goals/').push(goal);
        console.log("AddGoal Handling submitted to Firebase");
    }
    componentDidMount() {
        const rules = `
        - message: Hey! I'm Persis, your personal ThriveBot. Personally, I'm thrilled you've endeavored to begin your transformation with us.I'm empowered by a litany of data streams comprised of only the most impactful strategies in success psychology. The idea here is to avoid what we call the Task Fractal. Using a to do app shouldn't become a To Do on another list of endless to do's to help you manage your to do's...you get it.Hit me up when you'd like to add a new goal. I'm also voice activated, I know how busy those thumbs get, well I don't but I've been programmed to imagine. Scary huh? Let's get started!

        - message: What would you like to do?
          type: MultipleChoice
          options:
          - label: I can walk you through the Thrive experience
            value: 1
          - label: View your goals
            value: 2
          - label: Add a new goal
            value: 3
          - label: Find some inspiration
            value: 3
        `

        const bot = new YveBot(JSYAML.load(rules), { target: '#ThriveBot' })
        console.log(bot)
        bot.on('start', () => {
            console.log('Started!');
            console.log(bot.session)
        })
        bot.on('error', (err) => {
            console.error('Error was found', err);
        })

        bot.start()

    }
    componentWillMount() {

        const userId = JSON.parse(localStorage.getItem('user_id'))
        const _this = this

        if (userId) {

            Firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
                let data = snapshot.val()
                let current_goals = Object.values(data.goals).map(item => item.goal)
                console.log(current_goals)
                _this.setState({
                    user_name: data.username,
                    occupation: data.occupation,
                    goals: current_goals,
                    birth_order: data.birth_order,
                    number_of_siblings: data.number_of_siblings
                }, () => {
                    console.log(_this.state)
                })
            })
        }
    }

    render() {

        return (
            <div id="Dashboard">
                <SideBar />

                <div className="dashboard_main" id="Dashboard_Main">
                    <div className="overlay"></div>

                    <Goals goals={this.state.goals} />
                    <section id="thrive_bot_section">
                        <div id="ThriveBot">

                        </div>
                        <button type="" className="btn btn-white btn-round btn-just-icon" id="chatBotButton"><i className="material-icons"><i className="material-icons">android</i></i><div className="ripple-container"></div></button>
                    </section>

                </div>
            </div>

        )
    }
}
