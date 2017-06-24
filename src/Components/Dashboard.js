import React, {Component} from 'react';
import Sidebar from './Partials/Sidebar.js';
import AddGoal from './AddGoal.js';



class Dashboard extends Component {

    handleAddGoalSubmit(){
        console.log("AddGoal Handling Submit Initiated.");
    }
    render() {


        return (
            <Grid className="Dashboard" fluid={true}>
                <Row>
                    <Col xs={3}>
                        <Sidebar style={{ height: 100 + '%' }}/>
                    </Col>
                    <Col sm={6}>
                        <ul id="main-dash" className="center-block text-center nav nav-pills" role="tablist">
                            <li>
                                <a href="#dashboard" role="tab" data-toggle="tab">
                                    <i className="material-icons">dashboard</i>
                                    Goal Planning
                                </a>
                            </li>
                            <AddGoal onGoalSubmit={this.handleAddGoalSubmit.bind(this)}/>
                            <li className="active">
                                <a href="#schedule" role="tab" data-toggle="tab">
                                    <i className="material-icons">schedule</i>
                                    Schedule
                                </a>
                            </li>
                            <li>
                                <a href="#tasks" role="tab" data-toggle="tab">
                                    <i className="material-icons">list</i>
                                    Steps
                                </a>
                            </li>
                            <li>
                                <a href="#tasks" role="tab" data-toggle="tab">
                                    <i className="material-icons">group_add</i>
                                    Partner
                                </a>
                            </li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="material-icons">settings</i>
                                    <b className="caret"></b>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li className="dropdown-header">Manage</li>
                                    <li>
                                        <a href="#">Edit a goal</a>
                                    </li>
                                    <li>
                                        <a href="#">Add a Journal Entry</a>
                                    </li>
                                    <li>
                                        <a href="#">Complete a step</a>
                                    </li>
                                    <li className="divider"></li>
                                    <li>
                                        <a href="#">Sponsored Track</a>
                                    </li>
                                    <li className="divider"></li>
                                    <li>
                                        <a href="#">Squad Goals</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </Col>
                    <Col sm={3}>
                        <div className="card card-nav-tabs">
                            <div className="header header-info">
                                <div className="nav-tabs-navigation">
                                    <div className="nav-tabs-wrapper">
                                        <ul className="nav nav-tabs" data-tabs="tabs">
                                            <li className="active">
                                                <a href="#profile" data-toggle="tab">
                                                    <i className="material-icons">apps</i>
                                                    Social
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" data-toggle="tab"></a>
                                            </li>
                                            <li>
                                                <a href="#" data-toggle="tab">
                                                    <i className="material-icons">sms</i>
                                                    <i className="material-icons">plus_one</i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="content">
                                <div className="tab-content text-center">
                                    <div className="tab-pane active" id="profile">
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <i className="material-icons">group</i>
                                            </span>
                                            <div className="form-group is-empty"><input type="text" className="form-control" placeholder="With Material Icons"/>
                                                <span className="material-input"></span>
                                            </div>
                                        </div>
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <i className="material-icons">group</i>
                                            </span>
                                            <div className="form-group is-empty"><input type="text" className="form-control" placeholder="With Material Icons"/>
                                                <span className="material-input"></span>
                                            </div>
                                        </div>
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <i className="material-icons">group</i>
                                            </span>
                                            <div className="form-group is-empty"><input type="text" className="form-control" placeholder="With Material Icons"/>
                                                <span className="material-input"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane" id="messages">
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <i className="material-icons">group</i>
                                            </span>
                                            <div className="form-group is-empty"><input type="text" className="form-control" placeholder="With Material Icons"/>
                                                <span className="material-input"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane" id="settings">
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <i className="material-icons">group</i>
                                            </span>
                                            <div className="form-group is-empty"><input type="text" className="form-control" placeholder="With Material Icons"/>
                                                <span className="material-input"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
export default Dashboard;
