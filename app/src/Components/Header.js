import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';



const FACEBOOK_CONFIG = {
	id: '309516536136806'
}

const FaceBookLogin = () => {
	return (
		<FacebookLogin
			appId="309516536136806"
			autoLoad={true}
			fields="name,email,picture"
			cssClass="fa fa-facebook"
    		icon="fa-facebook"
			scope="public_profile,user_friends"
			callback={this.responseFacebook}
		/>
	)
}


class Header extends Component {

    constructor(props) {
        super(props);
    }

    onLoginClick() {
        // alert("Clicked");
        // this.props.onLoginClick();
    }

    onLogoutClick() {
        // alert("Clicked");
        // this.props.onLogoutClick();
    }

    render() {

        return (
			<nav className="navbar navbar-transparent navbar-absolute">
				<div className="container-fluid">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle" data-toggle="collapse">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
					</div>
					<div className="collapse navbar-collapse">
						<ul className="nav navbar-nav navbar-right">
							<li>
								<a href="#pablo" className="dropdown-toggle" data-toggle="dropdown">
									<i className="material-icons">dashboard</i>
									<p className="hidden-lg hidden-md">Dashboard</p>
								</a>
							</li>
							<li className="dropdown">
								<a href="#" className="dropdown-toggle" data-toggle="dropdown">
									<i className="material-icons">notifications</i>
									<span className="notification">5</span>
									<p className="hidden-lg hidden-md">Notifications</p>
								</a>
								<ul className="dropdown-menu">
									<li><a href="#">New Goal Completion</a></li>
									<li><a href="#">New Goal Added</a></li>
									<li><a href="#">New Goal Failed</a></li>
									<li><a href="#">New Goal Completion</a></li>
								</ul>
							</li>
							<li>
								<a href="#pablo" className="dropdown-toggle" data-toggle="dropdown">
	 							   <i className="material-icons">person</i>
	 							   <p className="hidden-lg hidden-md">Profile</p>
		 						</a>
							</li>
						</ul>

						<form className="navbar-form navbar-right" role="search">
							<div className="form-group  is-empty">
								<input type="text" className="form-control" placeholder="Search" />
								<span className="material-input"></span>
							</div>
							<button type="submit" className="btn btn-white btn-round btn-just-icon">
								<i className="material-icons">search</i><div className="ripple-container"></div>
							</button>
						</form>
					</div>
				</div>
			</nav>

        );
    }
}

export default Header;
