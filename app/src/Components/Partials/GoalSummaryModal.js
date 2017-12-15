import React, { Component } from 'react'

export default class GoalSummaryModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayModal: false
        }
    }
    componentWillMount() {
        this.setState({
            displayModal: this.props.displayModal
        })
    }
    shouldComponentUpdate() {
        return true
    }
    handleCloseModal() {
        this.props.handleCloseModal()
    }
    render() {

        const modal_style = {
            display: this.props.displayModal ? 'block' : 'none',
        }
        console.log(this.props.goal)
        return (
            <div className={`modal`} style={modal_style}>
                <div className="container modal-inner">
                    <div className="row">
                        <div className="modal-content col s12 m6 offset-m3">
                            <div className="card">
                                <div className="card-header">

                                </div>
                                <div className="card-content">
                                    <h2 className="card-title">Goal: {this.props.goal.goal ? this.props.goal.goal.user_goal_info.goal : ''}</h2>
                                    <h5>{this.props.goal.goal ? this.props.goal.goal.user_goal_info.meta_goal_intent : ''}</h5>
                                    <h5>{this.props.goal.goal ? this.props.goal.goal.user_goal_info.free_time : ''}</h5>
                                    <br />
                                    <h4 className="card-title">Your Progress</h4>
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{ width: 0 }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{ width: "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.handleCloseModal.bind(this)}>Close</button>
                    </div>
                </div>
            </div>
        )
    }
}