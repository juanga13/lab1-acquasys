import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import Owner from "./Owner";
import Teacher from "./Teacher";
import Student from "./Student";

class Account extends Component {
  render() {
    if (this.props.token === null) {
      return (<Redirect to='/login'/>);
    }
    if (this.props.role === "ROLE_OWNER") {
      return (<Owner/>);
    } else if (this.props.role === "ROLE_TEACHER") {
      return (<Teacher/>);
    } else if (this.props.role === "ROLE_STUDENT") {
      return (<Student/>);
  }}
}

const mapStateToProps = state => {
  return ({
    token: state.token,
    role: state.role,
  })
};

Account = connect(mapStateToProps)(Account);

export default Account;