import React, {Component} from 'react';
import ChatBot from 'react-simple-chatbot';

export default class ThriveBot extends Component {
    constructor(props){
        super(props)

     
    }
    render() {
        
        return (
            <ChatBot
                steps={[
                {
                    id: 'hello-world',
                    message: 'Hello World!',
                    end: true,
                },
                ]}
            />
        )
    }
}
