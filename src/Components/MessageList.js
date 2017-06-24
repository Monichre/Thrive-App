import React, {Component} from 'react';
import Message from './Message.js';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { withStyles, createStyleSheet } from 'material-ui/styles';

import MessageIcon from 'material-ui-icons/Message';

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
                        leftAvatar={<Avatar src="img/KLP_8320.jpg" />}>
                        <ListItemIcon>
                            {<MessageIcon />}
                        </ListItemIcon>
                         <Message message={message} />
                    </ListItem>
                </List>

            );
         });

        return (
            <Card>
                <h1>Your Chats</h1>
                <h2>Chat History</h2>
                {messageNodes}
            </Card>


        );
    }
}

export default MessageList;
