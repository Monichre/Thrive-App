import React, { Component } from 'react'
import './tracks.css'

export default class FitnessTrack extends Component {
    constructor(props) {
        super(props)

        this.state = {
            type: 'fitness',
            goal: {
                fitness_goal_intent: '',
                fitness_goal_value: '',
                fitness_goal_timeFrame: '',
                fitness_goal_motivated_hours: '',
                fitness_goal_membership_location: '',
                fitness_goal_custom_location: ''
            }
        }
    }
  
    componentDidMount() {
        console.log(this.props)

        function NLForm(el) {
            this.el = el;
            this.overlay = document.querySelector('.nl-overlay');
            this.fields = [];
            this.fldOpen = -1;
            // this._init();
        }

        // NLForm.prototype = {
        //     _init : function() {
        //         var self = this;
        //         Array.prototype.slice.call( this.el.querySelectorAll( 'select' ) ).forEach( function( el, i ) {
        //             self.fldOpen++;
        //             self.fields.push( new NLField( self, el, 'dropdown', self.fldOpen ) );
        //         } );
        //         Array.prototype.slice.call( this.el.querySelectorAll( 'input' ) ).forEach( function( el, i ) {
        //             self.fldOpen++;
        //             self.fields.push( new NLField( self, el, 'input', self.fldOpen ) );
        //         } );
        //         this.overlay.addEventListener( 'click', function(ev) { self._closeFlds(); } );
        //         this.overlay.addEventListener( 'touchstart', function(ev) { self._closeFlds(); } );
        //     },
        //     _closeFlds : function() {
        //         if( this.fldOpen !== -1 ) {
        //             this.fields[ this.fldOpen ].close();
        //         }
        //     }
        // }

        function NLField(form, el, type, idx) {
            this.form = form;
            this.elOriginal = el;
            this.pos = idx;
            this.type = type;
            this._create();
            this._initEvents();
        }

        NLField.prototype = {
            _create: function () {
                if (this.type === 'dropdown') {
                    this._createDropDown();
                }
                else if (this.type === 'input') {
                    this._createInput();
                }
            },
            _createDropDown: function () {
                var self = this;
                this.fld = document.createElement('div');
                this.fld.className = 'nl-field nl-dd';
                this.toggle = document.createElement('a');
                this.toggle.innerHTML = this.elOriginal.options[this.elOriginal.selectedIndex].innerHTML;
                this.toggle.className = 'nl-field-toggle';
                this.optionsList = document.createElement('ul');
                var ihtml = '';
                Array.prototype.slice.call(this.elOriginal.querySelectorAll('option')).forEach(function (el, i) {
                    ihtml += self.elOriginal.selectedIndex === i ? '<li class="nl-dd-checked">' + el.innerHTML + '</li>' : '<li>' + el.innerHTML + '</li>';
                    // selected index value
                    if (self.elOriginal.selectedIndex === i) {
                        self.selectedIdx = i;
                    }
                });
                this.optionsList.innerHTML = ihtml;
                this.fld.appendChild(this.toggle);
                this.fld.appendChild(this.optionsList);
                this.elOriginal.parentNode.insertBefore(this.fld, this.elOriginal);
                this.elOriginal.style.display = 'none';
            },
            _createInput: function () {
                var self = this;
                this.fld = document.createElement('div');
                this.fld.className = 'nl-field nl-ti-text';
                this.toggle = document.createElement('a');
                this.toggle.innerHTML = this.elOriginal.getAttribute('placeholder');
                this.toggle.className = 'nl-field-toggle';
                this.optionsList = document.createElement('ul');
                this.getinput = document.createElement('input');
                this.getinput.setAttribute('type', 'text');
                this.getinput.setAttribute('placeholder', this.elOriginal.getAttribute('placeholder'));
                this.getinputWrapper = document.createElement('li');
                this.getinputWrapper.className = 'nl-ti-input';
                this.inputsubmit = document.createElement('button');
                this.inputsubmit.className = 'nl-field-go';
                this.inputsubmit.innerHTML = 'Go';
                this.getinputWrapper.appendChild(this.getinput);
                this.getinputWrapper.appendChild(this.inputsubmit);
                this.example = document.createElement('li');
                this.example.className = 'nl-ti-example';
                this.example.innerHTML = this.elOriginal.getAttribute('data-subline');
                this.optionsList.appendChild(this.getinputWrapper);
                this.optionsList.appendChild(this.example);
                this.fld.appendChild(this.toggle);
                this.fld.appendChild(this.optionsList);
                this.elOriginal.parentNode.insertBefore(this.fld, this.elOriginal);
                this.elOriginal.style.display = 'none';
            },
            _initEvents: function () {
                var self = this;
                this.toggle.addEventListener('click', function (ev) { ev.preventDefault(); ev.stopPropagation(); self._open(); });
                this.toggle.addEventListener('touchstart', function (ev) { ev.preventDefault(); ev.stopPropagation(); self._open(); });

                if (this.type === 'dropdown') {
                    var opts = Array.prototype.slice.call(this.optionsList.querySelectorAll('li'));
                    opts.forEach(function (el, i) {
                        el.addEventListener('click', function (ev) { ev.preventDefault(); self.close(el, opts.indexOf(el)); });
                        el.addEventListener('touchstart', function (ev) { ev.preventDefault(); self.close(el, opts.indexOf(el)); });
                    });
                }
                else if (this.type === 'input') {
                    this.getinput.addEventListener('keydown', function (ev) {
                        if (ev.keyCode == 13) {
                            self.close();
                        }
                    });
                    this.inputsubmit.addEventListener('click', function (ev) { ev.preventDefault(); self.close(); });
                    this.inputsubmit.addEventListener('touchstart', function (ev) { ev.preventDefault(); self.close(); });
                }

            },
            _open: function () {
                if (this.open) {
                    return false;
                }
                this.open = true;
                this.form.fldOpen = this.pos;
                var self = this;
                this.fld.className += ' nl-field-open';
            },
            close: function (opt, idx) {
                if (!this.open) {
                    return false;
                }
                this.open = false;
                this.form.fldOpen = -1;
                this.fld.className = this.fld.className.replace(/\b nl-field-open\b/, '');

                if (this.type === 'dropdown') {
                    if (opt) {
                        // remove class nl-dd-checked from previous option
                        var selectedopt = this.optionsList.children[this.selectedIdx];
                        selectedopt.className = '';
                        opt.className = 'nl-dd-checked';
                        this.toggle.innerHTML = opt.innerHTML;
                        // update selected index value
                        this.selectedIdx = idx;
                        // update original select element´s value
                        this.elOriginal.value = this.elOriginal.children[this.selectedIdx].value;
                    }
                }
                else if (this.type === 'input') {
                    this.getinput.blur();
                    this.toggle.innerHTML = this.getinput.value.trim() !== '' ? this.getinput.value : this.getinput.getAttribute('placeholder');
                    this.elOriginal.value = this.getinput.value;
                }
            }
        }
        const nlform = new NLForm(document.getElementById('nl-form'))

        nlform.prototype = {
            _init: function () {
                var self = this;
                Array.prototype.slice.call(this.el.querySelectorAll('select')).forEach(function (el, i) {
                    self.fldOpen++;
                    self.fields.push(new NLField(self, el, 'dropdown', self.fldOpen));
                });
                Array.prototype.slice.call(this.el.querySelectorAll('input')).forEach(function (el, i) {
                    self.fldOpen++;
                    self.fields.push(new NLField(self, el, 'input', self.fldOpen));
                });
                this.overlay.addEventListener('click', function (ev) { self._closeFlds(); });
                this.overlay.addEventListener('touchstart', function (ev) { self._closeFlds(); });
            },
            _closeFlds: function () {
                if (this.fldOpen !== -1) {
                    this.fields[this.fldOpen].close();
                }
            }
        }
    }

