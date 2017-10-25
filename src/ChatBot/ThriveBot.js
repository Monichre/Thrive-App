import React, { Component } from 'react'
import ChatBot, { ChatBotUtil } from 'i-chatbot'





export default class ThriveBot extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }

    }
    componentDidMount() {
        console.log(this.props)

    }
    getStarted() {
        
        return [
            ChatBotUtil.textMessage([`Welcome, shall we begin?`].any(),
            ChatBotUtil.makeReplyButton('Yes', this.intro),
            ChatBotUtil.makeReplyButton('No', this.noIntro))
        ]
    }

    intro() {
        return [
            ChatBotUtil.textMessage('That\'s good to hear!')
        ]
    }
    noIntro() {
        return [
            ChatBotUtil.textMessage('As you wish, I shall check return in due time')
        ]
    }
    render() {

        const bubble_style = {
            backgroundColor: '#00091B'
        }
        const bot_icon = <img src="/img/bot.svg" alt="" />

        return (
            <div id="ThriveBot">
                <ChatBot
                    onGetStarted={this.getStarted}
                    getStartedButton={ChatBotUtil.makeGetStartedButton(bot_icon)} />

            </div>
        )
    }
}
