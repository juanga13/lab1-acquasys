import React, {Component} from 'react';

import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import NewStudent from './owner/NewStudent';
import NewTeacher from './owner/NewTeacher';
import NewClass from './owner/NewLesson';
import OwnerNavbar from './owner/OwnerNavbar';

import '../../css/owner.css';

class Owner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      modalType: ""
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
  };

  renderRoutes = () => {
    return (this.props.token !== "") 
      ? <div>
          <Route path="/my-account/new-student" component={NewStudent}/>
          <Route path="/my-account/new-teacher" component={NewTeacher}/>
          <Route path="/my-account/new-class" component={NewClass}/>
        </div>
      : <Redirect exact to="/login"/>
  }

  render() {
    return (
      <div className="owner-container">
        <h1>ESTAS LOGEADO COMO DUENO</h1>
        <Router>
          <OwnerNavbar/>
          {this.renderRoutes()}
        </Router>  
      </div>
    );
  }
}

const mapStateToProps = state => {return ({token: state.token})};

Owner = connect(mapStateToProps)(Owner);

export default Owner;