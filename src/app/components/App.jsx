import React, { Component, Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';

import store from '../_store';
import { connect } from 'react-redux';

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

    this.state = {token : ""};

    store.subscribe(() => {
      const newState = store.getState();
      this.setState({token: newState.token});
    });
  }

  render() {
    return (
      <Fragment>
        <AppNavbar/>
        <div className='app-container'>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          {/*my-account should be private route so you
          cant access by hitting the url*/}
          <PrivateRoute path='/my-account' component={Account}/>
        </div>
        <Contact/>
      </Fragment>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    this.state.token != ""
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

const mapStateToProps = state => {return ({token: state.token})};

AppNavbar = connect(mapStateToProps)(App);

export default App;