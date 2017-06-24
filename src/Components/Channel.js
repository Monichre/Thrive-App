import React, {Component} from 'react';

class Channel extends Component {

    constructor(props){
        super(props);
    }

    render() {

        return (
            <div>{this.props.channel}</div>
        );
    }
}

export default Channel;
