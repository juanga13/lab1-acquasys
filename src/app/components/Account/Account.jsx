import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import Owner from "./owner/Owner";
import Teacher from "./teacher/Teacher";
import Student from "./verified-student/Student";
import store from "../../store";
import UnverifiedStudent from "./unverified-student/UnverifiedStudent";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      role: localStorage.getItem("role")
    };
  }
  render() {
    if (this.state.token === null) {
      return (<Redirect to='/login'/>);
    }
    if (this.state.role === "ROLE_ADMIN") {
      return (<Owner/>);
    } else if (this.state.role === "ROLE_TEACHER") {
      return (<Teacher/>);
    } else if (this.state.role === "ROLE_STUDENT") {
      return (<Student/>);
    } else if (this.state.role === "ROLE_UNREGISTERED") {
      return (<UnverifiedStudent/>);
    } else return null
  }
}

export default Account;
