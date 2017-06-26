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

import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import FloatingActionButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';


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
                                <Tab icon={<DashboardIcon />}/>
                                <Tab icon={<ScheduleIcon />}/>
                                <Tab icon={<SettingsIcon />}/>
                            </Tabs>
                            <Card>
                               <CardActions>
                                  <AddGoal onGoalSubmit={this.handleAddGoalSubmit()}/>
                               </CardActions>
                             </Card>
                        </Paper>;
        var style = {
            marginTop: '100px'
        }

        return (

                <Grid container gutter={8} style={style}>
                    <Grid item xs={4}>
                        {IconTabs}
                    </Grid>
                    <Grid item xs={4}>
                        {IconTabs}
                    </Grid>
                    <Grid item xs={4}>
                        {IconTabs}
                    </Grid>
                </Grid>

        );
    }
}
export default Dashboard;
