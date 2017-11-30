import React, { Component } from 'react'
import '../../css/signup.css'
import Firebase from '../../firebase'

import classie from 'classie'
import SelectFX from 'periodicjs.component.selectfx'
import FForm from 'periodicjs.component.fullscreen-form'
window.FForm = FForm

function classReg(className) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}




function hasParent(e, p) {
  if (!e) return false;
  var el = e.target || e.srcElement || e || false;
  while (el && el != p) {
    el = el.parentNode || false;
  }
  return (el !== false);
};


function extend(a, b) {
  for (var key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
}

function SelectFx(el, options) {
  this.el = el;
  this.options = extend({}, this.options);
  extend(this.options, options);
  this._init();
}


SelectFx.prototype.options = {
  // if true all the links will open in a new tab.
  // if we want to be redirected when we click an option, we need to define a data-link attr on the option of the native select element
  newTab: true,
  // when opening the select element, the default placeholder (if any) is shown
  stickyPlaceholder: true,
  // callback when changing the value
  onChange: function (val) {
    return false;
  }
}


SelectFx.prototype._init = function () {
  // check if we are using a placeholder for the native select box
  // we assume the placeholder is disabled and selected by default
  var selectedOpt = this.el.querySelector('option[selected]');
  this.hasDefaultPlaceholder = selectedOpt && selectedOpt.disabled;

  // get selected option (either the first option with attr selected or just the first option)
  this.selectedOpt = selectedOpt || this.el.querySelector('option');

  // create structure
  this._createSelectEl();

  // all options
  this.selOpts = [].slice.call(this.selEl.querySelectorAll('li[data-option]'));

  // total options
  this.selOptsCount = this.selOpts.length;

  // current index
  this.current = this.selOpts.indexOf(this.selEl.querySelector('li.cs-selected')) || -1;

  // placeholder elem
  this.selPlaceholder = this.selEl.querySelector('span.cs-placeholder');

  // init events
  this._initEvents();
}


SelectFx.prototype._createSelectEl = function () {
  var self = this,
    options = '',
    createOptionHTML = function (el) {
      var optclass = '',
        classes = '',
        link = '';

      if (el.selectedOpt && !this.foundSelected && !this.hasDefaultPlaceholder) {
        classes += 'cs-selected ';
        this.foundSelected = true;
      }
      // extra classes
      if (el.getAttribute('data-class')) {
        classes += el.getAttribute('data-class');
      }
      // link options
      if (el.getAttribute('data-link')) {
        link = 'data-link=' + el.getAttribute('data-link');
      }

      if (classes !== '') {
        optclass = 'class="' + classes + '" ';
      }

      return '<li ' + optclass + link + ' data-option data-value="' + el.value + '"><span>' + el.textContent +
        '</span></li>';
    };

  [].slice.call(this.el.children).forEach(function (el) {
    if (el.disabled) {
      return;
    }

    var tag = el.tagName.toLowerCase();

    if (tag === 'option') {
      options += createOptionHTML(el);
    } else if (tag === 'optgroup') {
      options += '<li class="cs-optgroup"><span>' + el.label + '</span><ul>';
      [].slice.call(el.children).forEach(function (opt) {
        options += createOptionHTML(opt);
      })
      options += '</ul></li>';
    }
  });

  var opts_el = '<div class="cs-options"><ul>' + options + '</ul></div>';
  this.selEl = document.createElement('div');
  this.selEl.className = this.el.className;
  this.selEl.tabIndex = this.el.tabIndex;
  this.selEl.innerHTML = '<span class="cs-placeholder">' + this.selectedOpt.textContent + '</span>' + opts_el;
  this.el.parentNode.appendChild(this.selEl);
  this.selEl.appendChild(this.el);
}

/**
 * initialize the events
 */
SelectFx.prototype._initEvents = function () {
  var self = this;

  // open/close select
  this.selPlaceholder.addEventListener('click', function () {
    self._toggleSelect();
  });

  // clicking the options
  this.selOpts.forEach(function (opt, idx) {
    opt.addEventListener('click', function () {
      self.current = idx;
      self._changeOption();
      // close select elem
      self._toggleSelect();
    });
  });

  // close the select element if the target it´s not the select element or one of its descendants..
  document.addEventListener('click', function (ev) {
    var target = ev.target;
    if (self._isOpen() && target !== self.selEl && !hasParent(target, self.selEl)) {
      self._toggleSelect();
    }
  });

  // keyboard navigation events
  this.selEl.addEventListener('keydown', function (ev) {
    var keyCode = ev.keyCode || ev.which;

    switch (keyCode) {
      // up key
      case 38:
        ev.preventDefault();
        self._navigateOpts('prev');
        break;
      // down key
      case 40:
        ev.preventDefault();
        self._navigateOpts('next');
        break;
      // space key
      case 32:
        ev.preventDefault();
        if (self._isOpen() && typeof self.preSelCurrent != 'undefined' && self.preSelCurrent !== -1) {
          self._changeOption();
        }
        self._toggleSelect();
        break;
      // enter key
      case 13:
        ev.stopPropagation();
        ev.preventDefault();
        if (self._isOpen() && typeof self.preSelCurrent != 'undefined' && self.preSelCurrent !== -1) {
          self._changeOption();
          self._toggleSelect();
        }
        break;
      // esc key
      case 27:
        ev.preventDefault();
        if (self._isOpen()) {
          self._toggleSelect();
        }
        break;
    }
  });
}

/**
 * navigate with up/dpwn keys
 */
SelectFx.prototype._navigateOpts = function (dir) {
  if (!this._isOpen()) {
    this._toggleSelect();
  }

  var tmpcurrent = typeof this.preSelCurrent != 'undefined' && this.preSelCurrent !== -1 ? this.preSelCurrent :
    this.current;

  if (dir === 'prev' && tmpcurrent > 0 || dir === 'next' && tmpcurrent < this.selOptsCount - 1) {
    // save pre selected current - if we click on option, or press enter, or press space this is going to be the index of the current option
    this.preSelCurrent = dir === 'next' ? tmpcurrent + 1 : tmpcurrent - 1;
    // remove focus class if any..
    this._removeFocus();
    // add class focus - track which option we are navigating
    classie.add(this.selOpts[this.preSelCurrent], 'cs-focus');
  }
}

/**
 * open/close select
 * when opened show the default placeholder if any
 */
SelectFx.prototype._toggleSelect = function () {
  // remove focus class if any..
  this._removeFocus();

  if (this._isOpen()) {
    if (this.current !== -1) {
      // update placeholder text
      this.selPlaceholder.textContent = this.selOpts[this.current].textContent;
    }
    classie.remove(this.selEl, 'cs-active');
  } else {
    if (this.hasDefaultPlaceholder && this.options.stickyPlaceholder) {
      // everytime we open we wanna see the default placeholder text
      this.selPlaceholder.textContent = this.selectedOpt.textContent;
    }
    classie.add(this.selEl, 'cs-active');
  }
}

/**
 * change option - the new value is set
 */
SelectFx.prototype._changeOption = function () {
  // if pre selected current (if we navigate with the keyboard)...
  if (typeof this.preSelCurrent != 'undefined' && this.preSelCurrent !== -1) {
    this.current = this.preSelCurrent;
    this.preSelCurrent = -1;
  }

  // current option
  var opt = this.selOpts[this.current];

  // update current selected value
  this.selPlaceholder.textContent = opt.textContent;

  // change native select element´s value
  this.el.value = opt.getAttribute('data-value');

  // remove class cs-selected from old selected option and add it to current selected option
  var oldOpt = this.selEl.querySelector('li.cs-selected');
  if (oldOpt) {
    classie.remove(oldOpt, 'cs-selected');
  }
  classie.add(opt, 'cs-selected');

  // if there´s a link defined
  if (opt.getAttribute('data-link')) {
    // open in new tab?
    if (this.options.newTab) {
      window.open(opt.getAttribute('data-link'), '_blank');
    } else {
      window.location = opt.getAttribute('data-link');
    }
  }

  // callback
  this.options.onChange(this.el.value);
}

/**
 * returns true if select element is opened
 */
SelectFx.prototype._isOpen = function (opt) {
  return classie.has(this.selEl, 'cs-active');
}

/**
 * removes the focus class from the option
 */
SelectFx.prototype._removeFocus = function (opt) {
  var focusEl = this.selEl.querySelector('li.cs-focus')
  if (focusEl) {
    classie.remove(focusEl, 'cs-focus');
  }
}

/**
 * add to global namespace
 */
window.SelectFx = SelectFx;


/**
 * based on from https://github.com/inuyaksa/jquery.nicescroll/blob/master/jquery.nicescroll.js
 */
function hasParent(e, p) {
  if (!e) return false;
  var el = e.target || e.srcElement || e || false;
  while (el && el != p) {
    el = el.parentNode || false;
  }
  return (el !== false);
};

/**
 * extend obj function
 */
function extend(a, b) {
  for (var key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
}

/**
 * SelectFx function
 */
function SelectFx(el, options) {
  this.el = el;
  this.options = extend({}, this.options);
  extend(this.options, options);
  this._init();
}

/**
 * SelectFx options
 */
SelectFx.prototype.options = {
  // if true all the links will open in a new tab.
  // if we want to be redirected when we click an option, we need to define a data-link attr on the option of the native select element
  newTab: true,
  // when opening the select element, the default placeholder (if any) is shown
  stickyPlaceholder: true,
  // callback when changing the value
  onChange: function (val) {
    return false;
  }
}

/**
 * init function
 * initialize and cache some vars
 */
SelectFx.prototype._init = function () {
  // check if we are using a placeholder for the native select box
  // we assume the placeholder is disabled and selected by default
  var selectedOpt = this.el.querySelector('option[selected]');
  this.hasDefaultPlaceholder = selectedOpt && selectedOpt.disabled;

  // get selected option (either the first option with attr selected or just the first option)
  this.selectedOpt = selectedOpt || this.el.querySelector('option');

  // create structure
  this._createSelectEl();

  // all options
  this.selOpts = [].slice.call(this.selEl.querySelectorAll('li[data-option]'));

  // total options
  this.selOptsCount = this.selOpts.length;

  // current index
  this.current = this.selOpts.indexOf(this.selEl.querySelector('li.cs-selected')) || -1;

  // placeholder elem
  this.selPlaceholder = this.selEl.querySelector('span.cs-placeholder');

  // init events
  this._initEvents();
}

/**
 * creates the structure for the select element
 */
SelectFx.prototype._createSelectEl = function () {
  var self = this,
    options = '',
    createOptionHTML = function (el) {
      var optclass = '',
        classes = '',
        link = '';

      if (el.selectedOpt && !this.foundSelected && !this.hasDefaultPlaceholder) {
        classes += 'cs-selected ';
        this.foundSelected = true;
      }
      // extra classes
      if (el.getAttribute('data-class')) {
        classes += el.getAttribute('data-class');
      }
      // link options
      if (el.getAttribute('data-link')) {
        link = 'data-link=' + el.getAttribute('data-link');
      }

      if (classes !== '') {
        optclass = 'class="' + classes + '" ';
      }

      return '<li ' + optclass + link + ' data-option data-value="' + el.value + '"><span>' + el.textContent +
        '</span></li>';
    };

  [].slice.call(this.el.children).forEach(function (el) {
    if (el.disabled) {
      return;
    }

    var tag = el.tagName.toLowerCase();

    if (tag === 'option') {
      options += createOptionHTML(el);
    } else if (tag === 'optgroup') {
      options += '<li class="cs-optgroup"><span>' + el.label + '</span><ul>';
      [].slice.call(el.children).forEach(function (opt) {
        options += createOptionHTML(opt);
      })
      options += '</ul></li>';
    }
  });

  var opts_el = '<div class="cs-options"><ul>' + options + '</ul></div>';
  this.selEl = document.createElement('div');
  this.selEl.className = this.el.className;
  this.selEl.tabIndex = this.el.tabIndex;
  this.selEl.innerHTML = '<span class="cs-placeholder">' + this.selectedOpt.textContent + '</span>' + opts_el;
  this.el.parentNode.appendChild(this.selEl);
  this.selEl.appendChild(this.el);
}

/**
 * initialize the events
 */
SelectFx.prototype._initEvents = function () {
  var self = this;

  // open/close select
  this.selPlaceholder.addEventListener('click', function () {
    self._toggleSelect();
  });

  // clicking the options
  this.selOpts.forEach(function (opt, idx) {
    opt.addEventListener('click', function () {
      self.current = idx;
      self._changeOption();
      // close select elem
      self._toggleSelect();
    });
  });

  // close the select element if the target it´s not the select element or one of its descendants..
  document.addEventListener('click', function (ev) {
    var target = ev.target;
    if (self._isOpen() && target !== self.selEl && !hasParent(target, self.selEl)) {
      self._toggleSelect();
    }
  });

  // keyboard navigation events
  this.selEl.addEventListener('keydown', function (ev) {
    var keyCode = ev.keyCode || ev.which;

    switch (keyCode) {
      // up key
      case 38:
        ev.preventDefault();
        self._navigateOpts('prev');
        break;
      // down key
      case 40:
        ev.preventDefault();
        self._navigateOpts('next');
        break;
      // space key
      case 32:
        ev.preventDefault();
        if (self._isOpen() && typeof self.preSelCurrent != 'undefined' && self.preSelCurrent !== -1) {
          self._changeOption();
        }
        self._toggleSelect();
        break;
      // enter key
      case 13:
        ev.stopPropagation();
        ev.preventDefault();
        if (self._isOpen() && typeof self.preSelCurrent != 'undefined' && self.preSelCurrent !== -1) {
          self._changeOption();
          self._toggleSelect();
        }
        break;
      // esc key
      case 27:
        ev.preventDefault();
        if (self._isOpen()) {
          self._toggleSelect();
        }
        break;
    }
  });
}

/**
 * navigate with up/dpwn keys
 */
SelectFx.prototype._navigateOpts = function (dir) {
  if (!this._isOpen()) {
    this._toggleSelect();
  }

  var tmpcurrent = typeof this.preSelCurrent != 'undefined' && this.preSelCurrent !== -1 ? this.preSelCurrent :
    this.current;

  if (dir === 'prev' && tmpcurrent > 0 || dir === 'next' && tmpcurrent < this.selOptsCount - 1) {
    // save pre selected current - if we click on option, or press enter, or press space this is going to be the index of the current option
    this.preSelCurrent = dir === 'next' ? tmpcurrent + 1 : tmpcurrent - 1;
    // remove focus class if any..
    this._removeFocus();
    // add class focus - track which option we are navigating
    classie.add(this.selOpts[this.preSelCurrent], 'cs-focus');
  }
}

/**
 * open/close select
 * when opened show the default placeholder if any
 */
SelectFx.prototype._toggleSelect = function () {
  // remove focus class if any..
  this._removeFocus();

  if (this._isOpen()) {
    if (this.current !== -1) {
      // update placeholder text
      this.selPlaceholder.textContent = this.selOpts[this.current].textContent;
    }
    classie.remove(this.selEl, 'cs-active');
  } else {
    if (this.hasDefaultPlaceholder && this.options.stickyPlaceholder) {
      // everytime we open we wanna see the default placeholder text
      this.selPlaceholder.textContent = this.selectedOpt.textContent;
    }
    classie.add(this.selEl, 'cs-active');
  }
}

/**
 * change option - the new value is set
 */
SelectFx.prototype._changeOption = function () {
  // if pre selected current (if we navigate with the keyboard)...
  if (typeof this.preSelCurrent != 'undefined' && this.preSelCurrent !== -1) {
    this.current = this.preSelCurrent;
    this.preSelCurrent = -1;
  }

  // current option
  var opt = this.selOpts[this.current];

  // update current selected value
  this.selPlaceholder.textContent = opt.textContent;

  // change native select element´s value
  this.el.value = opt.getAttribute('data-value');

  // remove class cs-selected from old selected option and add it to current selected option
  var oldOpt = this.selEl.querySelector('li.cs-selected');
  if (oldOpt) {
    classie.remove(oldOpt, 'cs-selected');
  }
  classie.add(opt, 'cs-selected');

  // if there´s a link defined
  if (opt.getAttribute('data-link')) {
    // open in new tab?
    if (this.options.newTab) {
      window.open(opt.getAttribute('data-link'), '_blank');
    } else {
      window.location = opt.getAttribute('data-link');
    }
  }

  // callback
  this.options.onChange(this.el.value);
}

/**
 * returns true if select element is opened
 */
SelectFx.prototype._isOpen = function (opt) {
  return classie.has(this.selEl, 'cs-active');
}

/**
 * removes the focus class from the option
 */
SelectFx.prototype._removeFocus = function (opt) {
  var focusEl = this.selEl.querySelector('li.cs-focus')
  if (focusEl) {
    classie.remove(focusEl, 'cs-focus');
  }
}

window.SelectFx = SelectFx;


export default class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      password: '',
      goal: '',
      milestone: '',
      commitment_level: '',
      current_emotional_state: '',
      anticipated_emotional_state: '',
      occupation: '',
      salary: '',
      number_of_siblings: '',
      birth_order: ''
    }

  }
  componentDidMount() {
    window.addEventListener('load', function () {
      const formWrap = document.getElementById('fs-form-wrap');
      new window.FForm(formWrap, {
        onReview: function () {
          classie.add(document.body, 'overview'); // for demo purposes only 
        }
      });
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
    console.log(e.target)
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
  handleAnticipatedEmotionalState(e) {
    e.preventDefault()
    console.log(e.target.value)
    this.setState({ anticipated_emotional_state: e.target.value })
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
  render() {
    return (
      <div id="SignUp">
        <div className="signup_container">
          <div className="fs-title"><h1>You're about to Thrive</h1></div>
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
                <li>
                  <label className="fs-field-label fs-anim-upper" for="goal" data-info="Aim high dear friend..">Describe your goal</label>
                  <textarea value={this.state.goal} onChange={this.handleGoal.bind(this)} className="fs-anim-lower" id="goal" name="goal" placeholder="Describe your goal here"></textarea>
                </li>
                <li data-input-trigger>
                  <label className="fs-field-label fs-anim-upper" for="q3" data-info="Our research shows digestible milestones for a larger goal yield a 30% higher rate of satisfaction">Select a progress timeline you're comfortable with</label>
                  <div className="fs-radio-group fs-radio-custom clearfix fs-anim-lower">
                    <span><input id="q3b" name="q3" type="radio" onClick={this.handleMilestone.bind(this)} value='one month' /><label for="q3b" className="radio-conversion one">Month</label></span>
                    <span><input id="q3c" name="q3" type="radio" onClick={this.handleMilestone.bind(this)} value='two months' /><label for="q3c" className="radio-social two">Months</label></span>
                    <span><input id="q3a" name="q3" type="radio" onClick={this.handleMilestone.bind(this)} value='three months' /><label for="q3a" className="radio-mobile three">Months</label></span>
                  </div>
                </li>
                <li data-input-trigger>
                  <label className="fs-field-label fs-anim-upper" data-info="We'll make sure to use it all over">Select your commitment level</label>
                  <div className="fs-radio-group fs-radio-custom clearfix fs-anim-lower">
                    <span><input id="q3b" name="q3" type="radio" onClick={this.handleCommitmentLevel.bind(this)} value='low' /><label for="q3b" className="radio-conversion ">Meh</label></span>
                    <span><input id="q3c" name="q3" type="radio" onClick={this.handleCommitmentLevel.bind(this)} value='medium' /><label for="q3c" className="radio-social ">Kinda</label></span>
                    <span><input id="q3a" name="q3" type="radio" onClick={this.handleCommitmentLevel.bind(this)} value='high' /><label for="q3a" className="radio-mobile ">Fuck yea</label></span>
                  </div>
                </li>
                <li>
                  <label className="fs-field-label fs-anim-upper" for="current_emotional_state">Describe how you feel about your relationship to this goal currently</label>
                  <textarea value={this.state.current_emotional_state} onChange={this.handleCurrentEmotionalState.bind(this)} className="fs-anim-lower" id="current_emotional_state" name="current_emotional_state" placeholder="Describe here"></textarea>
                </li>
                <li>
                  <label className="fs-field-label fs-anim-upper" for="anticipated_emotional_state">What will this goal help you achieve?</label>
                  <textarea value={this.state.anticipated_emotional_state} onChange={this.handleAnticipatedEmotionalState.bind(this)} className="fs-anim-lower" id="anticipated_emotional_state" name="anticipated_emotional_state" placeholder="Describe here"></textarea>
                </li>
                <li>
                  <label className="fs-field-label fs-anim-upper" for="salary">Please Enter Your Salary Level</label>
                  <textarea value={this.state.salary} onChange={this.handleSalaryInput.bind(this)} className="fs-anim-lower" id="salary" name="salary" placeholder="Roughly speaking"></textarea>
                </li>
                <li>
                  <label className="fs-field-label fs-anim-upper" for="occupation">Please enter your occupation</label>
                  <textarea value={this.state.occupation} onChange={this.handleOccupationInput.bind(this)} className="fs-anim-lower" id="occupation" name="occupation" placeholder="Describe here"></textarea>
                </li>
                <li>
                  <label className="fs-field-label fs-anim-upper" for="number_of_siblings">How many siblings do you have?</label>
                  <textarea value={this.state.number_of_siblings} onChange={this.handleSiblingsInput.bind(this)} className="fs-anim-lower" id="number_of_siblings" name="number_of_siblings" placeholder="Describe here"></textarea>
                </li>
                <li>
                  <label className="fs-field-label fs-anim-upper" for="birth_order">What is your place in your family's birth order?</label>
                  <textarea value={this.state.birth_order} onChange={this.handleBirthOrderInput.bind(this)} className="fs-anim-lower" id="birth_order" name="birth_order" placeholder="Describe here"></textarea>
                </li>
              </ol>
              <button className="fs-submit" type="submit">Send answers</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}