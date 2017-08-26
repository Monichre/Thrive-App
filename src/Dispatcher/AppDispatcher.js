// AppDispatcher.js
import {
    Dispatcher
} from 'flux'
import {
    getUserData,
    addNewGoal,
    editGoal,
    logUserIn,
    logUserOut
} from '../Actions/Actions'

const AppDispatcher = new Dispatcher()

// Register callback with AppDispatcher
AppDispatcher.register((payload) => {

    let action = payload.action

    switch (action) {

        case 'add-new-goal':
            addNewGoal(payload.user, payload.goal)
            break

        case 'edit-goal':
            editGoal(payload.user, payload.goal_id)
            break

        case 'get-user-data':
            getUserData(payload.user)
            break

        case 'log-user-in':
            logUserIn(payload.user)
            break

        case 'log-user-out':
            logUserOut(payload.user)
            break

        default:
            return true

    }

    return true

})

export default AppDispatcher
