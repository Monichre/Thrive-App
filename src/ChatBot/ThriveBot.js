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
        console.log(this.props)
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
                ChatBotUtil.makeReplyButton('No', () => {
                    return [
                        ChatBotUtil.textMessage('Ok, would you like to add a new goal?')
                    ]
                })
            )
        ]
    }
    returnUserData(data){
        console.log(data)
        return data
    }

    render() {
        const data = this.props

        const bubble_style = {
            backgroundColor: '#00091B'
        }
        const bot_icon = <img src="/img/bot.svg" alt="" />

        return (
            <div id="ThriveBot">
                <ChatBot
                    getUserData={this.returnUserData(data)}
                    onGetStarted={this.getStarted}
                    onChange={this.componentDidUpdate}
                    getStartedButton={ChatBotUtil.makeGetStartedButton(bot_icon)} />

            </div>
        )
    }
}
