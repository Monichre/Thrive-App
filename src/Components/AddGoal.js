import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// Firebase
import Firebase from 'firebase';


// Material UI
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/TextField';
import Form from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import FloatingActionButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';


class AddGoal extends Component {

    constructor(props){
        super(props);

        this.state = {
            open: false,
            goal: '',
            squad: '',
            partner: '',
            description: '',
            deadline: ''

        };

        // this.firebaseRef = new Firebase()
    }


    handleRequestClose(){
        this.setState({ open: false });
        console.log(this.state);
    }
    saveGoal(e){
        if(e.keyCode === 13) {
            e.preventDefault;
            this.handleRequestClose();
        }
    }
    handleOpen(){
        this.setState({ open: true });
    }

    render() {

        var style = {
            marginTop: '100px',
            padding: '50px'
        }

        return (
            <div>

                <FloatingActionButton onClick={this.handleOpen.bind(this)}>
                  <AddIcon />
                </FloatingActionButton>
                <Dialog
                  fullScreen
                  open={this.state.open}
                  onRequestClose={this.handleRequestClose}
                  transition={<Slide direction="up" />}>

                    <AppBar className="">
                        <Toolbar>
                            <IconButton color="contrast" onClick={this.handleRequestClose.bind(this)} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography type="title" color="inherit">
                                Add a Goal
                            </Typography>
                            <Button color="contrast" onClick={this.handleRequestClose.bind(this)}>save</Button>
                        </Toolbar>
                    </AppBar>

                    <Grid style={style} container justify="center" gutter={24}>
                        <Grid item xs={12}>
                            <form onKeyUp={this.saveGoal.bind(this)}>
                                  <TextField
                                     id="goal"
                                     label="goal"
                                     value={this.state.goal}
                                     onChange={event => this.setState({ goal: event.target.value })}
                                     marginForm
                                   />
                                   <TextField
                                     id="partner"
                                     label="partner"
                                     value={this.state.partner}
                                     onChange={event => this.setState({ partner: event.target.value })}
                                     marginForm
                                   />
                                   <TextField
                                     id="squad"
                                     label="squad"
                                     value={this.state.squad}
                                     onChange={event => this.setState({ squad: event.target.value })}
                                     marginForm
                                   />
                                   <TextField
                                     id="deadline"
                                     label="deadline"
                                     value={this.state.deadline}
                                     onChange={event => this.setState({ deadline: event.target.value })}
                                     marginForm
                                   />
                                   <TextField
                                     id="description"
                                     label="description"
                                     value={this.state.description}
                                     onChange={event => this.setState({ description: event.target.value })}
                                     defaultValue="foo"
                                     marginForm
                                   />
                           </form>
                        </Grid>
                    </Grid>
                </Dialog>
            </div>
        );
    }
}

export default AddGoal;
