import React, { Component } from 'react';
import { Link, Redirect, BrowserHistory } from 'react-router-dom'
import '../css/welcome.css'
import AppDispatcher from '../Dispatcher/Dispatcher'
import AppStore from '../AppStore/AppStore'
import Modal from './OnBoarding/Modal'

const youNeedToVerify = () => {
	return (
		<div>
			<h5>You're account is not verified.</h5>
			<p>Please check your email and follow the steps for verification</p>
			<hr/>
			<p>Resend verification email?</p>
			<button>Resend verification</button>
		</div>
	)
}


export default class Welcome extends Component {

	constructor(props) {
		super(props)

		this.state = {
			email: '',
			password: '',
			userIsSignedIn: false,
			userIsVerified: false,
			displayModal: false
		}
	}
	componentWillMount() {

		

		if(AppStore.data.currentUser.loggedIn) {
			
		}
	}
	shouldComponentUpdate() {
		return true
	}

	handleSubmit(e) {
		e.preventDefault()
		const _this = this

		AppDispatcher.dispatch({
			action: 'sign-user-in',
			credentials: {
				email: this.state.email,
				password: this.state.password
			}
		})

		if(this.props.data.currentUser.isLoggedIn) {
			const user_id = localStorage.getItem('user_id')
			this.props.history.push(`users/dashboard/${user_id}`)
		}
		// console.log(this.state)

		// Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)

		// 	.catch(function (error, callback) {
		// 		var errorCode = error.code;
		// 		var errorMessage = error.message;
		// 		if (errorCode === 'auth/user-not-found') {
		// 			alert('Invalid Login')
		// 		}
		// 		alert("ERROR" + error.message)
		// 	})
		// 	.then(function (user) {
		// 		Firebase.auth().onAuthStateChanged(function (user) {
		// 			console.log(user)
		// 			if(user.emailVerified){
		// 				localStorage.setItem('displayName', user.displayName)
		// 				localStorage.setItem('user_id', JSON.stringify(user.uid))
		// 				_this.setState({
		// 					userIsSignedIn: true,
		// 					userIsVerified: true
		// 				})
		// 				_this.props.history.push(`users/dashboard/${user.uid}`)
		// 			} 
		// 		})
		// 	})
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
		if(document.querySelector('.slogan')){
			document.querySelector('.slogan').style.display = 'none'
		}
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
	// componentWillMount() {
	// 	if(this.props.data.currentUser.loggedIn) {
	// 		const user_id = localStorage.getItem('user_id')
	// 		this.props.history.push(`users/dashboard/${user_id}`)
	// 	}
	
	// }
	componentWillReceiveProps(nextProps) {

		console.log(nextProps)
		const current_user = nextProps.data.currentUser

		if(current_user.loggedIn) {
			const user_id = JSON.parse(localStorage.getItem('user_id'))
			localStorage.setItem('current_user', JSON.stringify(current_user))
			console.log(localStorage.getItem('current_user'))
			
			this.props.history.push(`users/dashboard/${user_id}`)
		}
	}
	componentDidMount() {
		
		// if(this.props.data.currentUser.loggedIn) {
		// 	const user_id = localStorage.getItem('user_id')
		// 	console.log(user_id)
		// 	this.props.history.push(`users/dashboard/${user_id}`)
		// }

		let searchContainer = document.querySelector('.search')
		let inputSearch = searchContainer.querySelector('.search__input')

		inputSearch.addEventListener('keyup', function (e) {
			if (e.keyCode == 27) { //Escape Key
				this.closeLogin()
			}
		})
	}


	render() {

		const link_style = {
			color: '#fff'
		}
		
		return (
			<div className="Welcome">
				<div className="container">
					<Modal routedPath={this.props.match.path}/>
					<nav className="navbar transparent">
						<ul className="right">
							<li>
								<div className="search-wrap">
									<div id="btn-search" style={{backgroundColor: '#74f1fc'}} className="waves-effect waves-light btn btn--search" onClick={this.openLogin.bind(this)}> Login </div>
								</div>
							</li>
						</ul>
					</nav>
					<div className="search">
						<button id="btn-search-close" className="btn btn--search-close" aria-label="Close search form" onClick={this.closeLogin.bind(this)}><svg className="icon icon--cross"><use xlinkHref="#icon-cross"></use></svg></button>
						<form className="search__form" action="" onSubmit={this.handleSubmit.bind(this)} >
							<input onChange={this.handleEmail.bind(this)} value={this.state.email} className="search__input" name="email" type="email" placeholder="Email" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="true" required />
							<input onChange={this.handlePassword.bind(this)} value={this.state.password} className="search__input" name="password" type="password" placeholder="Password" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="true" required />
							<span className="search__info">Hit enter to login or ESC to close</span>
							<button className="btn" type="submit">Send</button>
						</form>
					</div>
					<div className="slogan">
						<h1 className="slogan_text">
							Success <span className="period">.</span> <br />
							Delivered <span className="period">.</span>
						</h1>
						<h4 className="slogan_text_subheader">
							<i>AI meets success psychology</i> <br />
							<br />
							<div style={link_style}>
								<Link to='/signup' style={link_style}>Sign Up</Link>
							</div>
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
			</div>
		)
	}
}

