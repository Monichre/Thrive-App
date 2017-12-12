import React, {Component} from 'react'

export default class Modal extends Component {
    constructor(props){
        super(props)

        this.state = {
            displayModal: false
        }
    }
    componentDidMount(){
        console.log(this.props)
        if(this.props.routedPath === '/await-verification') {
            this.setState({displayModal: true})
        }
    }
    handleCloseModal() {
        
        console.log('im clicking')
        this.setState({
            displayModal: false
        })
    }
    render() {

        let modal_style = {
			display: this.state.displayModal ? 'block' : 'none',
			transform: 'translateY(50%)'
        }
        
        return (
            <div className={`modal`} style={modal_style}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Verify Your Account</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleCloseModal.bind(this)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Please check your email for your verification link</p>
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

