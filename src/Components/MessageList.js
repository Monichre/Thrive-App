import React, {Component} from 'react';
import Message from './Message.js';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

class MessageList extends Component {

    constructor(props){
        super(props);
        this.state = {
            messages: [
                "This is a message"
            ]
        };
    }

    render() {

        var messageNodes = this.state.messages.map((message) => {
            return(
                <List>
                    <ListItem
                        leftAvatar={<Avatar src="img/KLP_8320.jpg" />}
                        rightIcon={<CommunicationChatBubble />}
                        > <Message message={message} />
                    </ListItem>
                </List>

            );
         });

        return (
            <Card>
                <CardHeader
                  title="Your Chats"
                  subtitle="Chat History"
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                {messageNodes}
            </Card>


        );
    }
}

export default MessageList;
