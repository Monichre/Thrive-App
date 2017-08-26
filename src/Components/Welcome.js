import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import '../css/welcome.css'

import {
  Redirect
} from 'react-router-dom'

import AppDispatcher from '../Dispatcher/AppDispatcher'
import AppStore from '../Stores/AppStore'


// <div className="row">
// 	<div className="col-sm-6 col-sm-offset-3">
// 		<h1 className="intro text-center" style={{textAlign: 'center', color: 'white'}}>GOALS. DELIVERED</h1>
// 		<h5 className="text-center" style={{textAlign: 'center', color: 'white'}}>Designed and constructed from decades of research in cognitive science, THRIVE delivers digestible, actionable roadmaps for
// 		your goals.</h5>
// 	<h3 className="text-center" style={{textAlign: 'center', color: 'white'}}>Success Tailored</h3>
// 	</div>
// </div>
class Welcome extends Component {

	responseFacebook(user){
		console.log(user)
		const new_user = {
			name: user.name,
			profile_picture: user.picture.data.url,
			email: user.email
		}
		AppDispatcher.dispatch({
			action: 'log-user-in',
			user: new_user
		})
	}

    render() {

        var logoBg = "img/thrive-logo.png";
        var logoBgStyle = {
            background: "img/thrive-logo-bg.png"
        };
        const FACEBOOK_CONFIG = {
			id: '309516536136806'
		}

		const FaceBookLogin = () => {
			return (
					<FacebookLogin
						appId="309516536136806"
						autoLoad={true}
						fields="name,email,picture"
						cssClass="fa fa-lg"
			    		icon="fa-facebook"
						textButton=""
						scope="public_profile,user_friends"
						callback={this.responseFacebook.bind(this)}
					/>
			)
		}
        return (
            <div className="Welcome">
				<nav className="navbar navbar-transparent navbar-absolute">
					<div className="container-fluid">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle" data-toggle="collapse">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<a className="navbar-brand" href="#">Join</a>
						</div>
						<div className="collapse navbar-collapse">
							<ul className="nav navbar-nav navbar-right">
								<li>
									<a href="#pablo" className="dropdown-toggle" data-toggle="dropdown">
										<i className="material-icons">dashboard</i>
										<p className="hidden-lg hidden-md">Dashboard</p>
									</a>
								</li>
								<li>
									<a href="#pablo" className="dropdown-toggle" data-toggle="dropdown">
		 							   <i className="material-icons">person</i>
		 							   <p className="hidden-lg hidden-md">Profile</p>
			 						</a>
								</li>
								<li>
									<a href="#pablo" className="dropdown-toggle" data-toggle="dropdown">
										<FaceBookLogin />
									</a>
								</li>
							</ul>
						</div>
					</div>
				</nav>
				<div className="slogan">
					<h1 className="slogan_text">
						Success <span className="period">.</span> <br/>
						Delivered <span className="period">.</span>
					</h1>
					<h4 className="slogan_text_subheader">
						<span className="AI">A<span className="white_period"> . </span> I <span className="white_period">.</span></span> <span className="white_period">+</span> Success Psychology
					</h4>
				</div>
                <div className="logo_container">
                    <div className="coast">
                        <div className="wave-rel-wrap">
                            <div className="wave"></div>
                        </div>
                    </div>
                    <div className="coast delay">
                        <div className="wave-rel-wrap">
                            <div className="wave delay"></div>
                        </div>
                    </div>
                    <div className="text text-t">t</div>
                    <div className="text text-h">h</div>
                    <div className="text text-r">r</div>
                    <div className="text text-i">i</div>
                    <div className="text text-v">v</div>
                    <div className="text text-e">e</div>
                </div>

            </div>
        );
    }
}
export default Welcome;
