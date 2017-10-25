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
                        <li><a className="icon icon-data" href="#">Data Management</a></li>
                        <li><a className="icon icon-location" href="#">Location</a></li>
                        <li><a className="icon icon-study" href="#">Study</a></li>
                        <li><a className="icon icon-photo" href="#">Collections</a></li>
                        <li><a className="icon icon-wallet" href="#">Credits</a></li>
                    </ul>
                </nav>
                <div className="st-pusher"></div>
            </div>

        )
    }
}

