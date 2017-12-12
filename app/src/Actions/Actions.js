import _ from 'lodash'
import AppStore from '../AppStore/AppStore'
import Firebase from '../firebase'
// import {config} from '../config'


const config = {
    DEVELOPER_ACCESS_TOKEN: 'fcea36c1fd46462ea673ef140affcc4d',
    CLIENT_ACCESS_TOKEN: 'a17884aa86924c23b2a63479a0bfa814'
}

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
export const initializeUserWithGoals = (user_data) => {
    console.log(user_data)

    const user = Firebase.auth().currentUser
    console.log(user)
    
    user.updateProfile({

      displayName: user_data.name,

    }).then((response) => {
      

      const new_user_key = Firebase.database().ref('users/' + user.uid).set({
        username: user_data.name,
        occupation: user_data.occupation,
        salary: user_data.salary,
        number_of_siblings: user_data.number_of_siblings,
        birth_order: user_data.birth_order,
        facebook_platform_data: user_data.facebook_platform_data,
        google_platform_data: user_data.google_platform_data
      })
  
      const new_goal_key = Firebase.database().ref('users/' + user.uid).child('goals').push().key
      const user_goal_info = {}
      const updates = {}
  
  
      user_goal_info.goal = user_data.user_goal_info.goal
      user_goal_info.milestone = user_data.user_goal_info.milestone
      user_goal_info.commitment_level = user_data.user_goal_info.commitment_level
      user_goal_info.meta_goal_intent = user_data.user_goal_info.meta_goal_intent
      user_goal_info.success_track = user_data.user_goal_info.success_track
      user_goal_info.free_time = user_data.user_goal_info.free_time
      user_goal_info.education_level = user_data.user_goal_info.education_level
      user_goal_info.success_track = user_data.user_goal_info.success_track
  
  
      Firebase.database().ref('users/' + user.uid + '/goals/' + new_goal_key).set({
        goal: {...user_goal_info}
      })

      

    }).catch((error) => {
      console.log(error)
    })

    AppStore.emitChange()
}
export const signUserIn = (credentials) => {

    console.log(credentials)
    return Firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
        .catch((error, callback) => {

            const errorCode = error.code
            const errorMessage = error.message

            if (errorCode === 'auth/user-not-found') {
                alert('Invalid Login')
            }

            return alert("ERROR" + error.message)
        })
        .then((user) => {
            console.log(user)
            Firebase.auth().onAuthStateChanged((user) => {

                if(user.emailVerified){
                    localStorage.setItem('displayName', user.displayName)
                    localStorage.setItem('user_id', JSON.stringify(user.uid))
                    
                    AppStore.data.currentUser = user
                    AppStore.data.currentUser.isVerified = user.emailVerified
                    AppStore.data.currentUser.loggedIn = true

                    AppStore.emitChange()

                } 
            })
        })
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
