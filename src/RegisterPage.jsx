import React, {Component} from 'react';
import {HashRouter, Navlink, Route} from 'react-route-dom';


export default class RegisterPage extends Component {
  handleSubmitUsername = () => {

  };

  render() {
    return (
      <div>
        <HashRouter>
          <div>
            <h1>Sidebar</h1>
            <p>this is a sidebar xd</p>
            <ul className="header">
              <li><NavLink exact to="/">this.getFirstPage</NavLink></li>
              <li><NavLink to="/something">this.getSecondPage</NavLink></li>
              <li><NavLink to="/other">this.getThirdPage</NavLink></li>
            </ul>
            <div>
              <Route exact path="/" component={Home}/>
              <Route path="/something" component={Something}/>
              <Route path="/other" component={Other}/>
            </div>
          </div>
        </HashRouter>
      </div>

    )
  };
}