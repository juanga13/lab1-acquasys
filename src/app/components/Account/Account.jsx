import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import Owner from "./Owner";
import Teacher from "./Teacher";
import Student from "./Student";
import store from "../../store";
import UnverifiedStudent from "./UnverifiedStudent";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: getCookie("token"),
      role: getCookie("role")
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
    }
    return null;
  }
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export default Account;