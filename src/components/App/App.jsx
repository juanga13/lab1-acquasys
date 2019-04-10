import React, {Component, Fragment} from 'react';
import {Route} from "react-router-dom";
import AppNavbar from './AppNavbar';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import './app.css';


export default class App extends Component {
  render() {
    return (
      <Fragment>
        <AppNavbar/>
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
      </Fragment>
    );
  }
}