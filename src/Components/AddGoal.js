import React, {Component} from 'react';
import ReactDOM from 'react-dom';


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
    }


    handleRequestClose(){
        this.setState({ open: false });
    }

    handleOpen(){
        this.setState({ open: true });
    }

    onGoalSubmit(){

        console.log("Form Submitted from Add Goal Component");
        // console.log(this.refs.goal.value);
        // console.log(this.refs.partner.value);
        // console.log(this.refs.squad.value);
        // console.log(this.refs.deadline.value);
        // console.log(this.refs.description.value);

        this.props.onGoalSubmit();

    }

    render() {

        return (
            <div>

                <Button onClick={this.handleOpen.bind(this)}>Add a Goal</Button>

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

                    <form onSubmit={this.onGoalSubmit.bind(this)}>
                          <TextField
                             id="goal"
                             label="goal"
                             value={this.state.goal}
                             onChange={event => this.setState({ goal: event.target.value })}
                             defaultValue="foo"
                             marginForm
                           />
                           <TextField
                             id="partner"
                             label="partner"
                             value={this.state.partner}
                             onChange={event => this.setState({ partner: event.target.value })}
                             defaultValue="foo"
                             marginForm
                           />
                           <TextField
                             id="squad"
                             label="squad"
                             value={this.state.squad}
                             onChange={event => this.setState({ squad: event.target.value })}
                             defaultValue="foo"
                             marginForm
                           />
                           <TextField
                             id="deadline"
                             label="deadline"
                             value={this.state.deadline}
                             onChange={event => this.setState({ deadline: event.target.value })}
                             defaultValue="foo"
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

                </Dialog>
            </div>
        );
    }
}

export default AddGoal;