    submitTrack(e) {
        e.preventDefault()
        this.props.submitSuccessTrack(this.state)
    }

    handleFitnessGoalIntent(e) {
        e.preventDefault()
        console.log(e.target.value)

        this.setState({
            goal: {
                fitness_goal_intent: e.target.value
            }
        })

    }
    handleFitnessGoalValue(e) {
        e.preventDefault()
        console.log(e.target.value)

        this.setState({
            goal: {
                fitness_goal_value: e.target.value
            }
        })

    }
    handleFitnessGoalTimeFrame(e) {
        e.preventDefault()
        console.log(e.target.value)

        this.setState({
            goal: {
                fitness_goal_timeFrame: e.target.value
            }
        })

    }
    handleFitnessGoalMotivatedHours(e) {
        e.preventDefault()
        console.log(e.target.value)

        this.setState({
            goal: {
                fitness_goal_motivated_hours: e.target.value
            }
        })

    }
    handleFitnessGoalMembershipLocation(e) {
        e.preventDefault()
        console.log(e.target.value)

        this.setState({
            goal: {
                fitness_goal_membership_location: e.target.value
            }
        })

    }
    handleCustomFitnessLocation(e) {
        e.preventDefault()
        console.log(e.target.value)

        this.setState({
            goal: {
                fitness_goal_custom_location: e.target.value
            }
        })

    }
    render() {
        return (
            <div className="FitnessTrack" id="FitnessTrack">
                <div className="main clearfix">
                    <form id="nl-form" className="nl-form" onSubmit={this.submitTrack.bind(this)}>
                        I want to try to
                        <select value={this.state.fitness_goal_intent} onChange={this.handleFitnessGoalIntent.bind(this)} >
                            <option value="null" selected>do something healthy</option>
                            <option value="lose">lose</option>
                            <option value="gain">gain</option>
                            <option value="eat">eat</option>
                            <option value="train">train</option>
                            <option value="exercise">exercise</option>
                        </select>
                        <br />
                        <select value={this.state.fitness_goal_value} onChange={this.handleFitnessGoalValue.bind(this)}>
                            <option value="null" selected>...to what result?</option>
                            <option value="5 lbs">5 pounds</option>
                            <option value="10 lbs">10 pounds</option>
                            <option value="healthier">healthier</option>
                            <option value="harder">harder</option>
                            <option value="longer">longer</option>
                        </select>
                        in
                        <select value={this.state.fitness_goal_timeFrame} onChange={this.handleFitnessGoalTimeFrame.bind(this)}>
                            <option value="0" selected>...time frame?</option>
                            <option value="1 month">1 Month</option>
                            <option value="2 months">2 Months</option>
                            <option value="3 months">3 Months</option>
                            <option value="4 months">4 Months</option>
                            <option value="5 months">5 Months</option>
                            <option value="6 months">6 Months</option>
                            <option value="7 months">7 Months</option>
                            <option value="8 months">8 Months</option>
                            <option value="9 months">9 Months</option>
                            <option value="10 months">10 Months</option>
                            <option value="11 months">11 Months</option>
                            <option value="12 months">12 Months</option>
                        </select>
                        <br /> I feel most motivated
                        <select value={this.state.fitness_goal_motivated_hours} onChange={this.handleFitnessGoalMotivatedHours.bind(this)}>
                            <option value="null" selected>..in the morning?</option>
                            <option value="4pm">4 p.m.</option>
                            <option value="5pm">5 p.m.</option>
                            <option value="6pm">6 p.m.</option>
                            <option value="4pm">4 p.m.</option>
                            <option value="5pm">5 p.m.</option>
                            <option value="6pm">6 p.m.</option>
                            <option value="7pm">7 p.m.</option>
                            <option value="8pm">8 p.m.</option>
                            <option value="9pm">9 p.m.</option>
                        </select>
                        <br />
                        I have a membership
                        <select value={this.state.fitness_goal_membership_location} onChange={this.handleFitnessGoalMembershipLocation.bind(this)}>
                            <option value="1" selected>...here</option>
                            <option value="1">GeoLocation Sourced Gym</option>
                            <option value="2">GeoLocation Sourced Gym</option>
                            <option value="3">GeoLocation Sourced Gym</option>
                            <option value="false">GeoLocation Sourced Gym</option>
                        </select>
                        <br /> not listed?
                        <input type="text" value={this.state.fitness_goal_custom_location} placeholder="here" data-subline="For example: <em>Gym</em> or <em>Central Park</em>" onChange={this.handleCustomFitnessLocation.bind(this)} />
                        <div className="nl-submit-wrap">
                            <button className="nl-submit" type="submit">Submit Goal</button>
                        </div>
                        <div className="nl-overlay"></div>
                    </form>
                </div>
            </div>
        )
    }
}