import React, {Component} from 'react';
import {Redirect, Route} from "react-router";

import {BrowserRouter as Router} from "react-router-dom";
import {connect} from "react-redux";
import MyClasses from "./MyClasses";
import TeacherNavbar from "./TeacherNavbar";

class Teacher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFirstTime: true,
      isOpen: false,
      modalType: ""
    };
  };

  renderRoutes = () => {
    return (this.props.token !== "")
        ? <div>
          <Route path="/my-account/my-classes" component={MyClasses}/>
        </div>
        : <Redirect exact to="/login"/>
  };

  renderFirstTimeRedirect = () => {
    if (this.state.isFirstTime) {
      this.setState({isFirstTime: false});
      return (<Redirect to="/my-account/my-classes"/>);
    } else return null;
  }

  render() {
    return (
        <div className="teacher-container">
          <Router>
            <TeacherNavbar/>
            {this.renderRoutes()}
            {this.renderFirstTimeRedirect()}
          </Router>
        </div>
    );
  }
}

const mapStateToProps = state => {return ({token: state.token})};

Teacher = connect(mapStateToProps)(Teacher);

export default Teacher;
