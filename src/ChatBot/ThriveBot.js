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
            number_of_siblings: null,
            revealChatBot: false,
            messages: []
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
    componentDidUpdate(nextProps) {

        console.log(nextProps)
    }
    shouldComponentUpdate(nextProps) {
        return true
    }
    componentDidMount() {

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
        console.log(e.target.value)
    }
    createTextMessage(content) {
        return (
            <li className="Message Inbound">
                <div className="Message-Animatable-Container">
                    <div className="Message-Content">
                            {content}
                    </div>
                </div>
            </li>
        )
    }
    revealChatBot(e){
        e.preventDefault()
        this.setState({
            revealChatBot: true
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

        return (
                
                    <div id="ThriveBot">
                        <img src="/img/bot.svg" alt="" style={chat_icon_style} onClick={this.revealChatBot.bind(this)}/>
                        <div className="ThriveBot__inner" style={chat_hideOrShow}>
                            <ul className="Messages">
                            </ul>
                            <form onSubmit={this.handleUserTextSubmit.bind(this)}>
                                <input type="text" placeholder="..."/>
                                <button>Send</button>
                            </form>
                        </div>
                    </div>
                
            )
    }
}
