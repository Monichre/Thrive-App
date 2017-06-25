import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Sidebar from './Partials/SideBar.js';
import AddGoal from './AddGoal.js';

import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Tabs, {Tab} from 'material-ui/Tabs';

// Icons
import ScheduleIcon from 'material-ui-icons/Schedule';
import DashboardIcon from 'material-ui-icons/Dashboard';
import ListIcon from 'material-ui-icons/List';
import GroupAddIcon from 'material-ui-icons/GroupAdd';
import SettingsIcon from 'material-ui-icons/Settings';
import PhoneIcon from 'material-ui-icons/Phone';
import FavoriteIcon from 'material-ui-icons/Favorite';
import PersonPinIcon from 'material-ui-icons/PersonPin';


class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            index: 0
        }
    }

    handleChange(event, index) {
        this.setState({index});
    }

    handleAddGoalSubmit() {

        console.log("AddGoal Handling Submit Initiated.");
    }

    render() {

        const IconTabs = <Paper>
                            <Tabs
                                index={this.state.index}
                                onChange={this.handleChange.bind(this)}
                                textColor="accent" fullWidth>
                                <Tab icon={<PhoneIcon />}/>
                                <Tab icon={<FavoriteIcon />}/>
                                <Tab icon={<PersonPinIcon />}/>
                            </Tabs>

                        </Paper>;
        var style = {
            marginTop: '100px'
        }

        return (
            <Grid style={style} container justify="center" gutter={24}>
                <Grid item xs={4}>
                    Side Bar
                </Grid>

                <Grid item xs={4}>
                    {IconTabs}
                    <AddGoal onGoalSubmit={this.handleAddGoalSubmit()}/>
                </Grid>
                <Grid item xs={4}>
                    Column 3
                </Grid>
            </Grid>
        );
    }
}
export default Dashboard;
