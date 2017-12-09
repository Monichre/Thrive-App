import React, { Component } from 'react'
import '../../css/signup.css'
import Firebase from '../../firebase'
import classie from 'classie'


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
      social_platform_data: {
        accessToken: '',
        photo: ''
      }
    }

  }
  componentDidMount() {

    this.initCalendarSync()

    window.addEventListener('load', function () {
      const formWrap = document.getElementById('fs-form-wrap')

      new window.FForm(formWrap, {
        onReview: function () {
          classie.add(document.body, 'overview'); // for demo purposes only 
        }
      })
    }, false)

  }
  sendVerificationEmail() {
    let user = Firebase.auth().currentUser;

    user.sendEmailVerification().then(() => {
      console.log('email sent')
    }).catch((error) => {
      console.log(error)
    });
  }

  handleSubmit(e) {
    e.preventDefault()
    let _this = this
    Firebase.auth().setPersistence(Firebase.auth.Auth.Persistence.SESSION)
      .then(() => {

        return Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
          .catch((error, callback) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorCode, errorMessage)
          })
          .then((user) => {
            console.log(user)
            localStorage.setItem('user_id', JSON.stringify(user.uid))
            this.sendVerificationEmail()
            this.initializeNewUserGoals(user)
              .catch((error) => {
                console.log(error)
              })
              .then((response) => {
                console.log("child route created, redirecting url")
                _this.props.history.push('await-verification')
              })
          })
      })
      .catch((error) => {

        var errorCode = error.code;
        var errorMessage = error.message;
      })

  }
  initializeNewUserGoals(user) {

    var user = Firebase.auth().currentUser
    console.log(user)
    user.updateProfile({
      displayName: this.state.name,
    }).then((response) => {
      console.log(user)
    }, (error) => {
      console.log(error)
    })
    console.log(user)

    const new_user_key = Firebase.database().ref('users/' + user.uid).set({
      username: this.state.name,
      occupation: this.state.occupation,
      salary: this.state.salary,
      number_of_siblings: this.state.number_of_siblings,
      birth_order: this.state.birth_order
    })

    const new_goal_key = Firebase.database().ref('users/' + user.uid).child('goals').push().key
    const user_goal_info = {}
    const updates = {}
    user_goal_info.goal = this.state.goal
    user_goal_info.milestone = this.state.milestone
    user_goal_info.commitment_level = this.state.commitment_level
    user_goal_info.current_emotional_state = this.state.current_emotional_state
    user_goal_info.anticipated_emotional_state = this.state.anticipated_emotional_state

    return Firebase.database().ref('users/' + user.uid + '/goals/' + new_goal_key).set({
      goal: user_goal_info
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
  handleCurrentEmotionalState(e) {
    e.preventDefault()
    console.log(e.target.value)
    this.setState({ current_emotional_state: e.target.value })
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

    console.log(e.target.value)

    const provider = new Firebase.auth.FacebookAuthProvider()
    provider.addScope('public_profile, email')
    provider.setCustomParameters({
      'display': 'popup'
    })

    Firebase.auth().signInWithPopup(provider).then((result) => {

      console.log(result)
      const token = result.credential.acessToken

      const user = result.user
      console.log(user)

    }).catch((error) => {
      console.log(error)

      const errorCode = error.code
      const errorMessage = error.message
      const email = error.email
      const credential = error.credential

    })

  }
  handleInstagramSync(e) {
    e.preventDefault()
    console.log(e.target.value)
  }
  authorizeGoogleCalendar(credentials, callback) {
  }

getCalendar(auth) {

  const calendar = window.gapi.client.calendar

  calendar.events.list({
    auth: auth,
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
  }, (err, response) => {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var events = response.items;

    if (events.length == 0) {
      console.log('No upcoming events found.');
    } else {
      console.log('Upcoming 10 events:');
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var start = event.start.dateTime || event.start.date;
        console.log('%s - %s', start, event.summary);
      }
    }
  })
}
handleCalendarSync() {

  const calendar = window.syncCalendar()
  
  calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
  }, (err, response) => {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var events = response.items;

    if (events.length == 0) {
      console.log('No upcoming events found.');
    } else {
      console.log('Upcoming 10 events:');
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var start = event.start.dateTime || event.start.date;
        console.log('%s - %s', start, event.summary);
      }
    }
  })
}
initCalendarSync(){



  const CLIENT_ID = '869272160764-0fgctm8m6n1hv4aotq2ccrnauodj2g4q.apps.googleusercontent.com'
  const API_KEY = 'AIzaSyBa7AHgeeKObEk0AoNNi8E3AGE7HVIdo0g'
  const CLIENT_SECRET = 'HFwHOo6TNdepBJ31UeYRo7Fw'
  const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
  const SCOPES = "https://www.googleapis.com/auth/calendar"

  const credentials = {
    CLIENT_ID: CLIENT_ID,
    API_KEY: API_KEY,
    CLIENT_SECRET: CLIENT_SECRET,
    DISCOVERY_DOCS: DISCOVERY_DOCS,
    SCOPES: SCOPES
  }

  window.initCalendar(credentials)
  
}

render() {
    return (
      <div className="fs-form-wrap" id="fs-form-wrap">

        <form id="myform" className="fs-form fs-form-full" autocomplete="off" onSubmit={this.handleSubmit.bind(this)}>
          <ol className="fs-fields">
            <li id="intro">
              Welcome. Thrive is an AI powered goal engine. Capitalizing cutting edge success psychology, we've created
                              an intelligent platform based on decades of research in the behavioral, cognitive, linguistic sciences. The following
                              is a brief overview to get a sense of what you hope to accomplish. We will familiarize you shortly with our patented success tracks.
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
              <div className="fs-radio-group fs-radio-custom clearfix fs-anim-lower">
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
              <textarea value={this.state.anticipated_emotional_state} onChange={this.handleIntentOfGoal.bind(this)} className="fs-anim-lower" id="anticipated_emotional_state" name="anticipated_emotional_state" placeholder="Describe here"></textarea>
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
                <span><input id="facebookInput" name="facebookInput" type="radio" onClick={this.handleFacebookSync.bind(this)} value='low' /><label for="q3b" className="radio-conversion ">Facebook</label></span>
                <span><input id="InstagramInput" name="InstagramInput" type="radio" onClick={this.handleInstagramSync.bind(this)} value='medium' /><label for="q3c" className="radio-social ">Instagram</label></span>
                <span><input id="calendarInput" name="calendarInput" type="radio" onClick={this.handleCalendarSync.bind(this)} value='high' /><label for="q3a" className="radio-mobile ">Calendar</label></span>
              </div>
            </li>
          </ol>
          <button className="fs-submit" type="submit">Send answers</button>
        </form>
      </div>
    )
  }
}