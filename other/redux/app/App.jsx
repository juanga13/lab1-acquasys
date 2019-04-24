import React from 'react';
import {HashRouter as Router, Route, NavLink} from "react-router-dom";
import Home from "./Home";
import First from "./First";
import Lefo from "./Lefo";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h2>Hello World!</h2>
        <Router>
          <ul>
            <li><NavLink exact to='/'>Home</NavLink></li>
            <li><NavLink to='/first'>First</NavLink></li>
            <li><NavLink to='/lefo'>Lefo</NavLink></li>
          </ul>
          <div>
            <Route exact path='/' component={Home}/>
            <Route path='/first' component={First}/>
            <Route path='/lefo' component={Lefo}/>
          </div>
        </Router>
      </React.Fragment>
    )
  }
}

export default App;