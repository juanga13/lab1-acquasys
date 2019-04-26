import React, {Component} from 'react';

import {Redirect} from "react-router";

import {connect} from "react-redux";

import Owner from "./Owner";
import Teacher from "./Teacher";
import Student from "./Student";
import UnverifiedStudent from './UnverifiedStudent';

class Account extends Component {
  render() {
    if (this.props.token === null) {
      return (<Redirect to='/login'/>)
    }
    if (this.props.role === 'owner') {
      return (<Owner/>);
    } else if (this.props.role === 'teacher') {
      return (<Teacher/>);
    } else if (this.props.role === 'student') {
      return (<Student/>);
    } else if (this.props.role === 'unverified-student') {
      return (<UnverifiedStudent/>)
    }
  }
}

const mapStateToProps = state => {
  return ({
    token: state.token,
    role: state.role,
    teacherList: status.teacherList,
    studentList: status.studentList,
    classesList: status.classesList,

  })
};

Account = connect(mapStateToProps)(Account);

export default Account;