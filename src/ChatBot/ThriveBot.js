import React, { Component } from 'react'
import ChatBot, { ChatBotUtil } from 'i-chatbot'





export default class ThriveBot extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
        // this.intro = this.intro.bind(this)
        this.noIntro = this.noIntro.bind(this)

    }
    componentDidMount() {
        console.log(this.props)

    }
    getStarted() {
        
        return [
            ChatBotUtil.textMessage([`Welcome, would you like to review your goals?`].any(),
            ChatBotUtil.makeReplyButton('Yes', () => {
                return [
                    ChatBotUtil.textMessage('Then we shall'),
                    ChatBotUtil.textMessage('Below you can find the initial goal you set up during your onboarding')
                ]
            }),
            ChatBotUtil.makeReplyButton('No', this.noIntro))
            ]
    }
    callback(args){
        console.logs(args)
    }

    intro() {
        return [
            ChatBotUtil.textMessage('Then we shall')
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
                    callback={() => this.callback.bind(this)}
                    onGetStarted={this.getStarted}
                    getStartedButton={ChatBotUtil.makeGetStartedButton(bot_icon)} />

            </div>
        )
    }
}
