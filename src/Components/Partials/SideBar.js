import React, {Component} from 'react';


class Sidebar extends Component {
    constructor(props) {
        super(props)
    }


    render() {

		var logoBg = "./img/thrive-logo.png"
		
        return (

			<div id="SideBar" className="">
                <header className="sidebar_header">
                    <h5>Filler Content</h5>
                </header>
                

                <section className="sidebar_section">
                    <h5>Filler Content</h5>
                </section>

                <section className="sidebar_section">
                    <h5>Filler Content</h5>
                </section>

                <section className="sidebar_section">
                    <h5>Filler Content</h5>
                </section>
               
                
            </div>

        );
    }
}
export default Sidebar;
