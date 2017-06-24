import React, {Component} from 'react';
import Channel from './Channel.js';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import GroupIcon from 'material-ui/svg-icons/social/group';

class ChannelList extends Component {

    constructor(props){
        super(props);
        this.state = {
            channels: [
                'Squad', 'Private', 'Class'
            ]
        };
    }

    render() {

        var channelNodes = this.state.channels.map((channel) => {
            return(
                <List>
                    <ListItem leftIcon={<GroupIcon />}>
                        <Channel channel={channel} />
                    </ListItem>
                </List>

            );
         });

        return (
            <Card>
                <CardHeader
                  title="Your Channels"
                  actAsExpander={true}
                  showExpandableButton={true}
                />
            {channelNodes}
            </Card>


        );
    }
}

export default ChannelList;
