import React, { Component } from 'react';
import { Link, Redirect, BrowserHistory } from 'react-router-dom'
import '../css/welcome.css'
import Firebase from '../firebase'
import { browserHistory } from 'react-router';

export default class Welcome extends Component {

	constructor(props) {
		super(props)

		this.state = {
			email: '',
			password: '',
			userIsSignedIn: false
		}
	}

	handleSubmit(e) {
		e.preventDefault()
		const _this = this
		console.log(this.state)

		Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)

			.catch(function (error, callback) {
				var errorCode = error.code;
				var errorMessage = error.message;
				if (errorCode === 'auth/user-not-found') {
					alert('Invalid Login')
				}
				else {
					
				}
			})
			.then(function(user) {
				Firebase.auth().onAuthStateChanged(function(user) {
					console.log(user)
					if (user) {
						localStorage.setItem('user', JSON.stringify(user.uid))
						_this.props.history.push(`users/dashboard`);
					} else {
					  
					}
				})
			})

		

	}
	userIsSignedIn(user) {
		return user.isAnonymous != true
	}

	handleEmail(e) {
		e.preventDefault()
		this.setState({ email: e.target.value })

	}

	handlePassword(e) {
		e.preventDefault()
		this.setState({ password: e.target.value })

	}

	openLogin(e) {
		e.preventDefault()

		let searchContainer = document.querySelector('.search')
		let inputSearch = searchContainer.querySelector('.search__input')
		document.querySelector('.slogan').style.display = 'none'
		searchContainer.classList.add('search--open');
		inputSearch.focus();
	}

	closeLogin(e) {
		e.preventDefault()
		let searchContainer = document.querySelector('.search')
		let inputSearch = searchContainer.querySelector('.search__input')

		searchContainer.classList.remove('search--open');
		inputSearch.blur();
		inputSearch.value = '';
		document.querySelector('.slogan').style.display = 'block'
	}
	componentDidMount() {
		let user = Firebase.auth().currentUser

		let searchContainer = document.querySelector('.search')
		const inputSearch = searchContainer.querySelector('.search__input')

		inputSearch.addEventListener('keyup', function (e) {
			if (e.keyCode == 27) { //Escape Key
				this.closeLogin()
			}
		})
	}

	render() {

			return (
				<div className="Welcome">
					<nav className="navbar navbar-transparent navbar-absolute">
						<div className="container-fluid">
							<ul className="nav navbar-nav navbar-left">
								<li>
									<Link to='/signup'>Sign Up</Link>
								</li>

							</ul>

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
										<div className="search-wrap">
											<div id="btn-search" className="btn btn--search" onClick={this.openLogin.bind(this)}> Login </div>
										</div>
									</li>
								</ul>
							</div>
						</div>

					</nav>
					<div className="search">
						<button id="btn-search-close" className="btn btn--search-close" aria-label="Close search form" onClick={this.closeLogin.bind(this)}><svg className="icon icon--cross"><use xlinkHref="#icon-cross"></use></svg></button>
						<form className="search__form" action="" onSubmit={this.handleSubmit.bind(this)} >
							<input onChange={this.handleEmail.bind(this)} value={this.state.email} className="search__input" name="email" type="email" placeholder="Email" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="true" required/>
							<input onChange={this.handlePassword.bind(this)} value={this.state.password} className="search__input" name="password" type="password" placeholder="Password" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="true" required/>
							<span className="search__info">Hit enter to login or ESC to close</span>
							<button type="submit">Send</button>
						</form>
					</div>
					<div className="slogan">
						<h1 className="slogan_text">
							Success <span className="period">.</span> <br />
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
			)
	}
}

