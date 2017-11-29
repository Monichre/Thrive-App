import React, { Component } from 'react'
import ChatBot, { ChatBotUtil } from 'i-chatbot'
import Firebase from '../firebase.js'
import VoiceCommandBot from './VoiceCommandBot'
var apiai = require('apiai');

var app = apiai("<your client access token>");

var request = app.textRequest('<Your text query>', {
    sessionId: '<unique session id>'
});


request.on('response', function(response) {
    console.log(response)
});

request.on('error', function(error) {
    console.log(error)
});

request.end()

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
    displayUserTextMessageInChatBot() {
        
        return [
            ChatBotUtil.makeTextInputField(`What's the title of your goal?`)
        ]
    }
    getStarted() {
        console.log(this)
        let firstName = this.getUserData.data.user_name.split(' ')[0]
        firstName = firstName.replace(firstName.charAt(0), firstName.charAt(0).toUpperCase())
        let occupation = this.getUserData.data.occupation
        let birth_order = this.getUserData.data.birth_order
        let family_size = this.getUserData.data.number_of_siblings
        let goal = this.getUserData.data.goals[0].goal

        return [
            ChatBotUtil.textMessage([`Welcome ${firstName}, would you like to review your goals?`].any(),
                ChatBotUtil.makeReplyButton('Yes', () => {
                    return [
                        ChatBotUtil.textMessage('Then we shall'),
                        ChatBotUtil.textMessage('Below you can find the initial goal you set up during your onboarding'),
                        ChatBotUtil.textMessage(`You mentioned you're the ${birth_order} in a family of ${family_size} and that you are looking to
                        ${goal}`)
                    ]
                }),
                ChatBotUtil.makeReplyButton('No', this.handleNewGoalQuestion.bind(this))
            )
        ]
    }
    handleChatBotNewGoalQuestion() {
        console.log(this)
        return [
            ChatBotUtil.textMessage('Ok, would you like to add a new goal?',
                ChatBotUtil.makeReplyButton('Yes', this.displayUserTextInput),
                ChatBotUtil.makeReplyButton('No', () => {
                    return ChatBotUtil.textMessage("As you wish, back to the ether I go")
                })
            )
        ]
    }
    returnUserData(data){
        return data
    }

    render() {

        const bot_icon = <img src="/img/bot.svg" alt="" />
        const data = this.props
        const bubble_style = {
            backgroundColor: '#00091B'
        }
        
        if(data.launchPersis) {
            return <VoiceCommandBot data={data} />
        } else {
            return (
                <div id="ThriveBot">
                    <ChatBot
                        getUserData={this.returnUserData(data)}
                        handleNewGoalQuestion={this.handleChatBotNewGoalQuestion}
                        displayUserTextInput={this.displayUserTextMessageInChatBot.bind(this)}
                        onGetStarted={this.getStarted}
                        getStartedButton={ChatBotUtil.makeGetStartedButton(bot_icon)} />
    
                </div>
            )
        }
    }
}
