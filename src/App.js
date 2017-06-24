import React, {Component} from 'react';
import MessageList from './Components/MessageList.js';
import ChannelList from './Components/ChannelList.js';

import AppBar from 'material-ui/AppBar';


class App extends Component {

    constructor(){
        super();
    }

    render() {
        return (
            <div>
                <AppBar title="Thrive" />
                <MessageList />
                <ChannelList />
            </div>
        );
    }
}

export default App;
