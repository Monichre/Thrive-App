import React, {Component} from 'react';
import Channel from './Channel.js';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import Group from 'material-ui-icons/Group';

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
                    <ListItem>
                        <ListItemIcon>
                            {<Group />}
                        </ListItemIcon>
                        <Channel channel={channel} />
                    </ListItem>
                </List>

            );
         });

        return (
            <Card>
                <h1>Your Channels</h1>
                {channelNodes}
            </Card>


        );
    }
}

export default ChannelList;
