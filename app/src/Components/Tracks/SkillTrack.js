import React, {Component} from 'react'
import './tracks.css'

export default class SkillTrack extends Component {

    componentDidMount() {

        function NLForm( el ) {	
            this.el = el;
            this.overlay = document.querySelector( '.nl-overlay' );
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
        
        function NLField( form, el, type, idx ) {
            this.form = form;
            this.elOriginal = el;
            this.pos = idx;
            this.type = type;
            this._create();
            this._initEvents();
        }
        
        NLField.prototype = {
            _create : function() {
                if( this.type === 'dropdown' ) {
                    this._createDropDown();	
                }
                else if( this.type === 'input' ) {
                    this._createInput();	
                }
            },
            _createDropDown : function() {
                var self = this;
                this.fld = document.createElement( 'div' );
                this.fld.className = 'nl-field nl-dd';
                this.toggle = document.createElement( 'a' );
                this.toggle.innerHTML = this.elOriginal.options[ this.elOriginal.selectedIndex ].innerHTML;
                this.toggle.className = 'nl-field-toggle';
                this.optionsList = document.createElement( 'ul' );
                var ihtml = '';
                Array.prototype.slice.call( this.elOriginal.querySelectorAll( 'option' ) ).forEach( function( el, i ) {
                    ihtml += self.elOriginal.selectedIndex === i ? '<li class="nl-dd-checked">' + el.innerHTML + '</li>' : '<li>' + el.innerHTML + '</li>';
                    // selected index value
                    if( self.elOriginal.selectedIndex === i ) {
                        self.selectedIdx = i;
                    }
                } );
                this.optionsList.innerHTML = ihtml;
                this.fld.appendChild( this.toggle );
                this.fld.appendChild( this.optionsList );
                this.elOriginal.parentNode.insertBefore( this.fld, this.elOriginal );
                this.elOriginal.style.display = 'none';
            },
            _createInput : function() {
                var self = this;
                this.fld = document.createElement( 'div' );
                this.fld.className = 'nl-field nl-ti-text';
                this.toggle = document.createElement( 'a' );
                this.toggle.innerHTML = this.elOriginal.getAttribute( 'placeholder' );
                this.toggle.className = 'nl-field-toggle';
                this.optionsList = document.createElement( 'ul' );
                this.getinput = document.createElement( 'input' );
                this.getinput.setAttribute( 'type', 'text' );
                this.getinput.setAttribute( 'placeholder', this.elOriginal.getAttribute( 'placeholder' ) );
                this.getinputWrapper = document.createElement( 'li' );
                this.getinputWrapper.className = 'nl-ti-input';
                this.inputsubmit = document.createElement( 'button' );
                this.inputsubmit.className = 'nl-field-go';
                this.inputsubmit.innerHTML = 'Go';
                this.getinputWrapper.appendChild( this.getinput );
                this.getinputWrapper.appendChild( this.inputsubmit );
                this.example = document.createElement( 'li' );
                this.example.className = 'nl-ti-example';
                this.example.innerHTML = this.elOriginal.getAttribute( 'data-subline' );
                this.optionsList.appendChild( this.getinputWrapper );
                this.optionsList.appendChild( this.example );
                this.fld.appendChild( this.toggle );
                this.fld.appendChild( this.optionsList );
                this.elOriginal.parentNode.insertBefore( this.fld, this.elOriginal );
                this.elOriginal.style.display = 'none';
            },
            _initEvents : function() {
                var self = this;
                this.toggle.addEventListener( 'click', function( ev ) { ev.preventDefault(); ev.stopPropagation(); self._open(); } );
                this.toggle.addEventListener( 'touchstart', function( ev ) { ev.preventDefault(); ev.stopPropagation(); self._open(); } );
        
                if( this.type === 'dropdown' ) {
                    var opts = Array.prototype.slice.call( this.optionsList.querySelectorAll( 'li' ) );
                    opts.forEach( function( el, i ) {
                        el.addEventListener( 'click', function( ev ) { ev.preventDefault(); self.close( el, opts.indexOf( el ) ); } );
                        el.addEventListener( 'touchstart', function( ev ) { ev.preventDefault(); self.close( el, opts.indexOf( el ) ); } );
                    } );
                }
                else if( this.type === 'input' ) {
                    this.getinput.addEventListener( 'keydown', function( ev ) {
                        if ( ev.keyCode == 13 ) {
                            self.close();
                        }
                    } );
                    this.inputsubmit.addEventListener( 'click', function( ev ) { ev.preventDefault(); self.close(); } );
                    this.inputsubmit.addEventListener( 'touchstart', function( ev ) { ev.preventDefault(); self.close(); } );
                }
        
            },
            _open : function() {
                if( this.open ) {
                    return false;
                }
                this.open = true;
                this.form.fldOpen = this.pos;
                var self = this;
                this.fld.className += ' nl-field-open';
            },
            close : function( opt, idx ) {
                if( !this.open ) {
                    return false;
                }
                this.open = false;
                this.form.fldOpen = -1;
                this.fld.className = this.fld.className.replace(/\b nl-field-open\b/,'');
        
                if( this.type === 'dropdown' ) {
                    if( opt ) {
                        // remove class nl-dd-checked from previous option
                        var selectedopt = this.optionsList.children[ this.selectedIdx ];
                        selectedopt.className = '';
                        opt.className = 'nl-dd-checked';
                        this.toggle.innerHTML = opt.innerHTML;
                        // update selected index value
                        this.selectedIdx = idx;
                        // update original select element´s value
                        this.elOriginal.value = this.elOriginal.children[ this.selectedIdx ].value;
                    }
                }
                else if( this.type === 'input' ) {
                    this.getinput.blur();
                    this.toggle.innerHTML = this.getinput.value.trim() !== '' ? this.getinput.value : this.getinput.getAttribute( 'placeholder' );
                    this.elOriginal.value = this.getinput.value;
                }
            }
        }
        const nlform = new NLForm( document.getElementById( 'nl-form' ) )

        nlform.prototype = {
            _init : function() {
                var self = this;
                Array.prototype.slice.call( this.el.querySelectorAll( 'select' ) ).forEach( function( el, i ) {
                    self.fldOpen++;
                    self.fields.push( new NLField( self, el, 'dropdown', self.fldOpen ) );
                } );
                Array.prototype.slice.call( this.el.querySelectorAll( 'input' ) ).forEach( function( el, i ) {
                    self.fldOpen++;
                    self.fields.push( new NLField( self, el, 'input', self.fldOpen ) );
                } );
                this.overlay.addEventListener( 'click', function(ev) { self._closeFlds(); } );
                this.overlay.addEventListener( 'touchstart', function(ev) { self._closeFlds(); } );
            },
            _closeFlds : function() {
                if( this.fldOpen !== -1 ) {
                    this.fields[ this.fldOpen ].close();
                }
            }
        }
    }
    render() {
        return (
            <div className="FitnessTrack" id="FitnessTrack">
                <div className="main clearfix">
                    <form id="nl-form" className="nl-form">
                        I want to try to
                        <select>
                            <option value="1" selected>...better myself</option>
                            <option value="2">learn</option>
                            <option value="3">perform</option>
                            <option value="4">play</option>
                            <option value="5">get</option>
                            <option value="6">enter</option>
                        </select>
                        <br />
                        in 
                        <select>
                            <option value="0" selected>...time frame?</option>
                            <option value="1">1 Month</option>
                            <option value="2">2 Month</option>
                            <option value="3">3 Month</option>
                            <option value="4">4 Month</option>
                            <option value="5">5 Month</option>
                            <option value="6">6 Month</option>
                        </select>
                        
                        <select>
                            <option value="1" selected>...by?</option>
                            <option value="2">spanish</option>
                            <option value="3">piano</option>
                            <option value="4">to code</option>
                            <option value="2">another degree</option>
                            <option value="2">a competition</option>
                        </select>
                         
                        <br/> I feel most motivated
                        <select>
                            <option value="1" selected>..in the morning?</option>
                            <option value="1">7 p.m.</option>
                            <option value="2">8 p.m.</option>
                            <option value="3">9 p.m.</option>
                        </select>
                        <br />
                        I have a about 
                        <select>
                            <option value="1" selected>...this much free time?</option>
                            <option value="1">1 - 5 hours a week</option>
                            <option value="2">5 - 10 hours a week</option>
                            <option value="3">10 - 20 hours a week</option>
                        </select>
                        <br /> 
                        What's your current level of familiarity with the subject?
                        <input required type="text" value="" placeholder="here" data-subline="For example: <em>Gym</em> or <em>Central Park</em>"/>
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