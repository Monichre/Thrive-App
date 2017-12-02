// import {config} from '../config'
// const ApiAi = require('apiai')
// const client = ApiAi(config.CLIENT_ACCESS_TOKEN)

// const sessionId = JSON.parse(localStorage.getItem('user_id'))


// export const Dialogue = {

//     incoming_reponse: '',

//     sendUserText: async (message) => {

//         let waiting_response

//         const convo = client.textRequest(message, {
//             sessionId: sessionId
//         })

//         convo.on('response', (response) => {
//             waiting_response = response.result.fulfillment.speech
//         })

//         convo.on('error', (error) => {
//             console.log(error)
//         })

//         convo.end()
        
     
//         return waiting_response
//     }

// }