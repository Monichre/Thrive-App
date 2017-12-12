import React, { Component } from 'react'
import classie from 'classie'
import SpeechInterface from '../ChatBot/SpeechInterface'
import ThriveBot from '../ChatBot/ThriveBot'
import Firebase from '../firebase.js'
import Header from './Header.js'
import SideBar from './Partials/SideBar.js'
import Particle from './Partials/Particle.js'
import '../css/dashboard.css'
import AppDispatcher from '../Dispatcher/Dispatcher'
import GoalSummaryModal from './Partials/GoalSummaryModal'


function hasParentClass(e, classname) {
    if (e === document) return false;
    if (classie.has(e, classname)) {
        return true;
    }
    return e.parentNode && hasParentClass(e.parentNode, classname);
}

export default class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            current_user: null,
            launchPersis: false,
            launchModal: false
        }
    }

    handleChange(event, index) {
        this.setState({ index });
    }
    mobilecheck() {
        var check = false;
        (function (a) { if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }
    init() {

        var container = document.getElementById('st-container'),
            buttons = Array.prototype.slice.call(document.querySelectorAll('#st-trigger-effects > .menu__trigger')),
            // event type (if mobile use touch events)
            eventtype = this.mobilecheck() ? 'touchstart' : 'click',
            resetMenu = function () {
                classie.remove(container, 'st-menu-open');
            },
            bodyClickFn = function (evt) {
                if (!hasParentClass(evt.target, 'st-menu')) {
                    resetMenu();
                    document.removeEventListener(eventtype, bodyClickFn);
                }
            };

        buttons.forEach(function (el, i) {
            var effect = el.getAttribute('data-effect');

            el.addEventListener(eventtype, function (ev) {
                ev.stopPropagation();
                ev.preventDefault();
                container.className = 'st-container'; // clear
                classie.add(container, effect);
                setTimeout(function () {
                    classie.add(container, 'st-menu-open');
                }, 25);
                document.addEventListener(eventtype, bodyClickFn);
            });
        });

    }

    handleAddGoalSubmit(goal) {
        console.log(goal);
        
    }
    componentWillMount() {

        const userId = JSON.parse(localStorage.getItem('user_id'))
        AppDispatcher.dispatch({
                    action: 'get-user-data',
                    user_id: userId
                })
        
    }
    componentWillReceiveProps(nextProps) {
        
        console.log(nextProps)
        const current_user = nextProps.data.current_user

        this.setState({
            current_user: current_user
        })
    }
    launchGoalSummary() {
        this.setState({
            launchModal: true
        })
    }
    renderUserGoals() {
        if (this.state.current_user) {
            return  this.props.data.current_user.goals.map((goal) => (
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">{goal.goal.user_goal_info.goal}</h3>
                            <p className="card-text">{goal.goal.user_goal_info.meta_goal_intent}</p>
                            <p className="card-text">{goal.goal.user_goal_info.free_time}</p>
                            <button className="btn btn-primary" onClick={this.launchGoalSummary.bind(this)}>View Progress</button>
                        </div>
                    </div>
                </div>
            ))
        }
    }
    componentDidMount() {
        this.init()  
    }
    launchPersisChat() {

    }
    shouldComponentUpdate() {
        return true
    }
    handlePersisSummons() {
        console.log(' Persis has been summoned')
        this.setState({
            launchPersis: true
        })    
    }
    handleCloseModal() {
        this.setState({launchModal: false})
    }
    
    render() {
        const icon_style = {
            height: '20px',
            width: '20px'
        }
       let all_data = this.state
       const launchPersis = this.state.launchPersis
        
        return (
            <div id="Dashboard">
                <GoalSummaryModal displayModal={this.state.launchModal} handleCloseModal={this.handleCloseModal.bind(this)}/>
                <div id="st-container" className="st-container">
                    <SideBar />
                        <div className="st-content">
                            
                            <div className="st-content-inner">
                                <div className="main clearfix">
                                    <div id="st-trigger-effects" className="dashboard__menu">
                                        <span className="menu__trigger" data-effect="st-effect-12"><img style={icon_style} src="/img/dashboard-f.svg" alt="" /></span>
                                    </div>
                                    <div className="goal__container container">
                                        <div className="row">
                                            {this.renderUserGoals()}
                                        </div>
                                    </div>

                                    <div className="speechInterface__container">
                                        <SpeechInterface summonPersis={this.handlePersisSummons.bind(this)}/>
                                    </div>
                                    <div className="chatbot__container">
                                        <ThriveBot data={this.props.data} launchPersis={launchPersis}/>
                                    </div>  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        )
    }
}
