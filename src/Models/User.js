import React, {Component} from 'react';
import ReactDOM from 'react-dom';



class User extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            gender: '',
            website: '',
            profilePicture: '',
            firstName: '',
            lastName: '',
            email: '',
            userID: '',
            idToken: '',
            gender: '',
            goals: [],
            loggedIn: false
        }
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default User;
