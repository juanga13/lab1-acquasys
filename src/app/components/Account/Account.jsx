import React, {Component} from 'react';

import {Redirect} from "react-router";

import {connect} from "react-redux";

import Owner from "./Owner";
import Teacher from "./Teacher";
import Student from "./Student";
import UnverifiedStudent from './UnverifiedStudent';

class Account extends Component {
  render() {
    console.log("[Account] rendering");
    console.log(this.props);
    if (this.props.token === null) {
      console.log("xd");
      // return (<Redirect to='/login'/>);
      return (<h1>xd</h1>)
    }
    if (this.props.role === "ROLE_ADMIN") {
      return (<Owner/>);
    } else if (this.props.role === "ROLE_TEACHER") {
      return (<Teacher/>);
    } else if (this.props.role === "ROLE_STUDENT") {
      return (<Student/>);
  }}
  // return (<div>
  //   <h1>xd</h1>
  // </div>);
  // };
}

const mapStateToProps = state => {
  return ({
    token: state.token,
    role: state.role,
  })
};

Account = connect(mapStateToProps)(Account);

export default Account;