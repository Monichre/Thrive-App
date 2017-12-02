import _ from 'lodash'
import AppStore from '../AppStore/AppStore'
import {config} from '../config'
const ApiAi = require('apiai')
const client = ApiAi(config.CLIENT_ACCESS_TOKEN)
const sessionId = JSON.parse(localStorage.getItem('user_id'))

const initiateDialogueFlow = async (message) => {
    
    const convo = client.textRequest(message, {
        sessionId: sessionId
    })

    convo.on('response', (response) => {

        let waiting_response = response.result.fulfillment.speech

        AppStore.data.incoming_message.content = waiting_response
        AppStore.emitChange()
    })

    convo.on('error', (error) => {
        console.log(error)
    })

    convo.end()
    
}

export const getStore = (callback) => {
    
    AppStore.data.test = true
    AppStore.emitChange()

    if(callback) {
        callback(false, AppStore)
    }
}
export const initiateUserData = (user_data) => {
    console.log(user_data)
}
export const getUserData = (user_id) => {
    console.log(user_id)
    AppStore.emitChange()
}
export const receiveIncomingResponse = () => {
    return AppStore.data.incoming_message
}
export const sendUserText = async (message) => {

    initiateDialogueFlow(message)
}

export const trainNeuralNet = (content) => {
    console.log(content)

    AppStore.emitChange()
}
