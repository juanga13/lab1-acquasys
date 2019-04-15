import React, {Component, Fragment} from 'react';
import AppNavbar from './AppNavbar';
import './app.css';
import {Route} from "react-router";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Contact from "./Contact";


export default class App extends Component {
  constructor(props) {
    super(props);
    sessionStorage.setItem("token", "");
  };

  render() {
    return (
      <Fragment>
        <AppNavbar/>
        <div className='app-container'>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
        </div>
        <Contact/>
      </Fragment>
    );
  };
}