import React, { Component } from 'react'
import Firebase from '../firebase.js'
import VoiceCommandBot from './VoiceCommandBot'
// const apiai = require('apiai');
// const app = apiai("<your client access token>");
// const request = app.textRequest('<Your text query>', {
//     sessionId: '<unique session id>'
// });


// request.on('response', function(response) {
//     console.log(response)
// });

// request.on('error', function(error) {
//     console.log(error)
// });

// request.end()

export default class ThriveBot extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user_name: '',
            goals: [],
            occupation: '',
            birth_order: '',
            number_of_siblings: null
        }
        
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        this.setState({
            user_name: nextProps.user_name,
            goals: nextProps.goals,
            occupation: nextProps.occupation,
            birth_order: nextProps.birth_order,
            number_of_siblings: nextProps.number_of_siblings
        })
    }
    componentDidUpdate(nextProps){
        
        console.log(nextProps)
    }
    shouldComponentUpdate(nextProps){
        return true
    }
    componentDidMount() {
        
    }
    makeReplyButton() {
        return (
            <div>
                <button>Reply Button</button>
            </div>
        )
    }
    handleUserTextSubmit(e) {
        console.log(e.target.value)
    }
   

    render() {

        const bot_icon = <img src="/img/bot.svg" alt="" />
        const data = this.props
        const bubble_style = {
            backgroundColor: '#00091B'
        }
        
        return (
            <div id="ThriveBot">


            </div>
        )
    }
}
