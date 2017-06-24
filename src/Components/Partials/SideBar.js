import React, {Component} from 'react';






class Sidebar extends Component {
    constructor(props) {
        super(props)
    }


    render() {

        return (
            <div id="Sidebar">
                <Row>
                    <Col xs={12}>
                        <div className="card card-nav-tabs">
							<div className="header header-info">
								<div className="nav-tabs-navigation">
									<div className="nav-tabs-wrapper">
										<ul className="nav nav-tabs" data-tabs="tabs">
											<li className="active">
												<a href="#data-stats" data-toggle="tab">
													<i className="material-icons">poll</i>
												</a>
											</li>
                                            <li className="active">
												<a href="#data-all" data-toggle="tab">
													<i className="material-icons">apps</i>
												</a>
											</li>
                                            <li>
												<a href="#next-step" data-toggle="tab">
													<i className="material-icons">access_time</i>
												</a>
											</li>
                                            <li>
												<a href="#" data-toggle="tab">
													<i className="material-icons">plus_one</i>
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>

							<div className="content">
								<div className="tab-content text-center">
									<div className="tab-pane active" id="data-stats">
                                        <div className="progress progress-line-primary">
                	                    	<div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: '30%'}}>
                	                        <span className="sr-only">60% Complete</span>
                	                      </div>
                	                    </div>
                                        <div className="progress progress-line-info">
                	                    	<div className="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: "60%"}}>
                	                    		<span className="sr-only">60% Complete</span>
                	                    	</div>
                	                    </div>
									</div>
									<div className="tab-pane" id="data-all">
										<p> I think that’s a responsibility that I have, to push possibilities, to show people, this is the level that things could be at. I will be the leader of a company that ends up being worth billions of dollars, because I got the answers. I understand culture. I am the nucleus. I think that’s a responsibility that I have, to push possibilities, to show people, this is the level that things could be at.</p>
									</div>
									<div className="tab-pane" id="next-step">
										<p>I think that’s a responsibility that I have, to push possibilities, to show people, this is the level that things could be at. So when you get something that has the name Kanye West on it, it’s supposed to be pushing the furthest possibilities. I will be the leader of a company that ends up being worth billions of dollars, because I got the answers. I understand culture. I am the nucleus.</p>
									</div>
                                    <div className="tab-pane" id="next-step">
										<p>I think that’s a responsibility that I have, to push possibilities, to show people, this is the level that things could be at. So when you get something that has the name Kanye West on it, it’s supposed to be pushing the furthest possibilities. I will be the leader of a company that ends up being worth billions of dollars, because I got the answers. I understand culture. I am the nucleus.</p>
									</div>
								</div>
							</div>
						</div>
                    </Col>
                </Row>
            </div>


        );
    }
}
export default Sidebar;
