import React, { Component } from 'react'
import '../../css/signup.css'
import Firebase from '../../firebase'
import classie from 'classie'
import Axios from 'axios'
import AppDispatcher from '../../Dispatcher/Dispatcher'



export default class OnBoardForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      password: '',
      goal: '',
      success_track: '',
      milestone: '',
      commitment_level: '',
      free_time: '',
      education_level: '',
      meta_goal_intent: '',
      occupation: '',
      salary: '',
      number_of_siblings: '',
      birth_order: '',
      facebook_platform_data: {
        accessToken: '',
        photo: ''
      },
      google_platform_data: {
        accessToken: ''
      }
    }
    
  }
  componentDidMount() {
    console.log(this.props)

    window.addEventListener('load', function () {
      const formWrap = document.getElementById('fs-form-wrap')

      new window.FForm(formWrap, {
        onReview: function () {
          classie.add(document.body, 'overview')
        }
      })
    }, false)

  }
  sendVerificationEmail() {

    let user = Firebase.auth().currentUser
    user.sendEmailVerification().then(() => {
      console.log('email sent')
    }).catch((error) => {
      console.log(error)
    });
  }

  handleSubmit(e) {
    e.preventDefault()

    const credential = Firebase.auth.EmailAuthProvider.credential(this.state.email, this.state.password)
    console.log(credential)
    const _this = this

    Firebase.auth().currentUser.linkWithCredential(credential).then((user) => {
      console.log(user)
      _this.sendVerificationEmail()
      _this.initializeNewUserGoals()
      _this.props.reRouteOnFormSubmit()

    }).catch((err) => {
      console.log(err)
    })
    


    // Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((response) => {
    //   console.log(response)

  
  
    // })
  }
  initializeNewUserGoals() {

    AppDispatcher.dispatch({

      action: 'initialize-user-with-goals',

      user_data: {
        name: this.state.name,
        displayName: this.state.name,
        occupation: this.state.occupation,
        salary: this.state.salary,
        number_of_siblings: this.state.number_of_siblings,
        birth_order: this.state.birth_order,
        facebook_platform_data: this.state.facebook_platform_data,
        google_platform_data: this.state.google_platform_data,

        user_goal_info: {
          goal: this.state.goal,
          milestone: this.state.milestone,
          commitment_level: this.state.commitment_level,
          meta_goal_intent: this.state.meta_goal_intent,
          success_track: this.state.success_track,
          free_time: this.state.free_time,
          education_level: this.state.education_level,
          success_track: this.state.success_track
        }
      }
     
    })
  }
  handleName(e) {
    e.preventDefault()
    console.log(e.target.value)
    this.setState({ name: e.target.value })
  }
  handleEmail(e) {
    e.preventDefault()
    console.log(e.target.value)
    this.setState({ email: e.target.value })
  }
  handlePassword(e) {
    e.preventDefault()
    console.log(e.target.value)
    this.setState({ password: e.target.value })
  }
  handleGoal(e) {
    e.preventDefault()
    console.log(e.target.value)
    this.setState({ goal: e.target.value })
  }
  handleMilestone(e) {
    e.preventDefault()
    console.log(e.target.value)
    this.setState({ milestone: e.target.value })
  }
  handleCommitmentLevel(e) {
    e.preventDefault()
    console.log(e.target)
    this.setState({ commitment: e.target.value })
  }
  handleIntentOfGoal(e) {
    e.preventDefault()
    console.log(e.target.value)
    this.setState({ meta_goal_intent: e.target.value })
  }
  handleSalaryInput(e) {
    e.preventDefault()
    this.setState({ salary: e.target.value })
  }
  handleOccupationInput(e) {
    e.preventDefault()
    this.setState({ occupation: e.target.value })
  }
  handleSiblingsInput(e) {
    e.preventDefault()
    this.setState({ number_of_siblings: e.target.value })
  }
  handleBirthOrderInput(e) {
    e.preventDefault()
    this.setState({ birth_order: e.target.value })
  }
  handleEducationLevel(e) {
    e.preventDefault()
    this.setState({ education_level: e.target.value })

  }
  handleChosenTrack(e) {
    e.preventDefault()
    console.log(e.target.value)
    this.setState({ success_track: e.target.value })

  }
  handleFreeTimeInput(e) {
    e.preventDefault()
    console.log(e.target.value)
    this.setState({ free_time: e.target.value })

  }
  handleFacebookSync(e) {
    e.preventDefault()

    const facebookProvider = new Firebase.auth.FacebookAuthProvider()
    const existing_user = Firebase.auth().currentUser
    console.log(existing_user)

    facebookProvider.addScope('public_profile, email')
    facebookProvider.setCustomParameters({
      'display': 'popup'
    })


    if (existing_user) {

      existing_user.linkWithPopup(facebookProvider).then((result) => {

        const credential = result.credential
        const token = result.credential.accessToken
        const user = result.user

        this.setState({
            facebook_platform_data: {
              accessToken: token,
              timezone: result.additionalUserInfo.profile.timezone,
              photo: result.additionalUserInfo.profile.picture.data.url
            }
          })
      }).catch((error) => {

        console.log(error)

      })
    } else {

      Firebase.auth().signInWithPopup(facebookProvider).then((result) => {
        console.log(result)
        const token = result.credential.accessToken
        const user = result.user
        console.log(user)

        this.setState({
          facebook_platform_data: {
            accessToken: token,
            timezone: result.additionalUserInfo.profile.timezone,
            photo: result.additionalUserInfo.profile.picture.data.url
          }
        })

      }).catch((error) => {
        console.log(error)

        const errorCode = error.code
        const errorMessage = error.message
        const email = error.email
        const credential = error.credential

      })
    }
  }

  handleGoogleSync(e) {
    e.preventDefault()

    const googleProvider = new Firebase.auth.GoogleAuthProvider()
    const existing_user = Firebase.auth().currentUser
    console.log(existing_user)

    googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly')
    googleProvider.addScope('https://www.googleapis.com/auth/calendar')
    googleProvider.setCustomParameters({
      'display': 'popup'
    })

    if (existing_user) {
      existing_user.linkWithPopup(googleProvider).then((result) => {

        const credential = result.credential
        const token = result.credential.accessToken
        const user = result.user

        this.setState({
          google_platform_data: {
            accessToken: token
          }
        })

      }).catch((error) => {
        console.log(error)
      })

    } else {
      Firebase.auth().signInWithPopup(googleProvider).then((result) => {

        const token = result.credential.accessToken
        const user = result.user

        this.setState({
          google_platform_data: {
            accessToken: token
          }
        })
      })

    }
  }
  initCalendarSync() {

    const CLIENT_ID = '869272160764-0fgctm8m6n1hv4aotq2ccrnauodj2g4q.apps.googleusercontent.com'
    const API_KEY = 'AIzaSyBa7AHgeeKObEk0AoNNi8E3AGE7HVIdo0g'
    const CLIENT_SECRET = 'HFwHOo6TNdepBJ31UeYRo7Fw'
    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    const SCOPES = "https://www.googleapis.com/auth/calendar"

    const credentials = {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET
    }

  }

  render() {
    if( document.createElement('svg').getAttributeNS ) {

	var checkbxsCross = Array.prototype.slice.call( document.querySelectorAll( '.fs-form-full .ac-cross input[type="checkbox"]' ) ),
		radiobxsFill = Array.prototype.slice.call( document.querySelectorAll( '.fs-form-full .ac-fill input[type="radio"]' ) ),
		checkbxsCheckmark = Array.prototype.slice.call( document.querySelectorAll( '.fs-form-full .ac-checkmark input[type="checkbox"]' ) ),
		radiobxsCircle = Array.prototype.slice.call( document.querySelectorAll( '.fs-form-full .ac-circle input[type="radio"]' ) ),
		checkbxsBoxfill = Array.prototype.slice.call( document.querySelectorAll( '.fs-form-full .ac-boxfill input[type="checkbox"]' ) ),
		radiobxsSwirl = Array.prototype.slice.call( document.querySelectorAll( '.fs-form-full .ac-swirl input[type="radio"]' ) ),
		checkbxsDiagonal = Array.prototype.slice.call( document.querySelectorAll( '.fs-form-full .ac-diagonal input[type="checkbox"]' ) ),
		checkbxsList = Array.prototype.slice.call( document.querySelectorAll( '.fs-form-full .ac-list input[type="checkbox"]' ) ),
		pathDefs = {
			cross : ['M 10 10 L 90 90','M 90 10 L 10 90'],
			fill : ['M15.833,24.334c2.179-0.443,4.766-3.995,6.545-5.359 c1.76-1.35,4.144-3.732,6.256-4.339c-3.983,3.844-6.504,9.556-10.047,13.827c-2.325,2.802-5.387,6.153-6.068,9.866 c2.081-0.474,4.484-2.502,6.425-3.488c5.708-2.897,11.316-6.804,16.608-10.418c4.812-3.287,11.13-7.53,13.935-12.905 c-0.759,3.059-3.364,6.421-4.943,9.203c-2.728,4.806-6.064,8.417-9.781,12.446c-6.895,7.477-15.107,14.109-20.779,22.608 c3.515-0.784,7.103-2.996,10.263-4.628c6.455-3.335,12.235-8.381,17.684-13.15c5.495-4.81,10.848-9.68,15.866-14.988 c1.905-2.016,4.178-4.42,5.556-6.838c0.051,1.256-0.604,2.542-1.03,3.672c-1.424,3.767-3.011,7.432-4.723,11.076 c-2.772,5.904-6.312,11.342-9.921,16.763c-3.167,4.757-7.082,8.94-10.854,13.205c-2.456,2.777-4.876,5.977-7.627,8.448 c9.341-7.52,18.965-14.629,27.924-22.656c4.995-4.474,9.557-9.075,13.586-14.446c1.443-1.924,2.427-4.939,3.74-6.56 c-0.446,3.322-2.183,6.878-3.312,10.032c-2.261,6.309-5.352,12.53-8.418,18.482c-3.46,6.719-8.134,12.698-11.954,19.203 c-0.725,1.234-1.833,2.451-2.265,3.77c2.347-0.48,4.812-3.199,7.028-4.286c4.144-2.033,7.787-4.938,11.184-8.072 c3.142-2.9,5.344-6.758,7.925-10.141c1.483-1.944,3.306-4.056,4.341-6.283c0.041,1.102-0.507,2.345-0.876,3.388 c-1.456,4.114-3.369,8.184-5.059,12.212c-1.503,3.583-3.421,7.001-5.277,10.411c-0.967,1.775-2.471,3.528-3.287,5.298 c2.49-1.163,5.229-3.906,7.212-5.828c2.094-2.028,5.027-4.716,6.33-7.335c-0.256,1.47-2.07,3.577-3.02,4.809'],
			checkmark : ['M16.667,62.167c3.109,5.55,7.217,10.591,10.926,15.75 c2.614,3.636,5.149,7.519,8.161,10.853c-0.046-0.051,1.959,2.414,2.692,2.343c0.895-0.088,6.958-8.511,6.014-7.3 c5.997-7.695,11.68-15.463,16.931-23.696c6.393-10.025,12.235-20.373,18.104-30.707C82.004,24.988,84.802,20.601,87,16'],
			circle : ['M34.745,7.183C25.078,12.703,13.516,26.359,8.797,37.13 c-13.652,31.134,9.219,54.785,34.77,55.99c15.826,0.742,31.804-2.607,42.207-17.52c6.641-9.52,12.918-27.789,7.396-39.713 C85.873,20.155,69.828-5.347,41.802,13.379'],
			boxfill : ['M6.987,4.774c15.308,2.213,30.731,1.398,46.101,1.398 c9.74,0,19.484,0.084,29.225,0.001c2.152-0.018,4.358-0.626,6.229,1.201c-5.443,1.284-10.857,2.58-16.398,2.524 c-9.586-0.096-18.983,2.331-28.597,2.326c-7.43-0.003-14.988-0.423-22.364,1.041c-4.099,0.811-7.216,3.958-10.759,6.81 c8.981-0.104,17.952,1.972,26.97,1.94c8.365-0.029,16.557-1.168,24.872-1.847c2.436-0.2,24.209-4.854,24.632,2.223 c-14.265,5.396-29.483,0.959-43.871,0.525c-12.163-0.368-24.866,2.739-36.677,6.863c14.93,4.236,30.265,2.061,45.365,2.425 c7.82,0.187,15.486,1.928,23.337,1.903c2.602-0.008,6.644-0.984,9,0.468c-2.584,1.794-8.164,0.984-10.809,1.165 c-13.329,0.899-26.632,2.315-39.939,3.953c-6.761,0.834-13.413,0.95-20.204,0.938c-1.429-0.001-2.938-0.155-4.142,0.436 c5.065,4.68,15.128,2.853,20.742,2.904c11.342,0.104,22.689-0.081,34.035-0.081c9.067,0,20.104-2.412,29.014,0.643 c-4.061,4.239-12.383,3.389-17.056,4.292c-11.054,2.132-21.575,5.041-32.725,5.289c-5.591,0.124-11.278,1.001-16.824,2.088 c-4.515,0.885-9.461,0.823-13.881,2.301c2.302,3.186,7.315,2.59,10.13,2.694c15.753,0.588,31.413-0.231,47.097-2.172 c7.904-0.979,15.06,1.748,22.549,4.877c-12.278,4.992-25.996,4.737-38.58,5.989c-8.467,0.839-16.773,1.041-25.267,0.984 c-4.727-0.031-10.214-0.851-14.782,1.551c12.157,4.923,26.295,2.283,38.739,2.182c7.176-0.06,14.323,1.151,21.326,3.07 c-2.391,2.98-7.512,3.388-10.368,4.143c-8.208,2.165-16.487,3.686-24.71,5.709c-6.854,1.685-13.604,3.616-20.507,4.714 c-1.707,0.273-3.337,0.483-4.923,1.366c2.023,0.749,3.73,0.558,5.95,0.597c9.749,0.165,19.555,0.31,29.304-0.027 c15.334-0.528,30.422-4.721,45.782-4.653'],
			swirl : ['M49.346,46.341c-3.79-2.005,3.698-10.294,7.984-8.89 c8.713,2.852,4.352,20.922-4.901,20.269c-4.684-0.33-12.616-7.405-14.38-11.818c-2.375-5.938,7.208-11.688,11.624-13.837 c9.078-4.42,18.403-3.503,22.784,6.651c4.049,9.378,6.206,28.09-1.462,36.276c-7.091,7.567-24.673,2.277-32.357-1.079 c-11.474-5.01-24.54-19.124-21.738-32.758c3.958-19.263,28.856-28.248,46.044-23.244c20.693,6.025,22.012,36.268,16.246,52.826 c-5.267,15.118-17.03,26.26-33.603,21.938c-11.054-2.883-20.984-10.949-28.809-18.908C9.236,66.096,2.704,57.597,6.01,46.371 c3.059-10.385,12.719-20.155,20.892-26.604C40.809,8.788,58.615,1.851,75.058,12.031c9.289,5.749,16.787,16.361,18.284,27.262 c0.643,4.698,0.646,10.775-3.811,13.746'],
			diagonal : ['M16.053,91.059c0.435,0,0.739-0.256,0.914-0.768 c3.101-2.85,5.914-6.734,8.655-9.865C41.371,62.438,56.817,44.11,70.826,24.721c3.729-5.16,6.914-10.603,10.475-15.835 c0.389-0.572,0.785-1.131,1.377-1.521'],
			list : ['M1.986,8.91c41.704,4.081,83.952,5.822,125.737,2.867 c17.086-1.208,34.157-0.601,51.257-0.778c21.354-0.223,42.706-1.024,64.056-1.33c18.188-0.261,36.436,0.571,54.609,0.571','M3.954,25.923c9.888,0.045,19.725-0.905,29.602-1.432 c16.87-0.897,33.825-0.171,50.658-2.273c14.924-1.866,29.906-1.407,44.874-1.936c19.9-0.705,39.692-0.887,59.586,0.45 c35.896,2.407,71.665-1.062,107.539-1.188']
		},
		animDefs = {
			cross : { speed : .2, easing : 'ease-in-out' },
			fill : { speed : .8, easing : 'ease-in-out' },
			checkmark : { speed : .2, easing : 'ease-in-out' },
			circle : { speed : .2, easing : 'ease-in-out' },
			boxfill : { speed : .8, easing : 'ease-in' },
			swirl : { speed : .8, easing : 'ease-in' },
			diagonal : { speed : .2, easing : 'ease-in-out' },
			list : { speed : .3, easing : 'ease-in-out' }
		};

	function createSVGEl( def ) {
		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		if( def ) {
			svg.setAttributeNS( null, 'viewBox', def.viewBox );
			svg.setAttributeNS( null, 'preserveAspectRatio', def.preserveAspectRatio );
		}
		else {
			svg.setAttributeNS( null, 'viewBox', '0 0 100 100' );
		}
		svg.setAttribute( 'xmlns', 'http://www.w3.org/2000/svg' );
		return svg;
	}

	function controlCheckbox( el, type, svgDef ) {
		var svg = createSVGEl( svgDef );
		el.parentNode.appendChild( svg );
		
		el.addEventListener( 'change', function() {
			if( el.checked ) {
				draw( el, type );
			}
			else {
				reset( el );
			}
		} );
	}

	function controlRadiobox( el, type ) {
		var svg = createSVGEl();
		el.parentNode.appendChild( svg );
		el.addEventListener( 'change', function() {
			resetRadio( el );
			draw( el, type );
		} );
	}

	checkbxsCross.forEach( function( el, i ) { controlCheckbox( el, 'cross' ); } );
	radiobxsFill.forEach( function( el, i ) { controlRadiobox( el, 'fill' ); } );
	checkbxsCheckmark.forEach( function( el, i ) { controlCheckbox( el, 'checkmark' ); } );
	radiobxsCircle.forEach( function( el, i ) { controlRadiobox( el, 'circle' ); } );
	checkbxsBoxfill.forEach( function( el, i ) { controlCheckbox( el, 'boxfill' ); } );
	radiobxsSwirl.forEach( function( el, i ) { controlRadiobox( el, 'swirl' ); } );
	checkbxsDiagonal.forEach( function( el, i ) { controlCheckbox( el, 'diagonal' ); } );
	checkbxsList.forEach( function( el ) { controlCheckbox( el, 'list', { viewBox : '0 0 300 100', preserveAspectRatio : 'none' } ); } );

	function draw( el, type ) {
		var paths = [], pathDef, 
			animDef,
			svg = el.parentNode.querySelector( 'svg' );

		switch( type ) {
			case 'cross': pathDef = pathDefs.cross; animDef = animDefs.cross; break;
			case 'fill': pathDef = pathDefs.fill; animDef = animDefs.fill; break;
			case 'checkmark': pathDef = pathDefs.checkmark; animDef = animDefs.checkmark; break;
			case 'circle': pathDef = pathDefs.circle; animDef = animDefs.circle; break;
			case 'boxfill': pathDef = pathDefs.boxfill; animDef = animDefs.boxfill; break;
			case 'swirl': pathDef = pathDefs.swirl; animDef = animDefs.swirl; break;
			case 'diagonal': pathDef = pathDefs.diagonal; animDef = animDefs.diagonal; break;
			case 'list': pathDef = pathDefs.list; animDef = animDefs.list; break;
		};
		
		paths.push( document.createElementNS('http://www.w3.org/2000/svg', 'path' ) );

		if( type === 'cross' || type === 'list' ) {
			paths.push( document.createElementNS('http://www.w3.org/2000/svg', 'path' ) );
		}
		
		for( var i = 0, len = paths.length; i < len; ++i ) {
			var path = paths[i];
			svg.appendChild( path );

			path.setAttributeNS( null, 'd', pathDef[i] );

			var length = path.getTotalLength();
			// Clear any previous transition
			//path.style.transition = path.style.WebkitTransition = path.style.MozTransition = 'none';
			// Set up the starting positions
			path.style.strokeDasharray = length + ' ' + length;
			if( i === 0 ) {
				path.style.strokeDashoffset = Math.floor( length ) - 1;
			}
			else path.style.strokeDashoffset = length;
			// Trigger a layout so styles are calculated & the browser
			// picks up the starting position before animating
			path.getBoundingClientRect();
			// Define our transition
			path.style.transition = path.style.WebkitTransition = path.style.MozTransition  = 'stroke-dashoffset ' + animDef.speed + 's ' + animDef.easing + ' ' + i * animDef.speed + 's';
			// Go!
			path.style.strokeDashoffset = '0';
		}
	}

	function reset( el ) {
		Array.prototype.slice.call( el.parentNode.querySelectorAll( 'svg > path' ) ).forEach( function( el ) { el.parentNode.removeChild( el ); } );
	}

	function resetRadio( el ) {
		Array.prototype.slice.call( document.querySelectorAll( 'input[type="radio"][name="' + el.getAttribute( 'name' ) + '"]' ) ).forEach( function( el ) { 
			var path = el.parentNode.querySelector( 'svg > path' );
			if( path ) {
				path.parentNode.removeChild( path );
			}
		} );
	}

}
    return (
      <div className="fs-form-wrap" id="fs-form-wrap">
        <form id="myform" className="fs-form fs-form-full" autocomplete="off" onSubmit={this.handleSubmit.bind(this)}>
          <ol className="fs-fields">
            <li id="intro">
              Welcome. Thrive is an AI powered goal engine. Capitalizing cutting edge success psychology, we've created
              an intelligent platform based on decades of research in the behavioral, cognitive, linguistic sciences. The following
              is a brief overview to get a sense of what you hope to accomplish. We will familiarize you shortly with our patented 
              success tracks.
            </li>
            <li>
              <label className="fs-field-label fs-anim-upper" for="name">What's your name?</label>
              <input value={this.state.name} onChange={this.handleName.bind(this)} className="fs-anim-lower" id="name" name="name" type="text" placeholder="Dean Moriarty" required />
            </li>
            <li>
              <label className="fs-field-label fs-anim-upper" for="email" data-info="We won't send you spam, we promise...">What's your email address?</label>
              <input value={this.state.email} onChange={this.handleEmail.bind(this)} className="fs-anim-lower" id="email" name="email" type="email" placeholder="dean@road.us" required />
            </li>
            <li>
              <label className="fs-field-label fs-anim-upper" for="password" data-info="We won't send you spam, we promise...">Enter your password</label>
              <input value={this.state.password} onChange={this.handlePassword.bind(this)} className="fs-anim-lower" id="password" name="password" type="password" placeholder="dean@road.us" required />
            </li>
            <li data-input-trigger>
              <label className="fs-field-label fs-anim-upper" for="chooseTrack" data-info="A list of our patented success tracks">Please choose the most appropriate track for your goal:</label>
              <div className="fs-radio-group fs-radio-custom clearfix fs-anim-lower ac-custom">
                <span><input id="r1" name="r1" type="radio"/><label for="r1">Seamlessly visualize quality intellectual capital</label></span>
                <span><input id="fitnessTrack" name="fitnessTrack" type="radio" onClick={this.handleChosenTrack.bind(this)} value='fitnessTrack' /><label for="fitnessTrack" className="radio-conversion fitness">Fitness</label></span>
                <span><input id="financeTrack" name="financeTrack" type="radio" onClick={this.handleChosenTrack.bind(this)} value='financeTrack' /><label for="financeTrack" className="radio-social finance">Finance</label></span>
                <span><input id="skillTrack" name="skillTrack" type="radio" onClick={this.handleChosenTrack.bind(this)} value='skillTrack' /><label for="skillTrack" className="radio-mobile new-skill">New Skill</label></span>
              </div>
            </li>
            <li data-input-trigger>
              <label className="fs-field-label fs-anim-upper" for="q3" data-info="Our research shows digestible milestones for a larger goal yield a 30% higher rate of satisfaction">Select a success timeline you're comfortable with</label>
              <div className="fs-radio-group fs-radio-custom clearfix fs-anim-lower">
                <span><input id="q3b" name="q3" type="radio" onClick={this.handleMilestone.bind(this)} value='one month' /><label for="q3b" className="radio-conversion one">Month</label></span>
                <span><input id="q3c" name="q3" type="radio" onClick={this.handleMilestone.bind(this)} value='two months' /><label for="q3c" className="radio-social two">Months</label></span>
                <span><input id="q3a" name="q3" type="radio" onClick={this.handleMilestone.bind(this)} value='three months' /><label for="q3a" className="radio-mobile three">Months</label></span>
              </div>
            </li>
            <li>
              <label className="fs-field-label fs-anim-upper" for="goal" data-info="Aim high dear friend..">Describe your goal</label>
              <textarea value={this.state.goal} onChange={this.handleGoal.bind(this)} className="fs-anim-lower" id="goal" name="goal" placeholder="Describe your goal here"></textarea>
            </li>
            <li>
              <label className="fs-field-label fs-anim-upper" for="goal_intent">What will this goal help you achieve?</label>
              <textarea value={this.state.meta_goal_intent} onChange={this.handleIntentOfGoal.bind(this)} className="fs-anim-lower" id="anticipated_emotional_state" name="anticipated_emotional_state" placeholder="Describe here"></textarea>
            </li>

            <li data-input-trigger>
              <label className="fs-field-label fs-anim-upper" data-info="We'll make sure to use it all over">Select your commitment level</label>
              <div className="fs-radio-group fs-radio-custom clearfix fs-anim-lower">
                <span><input id="low" name="q3" type="radio" onClick={this.handleCommitmentLevel.bind(this)} value='low' /><label for="q3b" className="radio-conversion ">Minor</label></span>
                <span><input id="medium" name="q3" type="radio" onClick={this.handleCommitmentLevel.bind(this)} value='medium' /><label for="q3c" className="radio-social ">Moderate</label></span>
                <span><input id="high" name="q3" type="radio" onClick={this.handleCommitmentLevel.bind(this)} value='high' /><label for="q3a" className="radio-mobile ">Dedicated</label></span>
              </div>
            </li>

            <li data-input-trigger>
              <label className="fs-field-label fs-anim-upper" for="birth_order">Please enter your estimated amount of weekly free time:</label>
              <textarea value={this.state.freeTime} onChange={this.handleFreeTimeInput.bind(this)} className="fs-anim-lower" id="freeTime" name="freeTime" placeholder="Describe here"></textarea>
            </li>
            <li data-input-trigger>
              <label className="fs-field-label fs-anim-upper" for="salary">Please select Your level of education</label>
              <div className="fs-radio-group fs-radio-custom clearfix fs-anim-lower">
                <span><input id="highSchoolLevel" name="highSchoolLevel" type="radio" onClick={this.handleEducationLevel.bind(this)} value='high school' /><label for="highSchoolLevel" className="radio-conversion ">High School</label></span>
                <span><input id="collegeLevel" name="collegeLevel" type="radio" onClick={this.handleEducationLevel.bind(this)} value='college graduate' /><label for="collegeLevel" className="radio-conversion ">College Graduate</label></span>
                <span><input id="advancedLevel" name="advancedLevel" type="radio" onClick={this.handleEducationLevel.bind(this)} value='advanced degree' /><label for="advancedLevel" className="radio-conversion ">Advanced Degree</label></span>
              </div>
            </li>
            <li>
              <label className="fs-field-label fs-anim-upper" for="salary">Please Enter Your Salary Level</label>
              <div className="fs-radio-group fs-radio-custom clearfix fs-anim-lower">
                <textarea value={this.state.salary} onChange={this.handleSalaryInput.bind(this)} className="fs-anim-lower" id="salary" name="salary" placeholder="Roughly speaking"></textarea>
              </div>
            </li>
            <li>
              <label className="fs-field-label fs-anim-upper" for="occupation">Please enter your occupation</label>
              <div className="fs-radio-group fs-radio-custom clearfix fs-anim-lower">
                <textarea value={this.state.occupation} onChange={this.handleOccupationInput.bind(this)} className="fs-anim-lower" id="occupation" name="occupation" placeholder="Describe here"></textarea>
              </div>
            </li>
            <li>
              <label className="fs-field-label fs-anim-upper" for="number_of_siblings">How many siblings do you have?</label>
              <div className="fs-radio-group fs-radio-custom clearfix fs-anim-lower">
                <textarea value={this.state.number_of_siblings} onChange={this.handleSiblingsInput.bind(this)} className="fs-anim-lower" id="number_of_siblings" name="number_of_siblings" placeholder="Describe here"></textarea>
              </div>
            </li>
            <li>
              <label className="fs-field-label fs-anim-upper" for="birth_order">What is your place in your family's birth order?</label>
              <div className="fs-radio-group fs-radio-custom clearfix fs-anim-lower">
                <textarea value={this.state.birth_order} onChange={this.handleBirthOrderInput.bind(this)} className="fs-anim-lower" id="birth_order" name="birth_order" placeholder="Describe here"></textarea>
              </div>
            </li>
            <li data-input-trigger>
              <label className="fs-field-label fs-anim-upper" data-info="We'd like to stay out of your way by working behind the scenes">Please sync your calendar and social media platforms</label>
              <div className="fs-radio-group fs-radio-custom clearfix fs-anim-lower">
                <span><input id="facebookInput" name="facebookInput" type="radio" onClick={this.handleFacebookSync.bind(this)} /><label for="q3b" className="radio-conversion ">Facebook</label></span>
                <span><input id="calendarInput" name="calendarInput" type="radio" onClick={this.handleGoogleSync.bind(this)} /><label for="q3a" className="radio-mobile ">Google</label></span>
              </div>
            </li>
          </ol>
          <button className="fs-submit" type="submit">Send answers</button>
        </form>
      </div>
    )
  }
}