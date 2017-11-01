import React, { Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'

const options = {
  autoStart: false
}


class SpeechInterface extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isListening: false,
            userMessage: '',
            persisIsLaunched: false
        }
    }
        componentDidMount() {
  
        }
        componentWillMount() {
            console.log(this.props)
        }
        componentDidUpdate(nextProps){
            console.log(nextProps)
            if (nextProps.transcript === "hey persis" || nextProps.transcript === "hey purses") {
                this.props.summonPersis(true)
                this.props.stopListening()
            }

        }
        componentWillUpdate(nextProps) {
            console.log(nextProps)
        }
        handleUserVoiceInput(input) {
            console.log(input)
            
        }
        displayActiveListen(){
            document.getElementById('mic__container').classList.add('listen__active')
            this.setState({isListening: true})
            this.props.startListening()

            console.log(this.props.listening)
            console.log(this.props.transcript)

        }
        render() {
            const { transcript, startListening, browserSupportsSpeechRecognition, stopListening, listening, interimTranscript } = this.props
            const icon_style = {
                height: '20px',
                width: '20px'
            }
   

            if (!browserSupportsSpeechRecognition) {
                return null
            }
            if (listening){
                
                
                
            }

            return (
                <div>
                    <div id="mic__container" onClick={() =>{startListening, this.displayActiveListen()}}><img style={icon_style } src="/img/mic.svg" alt=""/></div>
                </div>
            )
        }
}
export default SpeechRecognition(options)(SpeechInterface)