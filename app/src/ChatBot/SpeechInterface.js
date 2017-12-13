import React, { Component } from 'react'


export default class SpeechInterface extends Component {

    constructor(props){
        super(props)

        this.state = {
            userMessage: '',
            isListening: false
        }
        this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)()
        this.initiateVoiceControl()
    }
    initiateVoiceControl() {
        this.recognition.lang = 'en-US'
        this.recognition.interimResults = true
        this.recognition.maxAlternatives = 5
        this.recognition.onresult = (event) => {
            this.parseVoiceInput(event)
        }
        this.recognition.onstart = (event) => {
            console.log(event)
        }
    }
    parseVoiceInput(event) {
        console.log(event)
        let message = event.results[0][0].transcript
        console.log(message)
        if(message === "hey persis" || message === "hey purses") {
            this.props.summonPersis()
        }
        this.setState({
            userMessage: event.results[0][0].transcript,
            isListening: true
        })

    }

        // componentDidMount() {
  
        // }
        // componentWillMount() {
        //     console.log(this.props)
        // }
        // componentDidUpdate(nextProps){
        //     console.log(nextProps)
        // }
        // componentWillUpdate(nextProps) {
        //     console.log(nextProps)
        // }
  
        displayActiveListen(){ 
            this.setState({isListening: true})
            this.recognition.start()
        }
  
        render() {
            let message = this.state.userMessage
            let css_class = ''
            if(this.state.isListening) {
                css_class = 'listen__active'
            }
            console.log(message)
            
            const icon_style = {
                height: '20px',
                width: '20px'
            }
            return (
                <div>
                    <div id="mic__container"  
                        className='dashboard__button'
                        onClick={this.displayActiveListen.bind(this)}>

                        <img style={icon_style } src="/img/mic.svg" alt=""/>
                    </div>
                </div>
            )
        }
}
