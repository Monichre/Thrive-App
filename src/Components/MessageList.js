import React, {Component} from 'react';
import Message from './Message.js';

class MessageList extends Component {


    render() {
        return (
            <div className="MessageList">
                <Message />
            </div>
        );
    }
}

export default MessageList;
