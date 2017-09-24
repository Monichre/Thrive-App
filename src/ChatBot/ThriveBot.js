import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YveBot from 'yve-bot';

export default class ThriveBot extends Component {
    constructor(props){
        super(props)

        this.state = {
            rules: []
        }
        const bot = new YveBot(rules);
        bot.start();
    }
    render() {
        
        return (
           
        )
    }
}
