import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// Firebase

import _ from 'lodash';

import Header from './Header.js'
import Sidebar from './Partials/SideBar.js'
import AddGoal from './AddGoal.js'

//
// {this.props.userGoals.values().map(goal => <List>
// 	<ListItem/>
//
// 	<Divider/>
//
// </List>)}
export default class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            index: 0
        }
    }

    handleChange(event, index) {
        this.setState({index});
    }

    handleAddGoalSubmit(goal) {
        console.log(goal);
        // Firebase.database().ref('/users/' + this.props.user.clientID + '/goals/').push(goal);
        console.log("AddGoal Handling submitted to Firebase");
    }
    componentWillMount() {}
    componentDidMount() {
        // console.log(this.props.userGoals);
    }

    render() {

        return (
        <div className="wrapper">
            <div className="sidebar">
                <div className="logo">
                    <a href="http://www.creative-tim.com" className="simple-text">
                        Creative Tim
                    </a>
                </div>

                <div className="sidebar-wrapper">
                    <ul className="nav">
                        <li className="active">
                            <a href="dashboard.html">
                                <i className="material-icons">dashboard</i>
                                <p>Dashboard</p>
                            </a>
                        </li>
                        <li>
                            <a href="user.html">
                                <i className="material-icons">person</i>
                                <p>User Profile</p>
                            </a>
                        </li>
                        <li>
                            <a href="table.html">
                                <i className="material-icons">content_paste</i>
                                <p>Table List</p>
                            </a>
                        </li>
                        <li>
                            <a href="typography.html">
                                <i className="material-icons">library_books</i>
                                <p>Typography</p>
                            </a>
                        </li>
                        <li>
                            <a href="icons.html">
                                <i className="material-icons">bubble_chart</i>
                                <p>Icons</p>
                            </a>
                        </li>
                        <li>
                            <a href="maps.html">
                                <i className="material-icons">location_on</i>
                                <p>Maps</p>
                            </a>
                        </li>
                        <li>
                            <a href="notifications.html">
                                <i className="material-icons text-gray">notifications</i>
                                <p>Notifications</p>
                            </a>
                        </li>
                        <li className="active-pro">
                            <a href="upgrade.html">
                                <i className="material-icons">unarchive</i>
                                <p>Upgrade to PRO</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

		<div className = "main-panel">
			<Header/>
			<div className = "content">
				<div className="container-fluid">
	            	<div className="row">
	                <div className="col-lg-3 col-md-6 col-sm-6">
	                    <div className="card card-stats">
	                        <div className="card-header" data-background-color="orange">
	                            <i className="material-icons">content_copy</i>
	                        </div>
	                        <div className="card-content">
	                            <p className="category">Used Space</p>
	                            <h3 className="title">49/50<small>GB</small>
	                            </h3>
	                        </div>
	                        <div className="card-footer">
	                            <div className="stats">
	                                <i className="material-icons text-danger">warning</i>
	                                <a href="#pablo">Get More Space...</a>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	                <div className="col-lg-3 col-md-6 col-sm-6">
	                    <div className="card card-stats">
	                        <div className="card-header" data-background-color="green">
	                            <i className="material-icons">store</i>
	                        </div>
	                        <div className="card-content">
	                            <p className="category">Revenue</p>
	                            <h3 className="title">$34,245</h3>
	                        </div>
	                        <div className="card-footer">
	                            <div className="stats">
	                                <i className="material-icons">date_range</i>
	                                Last 24 Hours
	                            </div>
	                        </div>
	                    </div>
	                </div>
	                <div className="col-lg-3 col-md-6 col-sm-6">
	                    <div className="card card-stats">
	                        <div className="card-header" data-background-color="red">
	                            <i className="material-icons">info_outline</i>
	                        </div>
	                        <div className="card-content">
	                            <p className="category">Fixed Issues</p>
	                            <h3 className="title">75</h3>
	                        </div>
	                        <div className="card-footer">
	                            <div className="stats">
	                                <i className="material-icons">local_offer</i>
	                                Tracked from Github
	                            </div>
	                        </div>
	                    </div>
	                </div>

	                <div className="col-lg-3 col-md-6 col-sm-6">
	                    <div className="card card-stats">
	                        <div className="card-header" data-background-color="blue">
	                            <i className="fa fa-twitter"></i>
	                        </div>
	                        <div className="card-content">
	                            <p className="category">Followers</p>
	                            <h3 className="title">+245</h3>
	                        </div>
	                        <div className="card-footer">
	                            <div className="stats">
	                                <i className="material-icons">update</i>
	                                Just Updated
	                            </div>
	                        </div>
	                    </div>
	                </div>
	            </div>

	            	<div className="row">
	                <div className="col-md-4">
	                    <div className="card">
	                        <div className="card-header card-chart" data-background-color="green">
	                            <div className="ct-chart" id="dailySalesChart"></div>
	                        </div>
	                        <div className="card-content">
	                            <h4 className="title">Daily Sales</h4>
	                            <p className="category">
	                                <span className="text-success">
	                                    <i className="fa fa-long-arrow-up"></i>
	                                    55%
	                                </span>
	                                increase in today sales.</p>
	                        </div>
	                        <div className="card-footer">
	                            <div className="stats">
	                                <i className="material-icons">access_time</i>
	                                updated 4 minutes ago
	                            </div>
	                        </div>
	                    </div>
	                </div>

	                <div className="col-md-4">
	                    <div className="card">
	                        <div className="card-header card-chart" data-background-color="orange">
	                            <div className="ct-chart" id="emailsSubscriptionChart"></div>
	                        </div>
	                        <div className="card-content">
	                            <h4 className="title">Email Subscriptions</h4>
	                            <p className="category">Last Campaign Performance</p>
	                        </div>
	                        <div className="card-footer">
	                            <div className="stats">
	                                <i className="material-icons">access_time</i>
	                                campaign sent 2 days ago
	                            </div>
	                        </div>

	                    </div>
	                </div>

	                <div className="col-md-4">
	                    <div className="card">
	                        <div className="card-header card-chart" data-background-color="red">
	                            <div className="ct-chart" id="completedTasksChart"></div>
	                        </div>
	                        <div className="card-content">
	                            <h4 className="title">Completed Tasks</h4>
	                            <p className="category">Last Campaign Performance</p>
	                        </div>
	                        <div className="card-footer">
	                            <div className="stats">
	                                <i className="material-icons">access_time</i>
	                                campaign sent 2 days ago
	                            </div>
	                        </div>
	                    </div>
	                </div>
	            </div>

	            	<div className="row">
	                <div className="col-lg-6 col-md-12">
	                    <div className="card card-nav-tabs">
	                        <div className="card-header" data-background-color="purple">
	                            <div className="nav-tabs-navigation">
	                                <div className="nav-tabs-wrapper">
	                                    <span className="nav-tabs-title">Tasks:</span>
	                                    <ul className="nav nav-tabs" data-tabs="tabs">
	                                        <li className="active">
	                                            <a href="#profile" data-toggle="tab">
	                                                <i className="material-icons">bug_report</i>
	                                                Bugs
	                                                <div className="ripple-container"></div>
	                                            </a>
	                                        </li>
	                                        <li className="">
	                                            <a href="#messages" data-toggle="tab">
	                                                <i className="material-icons">code</i>
	                                                Website
	                                                <div className="ripple-container"></div>
	                                            </a>
	                                        </li>
	                                        <li className="">
	                                            <a href="#settings" data-toggle="tab">
	                                                <i className="material-icons">cloud</i>
	                                                Server
	                                                <div className="ripple-container"></div>
	                                            </a>
	                                        </li>
	                                    </ul>
	                                </div>
	                            </div>
	                        </div>

	                        <div className="card-content">
	                            <div className="tab-content">
	                                <div className="tab-pane active" id="profile">
	                                    <table className="table">
	                                        <tbody>
	                                            <tr>
	                                                <td>
	                                                    <div className="checkbox">
	                                                        <label>
	                                                            <input type="checkbox" name="optionsCheckboxes" checked/></label>
	                                                        </div>
	                                                    </td>
	                                                    <td>Sign contract for "What are conference organizers afraid of?"</td>
	                                                    <td className="td-actions text-right">
	                                                        <button type="button" rel="tooltip" title="Edit Task" className="btn btn-primary btn-simple btn-xs">
	                                                            <i className="material-icons">edit</i>
	                                                        </button>
	                                                        <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-simple btn-xs">
	                                                            <i className="material-icons">close</i>
	                                                        </button>
	                                                    </td>
	                                                </tr>
	                                                <tr>
	                                                    <td>
	                                                        <div className="checkbox">
	                                                            <label>
	                                                                <input type="checkbox" name="optionsCheckboxes"/></label>
	                                                            </div>
	                                                        </td>
	                                                        <td>Lines From Great Russian Literature? Or E-mails From My Boss?</td>
	                                                        <td className="td-actions text-right">
	                                                            <button type="button" rel="tooltip" title="Edit Task" className="btn btn-primary btn-simple btn-xs">
	                                                                <i className="material-icons">edit</i>
	                                                            </button>
	                                                            <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-simple btn-xs">
	                                                                <i className="material-icons">close</i>
	                                                            </button>
	                                                        </td>
	                                                    </tr>
	                                                    <tr>
	                                                        <td>
	                                                            <div className="checkbox">
	                                                                <label>
	                                                                    <input type="checkbox" name="optionsCheckboxes"/></label>
	                                                                </div>
	                                                            </td>
	                                                            <td>Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit
	                                                            </td>
	                                                            <td className="td-actions text-right">
	                                                                <button type="button" rel="tooltip" title="Edit Task" className="btn btn-primary btn-simple btn-xs">
	                                                                    <i className="material-icons">edit</i>
	                                                                </button>
	                                                                <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-simple btn-xs">
	                                                                    <i className="material-icons">close</i>
	                                                                </button>
	                                                            </td>
	                                                        </tr>
	                                                        <tr>
	                                                            <td>
	                                                                <div className="checkbox">
	                                                                    <label>
	                                                                        <input type="checkbox" name="optionsCheckboxes" checked/></label>
	                                                                    </div>
	                                                                </td>
	                                                                <td>Create 4 Invisible User Experiences you Never Knew About</td>
	                                                                <td className="td-actions text-right">
	                                                                    <button type="button" rel="tooltip" title="Edit Task" className="btn btn-primary btn-simple btn-xs">
	                                                                        <i className="material-icons">edit</i>
	                                                                    </button>
	                                                                    <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-simple btn-xs">
	                                                                        <i className="material-icons">close</i>
	                                                                    </button>
	                                                                </td>
	                                                            </tr>
	                                                        </tbody>
	                                                    </table>
	                                                </div>
	                                                <div className="tab-pane" id="messages">
	                                                    <table className="table">
	                                                        <tbody>
	                                                            <tr>
	                                                                <td>
	                                                                    <div className="checkbox">
	                                                                        <label>
	                                                                            <input type="checkbox" name="optionsCheckboxes" checked/></label>
	                                                                        </div>
	                                                                    </td>
	                                                                    <td>Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit
	                                                                    </td>
	                                                                    <td className="td-actions text-right">
	                                                                        <button type="button" rel="tooltip" title="Edit Task" className="btn btn-primary btn-simple btn-xs">
	                                                                            <i className="material-icons">edit</i>
	                                                                        </button>
	                                                                        <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-simple btn-xs">
	                                                                            <i className="material-icons">close</i>
	                                                                        </button>
	                                                                    </td>
	                                                                </tr>
	                                                                <tr>
	                                                                    <td>
	                                                                        <div className="checkbox">
	                                                                            <label>
	                                                                                <input type="checkbox" name="optionsCheckboxes"/></label>
	                                                                            </div>
	                                                                        </td>
	                                                                        <td>Sign contract for "What are conference organizers afraid of?"</td>
	                                                                        <td className="td-actions text-right">
	                                                                            <button type="button" rel="tooltip" title="Edit Task" className="btn btn-primary btn-simple btn-xs">
	                                                                                <i className="material-icons">edit</i>
	                                                                            </button>
	                                                                            <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-simple btn-xs">
	                                                                                <i className="material-icons">close</i>
	                                                                            </button>
	                                                                        </td>
	                                                                    </tr>
	                                                                </tbody>
	                                                            </table>
	                                                        </div>
	                                                        <div className="tab-pane" id="settings">
	                                                            <table className="table">
	                                                                <tbody>
	                                                                    <tr>
	                                                                        <td>
	                                                                            <div className="checkbox">
	                                                                                <label>
	                                                                                    <input type="checkbox" name="optionsCheckboxes"/></label>
	                                                                                </div>
	                                                                            </td>
	                                                                            <td>Lines From Great Russian Literature? Or E-mails From My Boss?</td>
	                                                                            <td className="td-actions text-right">
	                                                                                <button type="button" rel="tooltip" title="Edit Task" className="btn btn-primary btn-simple btn-xs">
	                                                                                    <i className="material-icons">edit</i>
	                                                                                </button>
	                                                                                <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-simple btn-xs">
	                                                                                    <i className="material-icons">close</i>
	                                                                                </button>
	                                                                            </td>
	                                                                        </tr>
	                                                                        <tr>
	                                                                            <td>
	                                                                                <div className="checkbox">
	                                                                                    <label>
	                                                                                        <input type="checkbox" name="optionsCheckboxes" checked/></label>
	                                                                                    </div>
	                                                                                </td>
	                                                                                <td>Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit
	                                                                                </td>
	                                                                                <td className="td-actions text-right">
	                                                                                    <button type="button" rel="tooltip" title="Edit Task" className="btn btn-primary btn-simple btn-xs">
	                                                                                        <i className="material-icons">edit</i>
	                                                                                    </button>
	                                                                                    <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-simple btn-xs">
	                                                                                        <i className="material-icons">close</i>
	                                                                                    </button>
	                                                                                </td>
	                                                                            </tr>
	                                                                            <tr>
	                                                                                <td>
	                                                                                    <div className="checkbox">
	                                                                                        <label>
	                                                                                            <input type="checkbox" name="optionsCheckboxes"/></label>
	                                                                                        </div>
	                                                                                    </td>
	                                                                                    <td>Sign contract for "What are conference organizers afraid of?"</td>
	                                                                                    <td className="td-actions text-right">
	                                                                                        <button type="button" rel="tooltip" title="Edit Task" className="btn btn-primary btn-simple btn-xs">
	                                                                                            <i className="material-icons">edit</i>
	                                                                                        </button>
	                                                                                        <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-simple btn-xs">
	                                                                                            <i className="material-icons">close</i>
	                                                                                        </button>
	                                                                                    </td>
	                                                                                </tr>
	                                                                            </tbody>
	                                                                        </table>
	                                                                    </div>
	                                                                </div>
	                                                            </div>
	                                                        </div>
	                                                    </div>

	                                                    <div className="col-lg-6 col-md-12">
	                                                        <div className="card">
	                                                            <div className="card-header" data-background-color="orange">
	                                                                <h4 className="title">Employees Stats</h4>
	                                                                <p className="category">New employees on 15th September, 2016</p>
	                                                            </div>
	                                                            <div className="card-content table-responsive">
	                                                                <table className="table table-hover">
	                                                                    <thead className="text-warning">
	                                                                        <th>ID</th>
	                                                                        <th>Name</th>
	                                                                        <th>Salary</th>
	                                                                        <th>Country</th>
	                                                                    </thead>
	                                                                    <tbody>
	                                                                        <tr>
	                                                                            <td>1</td>
	                                                                            <td>Dakota Rice</td>
	                                                                            <td>$36,738</td>
	                                                                            <td>Niger</td>
	                                                                        </tr>
	                                                                        <tr>
	                                                                            <td>2</td>
	                                                                            <td>Minerva Hooper</td>
	                                                                            <td>$23,789</td>
	                                                                            <td>Curaçao</td>
	                                                                        </tr>
	                                                                        <tr>
	                                                                            <td>3</td>
	                                                                            <td>Sage Rodriguez</td>
	                                                                            <td>$56,142</td>
	                                                                            <td>Netherlands</td>
	                                                                        </tr>
	                                                                        <tr>
	                                                                            <td>4</td>
	                                                                            <td>Philip Chaney</td>
	                                                                            <td>$38,735</td>
	                                                                            <td>Korea, South</td>
	                                                                        </tr>
	                                                                    </tbody>
	                                                                </table>
	                                                            </div>
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
