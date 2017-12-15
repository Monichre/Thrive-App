import React, { Component } from 'react';


export default class Sidebar extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="row">
                <div className="col m6">
                    <div id="SideBar">
                        <div className="st-menu st-effect-12" id="menu-12">
                            <ul id="dropdown1" className="dropdown-content">
                                <li><a href="#!">one</a></li>
                                <li><a href="#!">two</a></li>
                                <li className="divider"></li>
                                <li><a href="#!">three</a></li>
                            </ul>
                            <nav className="transparent">
                                <div className="nav-wrapper">
                                    <a href="#!" className="brand-logo"><img src="/img/thrive-logo.png" height="30px" width="30px" alt="" /> Thrive</a>
                                    <ul className="right">
                                        <li><a ><i className="material-icons right">people</i></a></li>
                                        <li><a ><i className="material-icons right">date_range</i></a></li>
                                        <li><a className="dropdown-button" href="#!" data-activates="dropdown1">Dropdown<i className="material-icons right">arrow_drop_down</i></a></li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                        <div className="st-pusher"></div>
                    </div>
                </div>
            </div>


        )
    }
}

