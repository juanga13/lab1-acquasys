import React, {Component} from 'react';

import store from '../redux/store';
import {Redirect} from "react-router";
import Owner from "./Owner";
import Teacher from "./Teacher";
import Student from "./Student";

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      role: null,
    };

    store.subscribe(() => {
      const newState = store.getState();
      this.setState({
        token: newState.token,
        role: newState.role,
      })
    });
  }

  render() {
    if (this.state.token === null) {
      return (<Redirect to='/login'/>)
    }
    if (this.state.role === 'owner') {
      return (<Owner/>);
    } else if (this.state.role === 'teacher') {
      return (<Teacher/>);
    } else if (this.state.role === 'student') {
      return (<Student/>);
    } else {
      return (<h1>not role</h1>)
    }
  }
}

export default Account;