import React, { Component } from 'react'
import Firebase from '../firebase.js'
import VoiceCommandBot from './VoiceCommandBot'
import Dispatcher from '../Dispatcher/Dispatcher'
import AppStore from '../AppStore/AppStore'

const Text = (props) => (
    <li className="Message Inbound">
        <div className={`Message-Content ${props.from}_text`}>
                {props.content}
        </div>
    </li>
)

class Messages extends Component {
    render() {
        return (
            <ul className="Messages">
                {this.props.messages.map((message) => {
                    return <Text content={message} />
                })}
            </ul>
        )
    }
}


export default class ThriveBot extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user_name: '',
            goals: [],
            occupation: '',
            birth_order: '',
            number_of_siblings: null,
            revealChatBot: false,
            userText: '',
            incomingText: '',
            messages: []
        }

    }
    componentWillReceiveProps(nextProps) {
        
        this.setState({
            user_name: nextProps.user_name,
            goals: nextProps.goals,
            occupation: nextProps.occupation,
            birth_order: nextProps.birth_order,
            number_of_siblings: nextProps.number_of_siblings
        })
    }
    componentDidUpdate(nextProps) {

    }
    // shouldComponentUpdate(nextProps) {
   
    // }
    componentDidMount() {

    }
    handleIncomingResponse() {

        const incoming_response = AppStore.data.incoming_message.content
        console.log(incoming_response)
        
    }
    makeReplyButton(options) {
        return (
            options.map(option => {
                return (
                    <li className="Message Inbound">
                        <div className="Message-Animatable-Container">
                            <div className="Message-Content">
                                    <button className="ReplyButton">{option.text}</button>
                            </div>
                        </div>
                    </li>
                )
            })
        )
    }
    handleUserTextSubmit(e) {
        e.preventDefault()

        const _this = this
        const user_message = this.state.userText
        this.createTextMessage(user_message, 'User')

        Dispatcher.dispatch({
            action: 'send-user-text',
            message: user_message
        }, () => {
            _this.handleIncomingResponse()
        })
       
    }
    handleUserTextInput(e) {
        e.preventDefault()
        this.setState({
            userText: e.target.value
        })

    }
    createTextMessage(content, from) {
        const messages = []
        const icon = from === 'User' ? this.props.data.current_user.facebook_platform_data.photo : '/img/bot.svg'
        const text =  (
            <li className="Message Inbound">
                <div className={`Message-Content ${from}_text`}>
                    <div className="chip">
                        <img src={icon} alt="Text Sender Photo"/>
                        {content}
                    </div>
                </div>
            </li>
        )
        messages.push(text)

        this.state.messages.push(text)
 
    }
    revealChatBot(e){
        e.preventDefault()
        
        this.createTextMessage('Hello There', 'ChatBot')
        this.setState({
            revealChatBot: true,
        })
        
    }


    render() {

        const data = this.props
        const bubble_style = {
            backgroundColor: '#00091B'
        }
        const chat_icon_style = {
            position: 'absolute',
            bottom: '15px',
            right: '15px'
        }
        let chat_hideOrShow
        if(this.state.revealChatBot) {
            chat_hideOrShow = {
                display: 'block'
            }
        } else {
            chat_hideOrShow = {
                display: 'none'
            }
        }
        // let user_text, incoming_message
        // if ( this.state.userText ) {
        //     user_text = this.createTextMessage(this.state.userText , 'User')
        // }
        // if ( this.state.incomingText ) {
        //     incoming_message = this.createTextMessage(this.state.incomingText, 'ChatBot')
        // }
        const _autoFocus = this.state.revealChatBot ? true : false
        

        return (
                
                    <div id="ThriveBot">
                        <a className="btn-floating btn-large waves-effect waves-light red" style={chat_icon_style} onClick={this.revealChatBot.bind(this)}><i className="material-icons">keyboard_voice</i></a>
                        
                        <div className="ThriveBot__inner" style={chat_hideOrShow}>

                            <Messages messages={this.state.messages} />

                            <form onSubmit={this.handleUserTextSubmit.bind(this)}>
                                <input id="userTextInput" type="text" placeholder="..." value={this.state.userText} autoFocus={_autoFocus} onChange={this.handleUserTextInput.bind(this)}/>
                                <button id="chatSend">Send</button>
                            </form>
                        </div>
                    </div>
                
            )
    }
}
