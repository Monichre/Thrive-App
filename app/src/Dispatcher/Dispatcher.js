// AppDispatcher.js
import {
    Dispatcher
} from 'flux'
import {
    getStore,
    getUserData,
    initializeUserWithGoals,
    sendUserText,
    signUserIn,
    trainNeuralNet,
    receiveIncomingResponse
} from '../Actions/Actions'

const AppDispatcher = new Dispatcher()

AppDispatcher.register((payload) => {

    let action = payload.action

    switch (action) {

        case 'get-app-store':
            getStore()
            break
            
        case 'initialize-user-with-goals':
            initializeUserWithGoals(payload.user_data)
            break
        
        case 'sign-user-in':
            signUserIn(payload.credentials)
            break

        case 'get-user-data':
            getUserData(payload.user_id)
            break

        case 'send-user-text':
            sendUserText(payload.message)
            break
        case 'receive-incoming-reponse':
            receiveIncomingResponse()
            break

        case 'train-neural-net':
            trainNeuralNet(payload.content)
            break

        default:
            return true

    }

    return true

})

export default AppDispatcher