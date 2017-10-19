import React, {Component} from 'react';
import ChatBot from 'react-simple-chatbot';

export default class ThriveBot extends Component {
    constructor(props){
        super(props)

     
    }
    render() {
        
        return (
            <ChatBot
                steps= {
                        [
                            {
                                id: '1',
                                message: 'Im Persis, shall we review your goals?',
                                
                                trigger: '2'
                            },
                            {
                                id: '2',
                                options: [
                                    { value: 'yes', label: 'Yes?', trigger: 'yes' },
                                    { value: 'no', label: 'No?', trigger: 'no' }
                                ]
                            },
                            {
                                id: 'no',
                                user: true,
                                trigger: '3'
                            },
                            {
                                id: 'yes',
                                component: (
                                    <div> Goal Summary</div>
                                )
                            },
                            {
                                id: '3',
                                options: [
                                    { value: 'yes', label: 'Yes?', trigger: 'newGoal' },
                                    { value: 'no', label: 'No?', trigger: 'noNewGoal' }
                                ]
                            },
                            {
                                id: 'newGoal',
                                message: "New Goal"
                            },
                            {
                                id: 'noNewGoal',
                                message: "No new Goal",
                                end: true
                            }
                        ]
                    }
            />
        )
    }
}
