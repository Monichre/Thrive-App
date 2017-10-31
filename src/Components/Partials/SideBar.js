import React, { Component } from 'react';


export default class Sidebar extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div id="SideBar" className="">
                <nav className="st-menu st-effect-12" id="menu-12">
                    <h2 className="icon icon-stack">Thrive</h2>
                    <ul>
                        <li><a className="icon icon-data" href="#">Social</a></li>
                        <hr />
                        <li><a className="icon icon-location" href="#">Goal Tracking</a></li>
                        <hr />
                        <li><a className="icon icon-study" href="#">Upcoming Milestones</a></li>
                        <hr />
                        <li><a className="icon icon-photo" href="#">Your Pots</a></li>
                        <hr />
                        <li><a className="icon icon-wallet" href="#">Sign Out</a></li>
                    </ul>
                </nav>
                <div className="st-pusher"></div>
            </div>

        )
    }
}

