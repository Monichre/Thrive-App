import React, {Component} from 'react';

class Message extends Component {

    constructor(props){
        super(props);
        this.state = {
            messages: [
                "Whatev"
            ]
        };
    }

    render() {

        var messageNodes = this.state.messages.map((message) => {
            return(
                <div>{message}</div>
            );
         });

        return (
            <div className="Message">
                <div>{messageNodes}</div>
            </div>
        );
    }
}

export default Message;
