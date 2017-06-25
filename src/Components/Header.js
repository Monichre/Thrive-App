import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

class Header extends Component {

    constructor(props){
        super(props);
    }

    onLoginClick() {
        alert("Clicked");
        this.props.onLoginClick();
    }

    onLogoutClick() {
        alert("Clicked");
        this.props.onLogoutClick();
    }

    render() {

        let authLink,
            userName;
        var logo = "img/thrive-logo.png",
            logoImgStyle = {
            display: "inline-block"
        };

        if(this.props.loggedIn){
            authLink = <li><Link to="" onClick={this.onLogoutClick.bind(this)}>Log Out</Link></li>;
            userName = <li><a>Welcome {this.props.userName} </a></li>;
        } else {
            authLink = <li><Link to="" onClick={this.onLoginClick.bind(this)}>Log In</Link></li>;
            userName = '';
        }

        return (
            <AppBar position="static">
              <Toolbar>
                <IconButton color="contrast" aria-label="Menu">
                  <MenuIcon />
                </IconButton>
                <Typography type="title" color="inherit" className="">Thrive</Typography>
                <Button>{userName}</Button>
                <Button color="contrast">{authLink}</Button>
              </Toolbar>
            </AppBar>
        );
    }
}




export default Header;
