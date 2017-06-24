import React, {Component} from 'react';
import ReactDOM from 'react-dom';



class Goal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            milestone: '',
            userId: '',
            difficultyLevel: '',
            completed: false
        }
    }
    componentWillMount(){

    }
    render() {
        return (

            <div>
                Goal
            </div>
        );
    }
}

export default Goal;
