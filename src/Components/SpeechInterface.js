import React, { Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'

const options = {
  autoStart: false
}


class SpeechInterface extends Component {
        componentDidMount() {
            console.log(this.props.transcript)
        }
        displayActiveListen(){
            document.getElementById('mic__container').classList.add('listen__active')
            this.props.startListening()
            console.log(this.props.listening)
            console.log(this.props.interimTranscript)
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
                console.log(interimTranscript)
                
                
            }

            return (
                <div>
                    <div id="mic__container" onClick={() =>{startListening, this.displayActiveListen()}}><img style={icon_style } src="/img/mic.svg" alt=""/></div>
                </div>
            )
        }
}
export default SpeechRecognition(options)(SpeechInterface)