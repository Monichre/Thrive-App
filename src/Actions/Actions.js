// actions.js

import Firebase from '../firebase'
import _ from 'lodash'

// AppStore
import AppStore from '../Stores/AppStore'


export function getUserData(user_email) {
    AppStore.emitChange()
}

export function addNewGoal(user, goal) {
    AppStore.emitChange()
}

export function editGoal(goal_id) {
    AppStore.emitChange()
}

export function logUserIn(user) {

	let session_user
	let existing_user
	let new_user
	const dataBaseRef = Firebase.database().ref('users')

	dataBaseRef.on('value', (snapshot) => {
		let users = _.valuesIn(snapshot.val())
		existing_user = _.find(users, ['email', user.email])
		console.log(users)
		console.log(existing_user)
	})
	if (existing_user) {

	} else {
		new_user = {
			name: user.name,
			profile_picture: user.picture.data.url,
			email: user.email
		}
		dataBaseRef.push(session_user)
	}

	session_user = existing_user ? existing_user : new_user
	// this.setState({user: session_user, loggedIn: true})

	AppStore.data.session_user = session_user
	console.log(AppStore.data.session_user)
	AppStore.emitChange()
}

export function logUserOut(user) {

	console.log(user)
	AppStore.data.session_user = user
	AppStore.emitChange()
}
