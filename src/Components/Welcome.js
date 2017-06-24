import React, {Component} from 'react';

class Welcome extends Component {


    render(){

        var logoBg = "img/thrive-logo.png";
        var logoBgStyle = {
            background: "img/thrive-logo-bg.png"
        };
        // var width = {
        //     width: "60%"
        // };
        return (
            <div className="Welcome">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-sm-offset-3">
                            <h1 className="intro">GOALS. DELIVERED</h1>
                            <h5>Designed and constructed from decades of research in cognitive science, THRIVE delivers digestible, actionable roadmaps for
                            your goals.</h5>
                            <h3>Success Tailored</h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Welcome;
