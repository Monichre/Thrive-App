import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classie from 'classie'



import _ from 'lodash';
import Firebase from '../firebase.js'


import Header from './Header.js'
import SideBar from './Partials/SideBar.js'
import AddGoal from './AddGoal.js'
import Goals from './Partials/Goals'



import '../css/dashboard.css'

const ThriveBot = () => {


}
const annyang = require('annyang')
const SpeechKITT = require('speechkitt/src/speechkitt')

{/* <Goals goals={this.state.goals} />
<section id="thrive_bot_section">
    <div id="ThriveBot">

    </div>
    <button type="" className="btn btn-white btn-round btn-just-icon" id="chatBotButton"><i className="material-icons"><i className="material-icons">android</i></i><div className="ripple-container"></div></button>
</section> */}


function hasParentClass( e, classname ) {
    if(e === document) return false;
    if( classie.has( e, classname ) ) {
        return true;
    }
    return e.parentNode && hasParentClass( e.parentNode, classname );
}

export default class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user_name: '',
            goals: [],
            occupation: '',
            birth_order: '',
            number_of_siblings: null
        }
    }

    handleChange(event, index) {
        this.setState({ index });
    }
    mobilecheck() {
            var check = false;
            (function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
            return check;
        }
    init() {
        
                var container = document.getElementById( 'st-container' ),
                    buttons = Array.prototype.slice.call( document.querySelectorAll( '#st-trigger-effects > .menu__trigger' ) ),
                    // event type (if mobile use touch events)
                    eventtype = this.mobilecheck() ? 'touchstart' : 'click',
                    resetMenu = function() {
                        classie.remove( container, 'st-menu-open' );
                    },
                    bodyClickFn = function(evt) {
                        if( !hasParentClass( evt.target, 'st-menu' ) ) {
                            resetMenu();
                            document.removeEventListener( eventtype, bodyClickFn );
                        }
                    };
        
                buttons.forEach( function( el, i ) {
                    var effect = el.getAttribute( 'data-effect' );
        
                    el.addEventListener( eventtype, function( ev ) {
                        ev.stopPropagation();
                        ev.preventDefault();
                        container.className = 'st-container'; // clear
                        classie.add( container, effect );
                        setTimeout( function() {
                            classie.add( container, 'st-menu-open' );
                        }, 25 );
                        document.addEventListener( eventtype, bodyClickFn );
                    });
                } );
        
            }

    handleAddGoalSubmit(goal) {
        console.log(goal);
        // Firebase.database().ref('/users/' + this.props.user.clientID + '/goals/').push(goal);
        console.log("AddGoal Handling submitted to Firebase");
    }
    componentDidMount() {
      this.init()
      
      if (annyang) {
        
          // Set annyang in debug mode
          annyang.debug();
        
          // Set annyang language 
          annyang.setLanguage('en-GB');
        
          // Add our commands to annyang
          annyang.addCommands({
            'hello': function() {
              alert('Hello world!');
            },
            'show directions': function() {
              alert('Show directions!');
            },
            'call restaurant': function() {
              alert('Call restaurant!');
            }
          });
        
        //   // Tell KITT to use annyang
        //   SpeechKITT.annyang();
        
        //   // Define a stylesheet for KITT to use
        //   SpeechKITT.setStylesheet('//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/themes/flat.css');
        
        //   // Add instructional texts
        //   SpeechKITT.setInstructionsText('Some commands to try…');
        //   SpeechKITT.setSampleCommands(['Show directions', 'Call restaurant']);
        
        //   // If user clicks start button, remember his choice for 1 minute
        //   SpeechKITT.rememberStatus(1);
        //   // Render KITT's interface
        //   SpeechKITT.vroom();
        }
    }
   
 
    componentWillMount() {

        const userId = JSON.parse(localStorage.getItem('user_id'))
        const _this = this
        if (userId) {

            Firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
                let data = snapshot.val()
                let current_goals = Object.values(data.goals).map(item => item.goal)
                console.log(current_goals)
                _this.setState({
                    user_name: data.username,
                    occupation: data.occupation,
                    goals: current_goals,
                    birth_order: data.birth_order,
                    number_of_siblings: data.number_of_siblings
                }, () => {
                    console.log(_this.state)
                })
            })
        }
        
       
        $(function() {

                //--------------------------------------------------------------------------
                //
                // Framework
                //
                //--------------------------------------------------------------------------

                var points = {
                    tr: [[0.83, 0], [0.83,0.01], [0.99,0.01], [0.99,0.17], [1,0.17], [1, 0]],
                    tl: [[0.01, 0.01], [0.17,0.01], [0.17,0], [0,0], [0,0.17], [0.01, 0.17]],
                    bl: [[0.01, 0.99], [0.01,0.83], [0,0.83], [0,1], [0.17,1], [0.17, 0.99]],
                    br: [[0.99, 0.99], [0.83,0.99], [0.83,1], [1,1], [1,0.83], [0.99, 0.83]],
                    cross: [
                    [0.67, 0.50],
                    [0.50, 0.50],
                    [0.50, 0.33],
                    [0.49, 0.33],
                    [0.49, 0.50],
                    [0.33, 0.50],
                    [0.33, 0.51],
                    [0.49, 0.51],
                    [0.49, 0.67],
                    [0.50, 0.67],
                    [0.50, 0.51],
                    [0.67, 0.51]
                    ]
                };

                var scalePoint = function (point, scale) {
                    return _.map(point, function (value) {
                    return value * scale;
                    });
                };

                var makeContext = function (size) {
                    size = parseFloat(size);
                    size = _.isNaN(size) ? 100 : size;
                    var context = {};
                    context.size = size;
                    context.points = _.reduce(points, function (scaledPoints, points, property) {
                    scaledPoints[property] = _.map(points, function (point) {
                        return scalePoint(point, size);
                    });
                    return scaledPoints;
                    }, {});
                    return context;
                };

                var faceMaker = function (position, next) {
                    return function (template, context, level) {
                    context = _.extend({}, context, {position: position});
                    var face = {};
                    face.next = function (level) {
                        return next(template, context, level);
                    };
                    face.render = function () {
                        context.bottom = context.size * level;
                        context.id = face.id();
                        return template(context);
                    };
                    face.id = function () {
                        return context.position + level;
                    };
                    return face;
                    };
                };

                var floor = faceMaker('floor', function (t, c, l) { return left(t, c, l) });
                var left = faceMaker('left', function (t, c, l) { return back(t, c, l) });
                var back = faceMaker('back', function (t, c, l) { return right(t, c, l) });
                var right = faceMaker('right', function (t, c, l) { return front(t, c, l) });
                var front = faceMaker('front', function (t, c, l) { return floor(t, c, l) });

                //--------------------------------------------------------------------------
                //
                // App
                //
                //--------------------------------------------------------------------------

                var tmpl = _.template($('#face').html()),
                    $tower = $('#tower'),
                    $cubes = $('#cubes'),
                    size = 200,
                    ctx = makeContext(size),
                    limit = 40,
                    count = 0,
                    level = 0,
                    levels = [[]],
                    face = floor(tmpl, ctx, 0),
                    maxLevels = 4;

                var moveTower = function () {
                    var distance = size / 5;
                    var css = 'translateY(' + (distance * count) + 'px)';
                    $tower.css('transform', css);
                };

                var cleanupOldLevels = function () {
                    if (levels.length > maxLevels) {
                    var first = levels.shift().join(',');
                    $(first).remove();
                    }
                };

                var updateLevels = function () {
                    var l = Math.floor(count / 5);
                    if (l !== level) {
                    level = l;
                    levels.push([]);
                    cleanupOldLevels();
                    }
                };

                var appendFace = function () {
                    $cubes.append(face.render());
                    levels[levels.length - 1].push('#' + face.id());
                    count ++;
                    updateLevels();
                    moveTower();
                    face = face.next(level);
                };

                $cubes.bind('webkitAnimationEnd animationend', function () {
                    appendFace();
                });

                appendFace();
                });

    
  
  
    }

    render() {
        const icon_style = {
            height: '20px',
            width: '20px'
        }
        const svg_style = {
            bottom: "<%= bottom %>px"
        }

        return (
            <div id="Dashboard">
                <div id="st-container" className="st-container">
                    <nav className="st-menu st-effect-1" id="menu-1">
                        <h2 className="icon icon-lab">Sidebar</h2>
                        <ul>
                            <li><a className="icon icon-data" href="#">Data Management</a></li>
                            <li><a className="icon icon-location" href="#">Location</a></li>
                            <li><a className="icon icon-study" href="#">Study</a></li>
                            <li><a className="icon icon-photo" href="#">Collections</a></li>
                            <li><a className="icon icon-wallet" href="#">Credits</a></li>
                        </ul>
                    </nav>
                    
                    <nav className="st-menu st-effect-2" id="menu-2">
                        <h2 className="icon icon-stack">Sidebar</h2>
                        <ul>
                            <li><a className="icon icon-data" href="#">Data Management</a></li>
                            <li><a className="icon icon-location" href="#">Location</a></li>
                            <li><a className="icon icon-study" href="#">Study</a></li>
                            <li><a className="icon icon-photo" href="#">Collections</a></li>
                            <li><a className="icon icon-wallet" href="#">Credits</a></li>
                        </ul>
                    </nav>

                    <nav className="st-menu st-effect-4" id="menu-4">
                        <h2 className="icon icon-lab">Sidebar</h2>
                        <ul>
                            <li><a className="icon icon-data" href="#">Data Management</a></li>
                            <li><a className="icon icon-location" href="#">Location</a></li>
                            <li><a className="icon icon-study" href="#">Study</a></li>
                            <li><a className="icon icon-photo" href="#">Collections</a></li>
                            <li><a className="icon icon-wallet" href="#">Credits</a></li>
                        </ul>
                    </nav>

                    <nav className="st-menu st-effect-5" id="menu-5">
                        <h2 className="icon icon-stack">Sidebar</h2>
                        <ul>
                            <li><a className="icon icon-data" href="#">Data Management</a></li>
                            <li><a className="icon icon-location" href="#">Location</a></li>
                            <li><a className="icon icon-study" href="#">Study</a></li>
                            <li><a className="icon icon-photo" href="#">Collections</a></li>
                            <li><a className="icon icon-wallet" href="#">Credits</a></li>
                        </ul>
                    </nav>
                    
                    <nav className="st-menu st-effect-9" id="menu-9">
                        <h2 className="icon icon-lab">Sidebar</h2>
                        <ul>
                            <li><a className="icon icon-data" href="#">Data Management</a></li>
                            <li><a className="icon icon-location" href="#">Location</a></li>
                            <li><a className="icon icon-study" href="#">Study</a></li>
                            <li><a className="icon icon-photo" href="#">Collections</a></li>
                            <li><a className="icon icon-wallet" href="#">Credits</a></li>
                        </ul>
                    </nav>
                    
                    <nav className="st-menu st-effect-10" id="menu-10">
                        <h2 className="icon icon-stack">Sidebar</h2>
                        <ul>
                            <li><a className="icon icon-data" href="#">Data Management</a></li>
                            <li><a className="icon icon-location" href="#">Location</a></li>
                            <li><a className="icon icon-study" href="#">Study</a></li>
                            <li><a className="icon icon-photo" href="#">Collections</a></li>
                            <li><a className="icon icon-wallet" href="#">Credits</a></li>
                        </ul>
                    </nav>
                    
                    <nav className="st-menu st-effect-11" id="menu-11">
                        <h2 className="icon icon-lab">Sidebar</h2>
                        <ul>
                            <li><a className="icon icon-data" href="#">Data Management</a></li>
                            <li><a className="icon icon-location" href="#">Location</a></li>
                            <li><a className="icon icon-study" href="#">Study</a></li>
                            <li><a className="icon icon-photo" href="#">Collections</a></li>
                            <li><a className="icon icon-wallet" href="#">Credits</a></li>
                        </ul>
                    </nav>

                    <nav className="st-menu st-effect-12" id="menu-12">
                        <h2 className="icon icon-stack">Sidebar</h2>
                        <ul>
                            <li><a className="icon icon-data" href="#">Data Management</a></li>
                            <li><a className="icon icon-location" href="#">Location</a></li>
                            <li><a className="icon icon-study" href="#">Study</a></li>
                            <li><a className="icon icon-photo" href="#">Collections</a></li>
                            <li><a className="icon icon-wallet" href="#">Credits</a></li>
                        </ul>
                    </nav>

                    <nav className="st-menu st-effect-13" id="menu-13">
                        <h2 className="icon icon-stack">Sidebar</h2>
                        <ul>
                            <li><a className="icon icon-data" href="#">Data Management</a></li>
                            <li><a className="icon icon-location" href="#">Location</a></li>
                            <li><a className="icon icon-study" href="#">Study</a></li>
                            <li><a className="icon icon-photo" href="#">Collections</a></li>
                            <li><a className="icon icon-wallet" href="#">Credits</a></li>
                        </ul>
                    </nav>
                    <div className="st-pusher">
                        <nav className="st-menu st-effect-3" id="menu-3">
                            <h2 className="icon icon-lab">Sidebar</h2>
                            <ul>
                                <li><a className="icon icon-data" href="#">Data Management</a></li>
                                <li><a className="icon icon-location" href="#">Location</a></li>
                                <li><a className="icon icon-study" href="#">Study</a></li>
                                <li><a className="icon icon-photo" href="#">Collections</a></li>
                                <li><a className="icon icon-wallet" href="#">Credits</a></li>
                            </ul>
                        </nav>

                        <nav className="st-menu st-effect-6" id="menu-6">
                            <h2 className="icon icon-stack">Sidebar</h2>
                            <ul>
                                <li><a className="icon icon-data" href="#">Data Management</a></li>
                                <li><a className="icon icon-location" href="#">Location</a></li>
                                <li><a className="icon icon-study" href="#">Study</a></li>
                                <li><a className="icon icon-photo" href="#">Collections</a></li>
                                <li><a className="icon icon-wallet" href="#">Credits</a></li>
                            </ul>
                        </nav>

                        <nav className="st-menu st-effect-7" id="menu-7">
                            <h2 className="icon icon-lab">Sidebar</h2>
                            <ul>
                                <li><a className="icon icon-data" href="#">Data Management</a></li>
                                <li><a className="icon icon-location" href="#">Location</a></li>
                                <li><a className="icon icon-study" href="#">Study</a></li>
                                <li><a className="icon icon-photo" href="#">Collections</a></li>
                                <li><a className="icon icon-wallet" href="#">Credits</a></li>
                            </ul>
                        </nav>

                        <nav className="st-menu st-effect-8" id="menu-8">
                            <h2 className="icon icon-stack">Sidebar</h2>
                            <ul>
                                <li><a className="icon icon-data" href="#">Data Management</a></li>
                                <li><a className="icon icon-location" href="#">Location</a></li>
                                <li><a className="icon icon-study" href="#">Study</a></li>
                                <li><a className="icon icon-photo" href="#">Collections</a></li>
                                <li><a className="icon icon-wallet" href="#">Credits</a></li>
                            </ul>
                        </nav>

                        <nav className="st-menu st-effect-14" id="menu-14">
                            <h2 className="icon icon-stack">Sidebar</h2>
                            <ul>
                                <li><a className="icon icon-data" href="#">Data Management</a></li>
                                <li><a className="icon icon-location" href="#">Location</a></li>
                                <li><a className="icon icon-study" href="#">Study</a></li>
                                <li><a className="icon icon-photo" href="#">Collections</a></li>
                                <li><a className="icon icon-wallet" href="#">Credits</a></li>
                            </ul>
                        </nav>
                        <div className="st-content">
                            <div className="st-content-inner">
                        
                                <div className="main clearfix">
                                    <div id="st-trigger-effects" className="dashboard__menu">
                                        <span className="menu__trigger" data-effect="st-effect-12"><img style={icon_style} src="/img/dashboard-f.svg" alt=""/></span>
                                    </div>

                                    <div id="viewport">
                                        <div id="tower">
                                            <div id="cubes"></div>
                                        </div>
                                    </div>
                                    <div id="face">
                                        <svg
                                            x="0px" y="0px"
                                            width="<%= size %>px"
                                            height="<%= size %>px"
                                            viewBox="0 0 <%= size %> <%= size %>"
                                            class="face <%= position %>"
                                            style="bottom: <%= bottom %>px;"
                                            id="<%= id %>">
                                            <g class="background">
                                                <rect width="<%= size %>" height="<%= size %>"/>
                                            </g>
                                            <g class="corners">
                                                <g>
                                                    <polygon points="<%= points.tr %>"/>
                                                    <polygon class="tl" points="<%= points.tl %>"/>
                                                    <polygon points="<%= points.bl %>"/>
                                                    <polygon points="<%= points.br %>"/>
                                                </g>
                                            </g>
                                            <g class="cross">
                                                <polygon points="<%= points.cross %>"/>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

             
            </div>

        )
    }
}
