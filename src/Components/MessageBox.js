import React, {Component} from 'react';
import Card, { CardActions, CardContent } from 'material-ui/Card';

class MessageBox extends Component {

    constructor(props){
        super(props);
    }

    render() {

        return (
            <Card>
                <textarea style = {{
                        width: '100%',
                        borderColor: '#D0D0D0',
                        resize: 'none',
                        borderRadius: 3,
                        minHeight: 50
                    }}/>
            </Card>
        );
    }
}

export default MessageBox;
