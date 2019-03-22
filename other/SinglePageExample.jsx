import React, { Component } from 'react';
import {HashRouter, NavLink, Route} from "react-router-dom";
// import Home from "./Home";
// import Something from "./Something";
// import Other from "./Other";

// Home, Something and Other are simple components with some text

class SinglePageExample extends Component {
		render() {
				return (
					<HashRouter>
						<div>
							<h1>Sidebar</h1>
							<p>this is a sidebar xd</p>
							<ul className="header">
								<li><NavLink exact to="/">Home</NavLink></li>
								<li><NavLink to="/something">Something</NavLink></li>
								<li><NavLink to="/other">Other</NavLink></li>
							</ul>
							<div>
								<Route exact path="/" component={Home}/>
								<Route path="/something" component={Something}/>
								<Route path="/other" component={Other}/>
							</div>
						</div>
					</HashRouter>
				);
		}
}

export default SinglePageExample;