import React, { Component } from 'react';


export default class Sidebar extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div id="SideBar" className="">
                <div className="st-menu st-effect-12" id="menu-12">
                    <h2 className="icon icon-stack">Thrive</h2>
                    <ul className="collection">
                    <li className="collection-item avatar">
                      <img src="images/yuna.jpg" alt="" className="circle"/>
                      <span className="title">Title</span>
                      <p>First Line <br />
                         Second Line
                      </p>
                      <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
                    </li>
                    <li className="collection-item avatar">
                      <i className="material-icons circle">folder</i>
                      <span className="title">Title</span>
                      <p>First Line <br />
                         Second Line
                      </p>
                      <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
                    </li>
                    <li className="collection-item avatar">
                      <i className="material-icons circle green">insert_chart</i>
                      <span className="title">Title</span>
                      <p>First Line <br />
                         Second Line
                      </p>
                      <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
                    </li>
                    <li className="collection-item avatar">
                      <i className="material-icons circle red">play_arrow</i>
                      <span className="title">Title</span>
                      <p>First Line <br />
                         Second Line
                      </p>
                      <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
                    </li>
                  </ul>
                </div>
                <div className="st-pusher"></div>
            </div>

        )
    }
}

