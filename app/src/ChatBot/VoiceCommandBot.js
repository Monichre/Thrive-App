import React, { Component } from 'react'
import ChatBot, { ChatBotUtil } from 'i-chatbot'
// import Firebase from '../firebase.js'

export default class ThriveBot extends Component {
    constructor(props) {
        super(props)

        // this.state = {
        //     user_name: '',
        //     goals: [],
        //     occupation: '',
        //     birth_order: '',
        //     number_of_siblings: null
        // }
        
    }
  
    componentDidMount() {
        
        
    }
    returnUserData(data){
        return data
    }
    persisHasBeenSummoned() {
        let firstName = this.getUserData.data.user_name.split(' ')[0]
        firstName = firstName.replace(firstName.charAt(0), firstName.charAt(0).toUpperCase())
         
        return [
            ChatBotUtil.textMessage([`Hola ${firstName}`].any(),
                ChatBotUtil.makeReplyButton('How can I help you?', () => {
                    return [
                        ChatBotUtil.textMessage('Choose')
                    ]
                })
            )
        ]
    }
    render() {
        const data = this.props.data
        console.log(data)
        return (
            <div id="VoiceCommandBot">
                <ChatBot
                    getUserData={this.returnUserData(data)}
                    onGetStarted={this.persisHasBeenSummoned}
                    getStartedButton={ChatBotUtil.makeGetStartedButton('Hola')} />

            </div>
        )
    }
}
