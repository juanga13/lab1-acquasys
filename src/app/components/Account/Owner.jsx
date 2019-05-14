import React, {Component} from 'react';

import {HashRouter as Router, Route} from 'react-router-dom';

import {Button, Row} from 'react-bootstrap';

import AddModal from './owner/AddModal';
import NewStudent from './owner/NewStudent';
import NewTeacher from './owner/NewTeacher';
import NewClass from './owner/NewClass';
import OwnerNavbar from './owner/OwnerNavbar';

import '../../css/account-owner.css';

class Owner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      modalType: "xd",
    };
  };

  handleModal = (event) => {
    event.preventDefault();
    const type = event.target.id;
    console.log(event.target.id);
    if (type === "addStudent") this.setState({isOpen: true, modalType: "student"});
    else if (type === "addTeacher") this.setState({isOpen: true, modalType: "teacher"});
    else if (type === "addClass") this.setState({isOpen: true, modalType: "class"});
    else console.log("error on handle modal");
  };

  handleCloseModal = event => {
    event.preventDefault();
    console.log("handle close modal");
    this.setState({isOpen: false});
  };1

  handleSearchChange = event => {
    event.preventDefault();
    // store.dispatch(setNewFilterToListX);
  };

  render() {
    console.log("[Owner] rendering, isOpen? " + this.state.isOpen);
    return (
      <div>
        <OwnerNavbar/>
        <div>
          <Route path="/new-student" component={NewStudent}/>
          <Route path="/new-class" component={NewClass}/>
          <Route path="/new-teacher" component={NewTeacher}/>
        </div>
      </div>
    );
  }
}

export default Owner;