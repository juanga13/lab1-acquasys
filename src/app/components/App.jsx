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
  constructor(props) {
    super(props);

    this.state = {
      loggedNavbar: false,
    };
  };

  updateNavbar = () => {
    console.log("update navbar");
    this.setState({loggedNavbar: true});
  };

  render() {
    // console.log("APP LOGGEDNAVBAR: " + this.state.loggedNavbar);
    return (
      <Fragment>
        <AppNavbar loggedNavbar={this.state.loggedNavbar}/>
        <div className='app-container'>
          <Route exact path='/' component={Home}/>
          <Route path='/login' render={(props) => <Login updateNavbar={this.updateNavbar}/>}/>
          <Route path='/register' component={Register}/>
          <Route path="/my-account" component={Account}/>
        </div>
        <Contact/>
      </Fragment>
    );
  };
}

export default App;