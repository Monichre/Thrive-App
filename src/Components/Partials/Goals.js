import React, {Component} from 'react'


export default class Goals extends Component {
    constructor(props){
        super(props)

        this.state = {

        }
    }
    render() {
        return (
            <div id="Goals">
                {this.props.goals.map((goal) => {
                    return (
                        <div className="goal_card">
                            <div className='more_info_icon'>
                                <i className="material-icons"><i className="material-icons">info</i></i><div className="ripple-container"></div>
                            </div>
                            <div className="goal_card_inner">
                                <h5>{goal.goal}</h5>
                                <p>Snapshot:</p>
                                <ul>
                                    <li>
                                    <i className="material-icons"><i className="material-icons">event</i></i><div className="ripple-container"></div>
                                        {goal.milestone}
                                    </li>
                                </ul>
                            </div>
                        </div>)}
                )}

            </div>
        )
    }
}