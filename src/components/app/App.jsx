import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';

import Navbar from './Navbar';
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

class App extends Component {
  render() {
    return (
      <Fragment>
        <h1>App</h1>
        <Navbar/>
        <div>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
        </div>
      </Fragment>
    );
  }
}

export default App;