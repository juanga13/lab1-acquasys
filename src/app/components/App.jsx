import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Contact from "./Contact";
import Account from "./Account";
import '../css/app.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <AppNavbar/>
        <div className='app-container'>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path="/my-account/new-student" component={Account}/>
        </div>
        <Contact/>
      </Fragment>
    );
  }
}

export default App;