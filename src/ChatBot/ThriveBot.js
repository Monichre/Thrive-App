import React, { Component } from 'react'
import ChatBot, { ChatBotUtil } from 'i-chatbot'
import Firebase from '../firebase.js'


const overview = (props) => (
    <div className="">
        <h2>Overview Div</h2>
    </div>
)


export default class ThriveBot extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: this.props.firstName
        }
        // this.intro = this.intro.bind(this)
        this.noIntro = this.noIntro.bind(this)
        this.componentWillMount = this.componentWillMount.bind(this)

    }
    componentDidMount() {

    }
    componentWillMount() {
        const userId = JSON.parse(localStorage.getItem('user_id'))
        let data
        const _this = this


        let user_data = Firebase.database().ref('/users/' + userId)

        user_data.on('value', (snapshot) => {
            console.log(snapshot.val())
            data = snapshot.val()

            _this.setState({
                user_name: data.username,
                goals: data.goals,
                occupation: data.occupation,
                birth_order: data.birth_order,
                number_of_siblings: data.number_of_siblings
            })
        })
        console.log(this.props)
        console.log(this.state)
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
    callback(args) {
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
