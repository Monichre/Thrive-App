import React, { Component } from 'react'

export default class GoalSummaryModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayModal: false
        }
    }
    componentWillMount(){
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
        return (
            <div className={`modal`} style={modal_style}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleCloseModal.bind(this)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="card">
                                <img className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" alt="Card image cap" />
                                <div className="card-body">
                                    <h4 className="card-title">Your Progress</h4>
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{width: 0 }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{width: "75%"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{width: "100%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <a href="#" className="btn btn-primary">Button</a>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.handleCloseModal.bind(this)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}