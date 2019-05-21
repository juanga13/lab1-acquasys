import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import NewStudent from './NewStudent';
import NewTeacher from './NewTeacher';
import NewClass from './NewLesson';
import OwnerNavbar from './OwnerNavbar';
import store from "../../../store";
import '../../../css/owner.css';
import {setTokenData} from "../../../actions";
import {Button} from "react-bootstrap";

class Owner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFirstTime: true,
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
  };

  renderFirstTimeRedirect = () => {
    if (this.state.isFirstTime) {
      this.setState({isFirstTime: false});
      return (<Redirect to="/my-account/new-teacher"/>);
    } else return null;
  }

  render() {
    return (
      <div className="owner-container">
        <h1>ESTAS LOGEADO COMO DUENO</h1>
        <Router>
          <OwnerNavbar/>
          {this.renderRoutes()}
          {this.renderFirstTimeRedirect()}
        </Router>
        <Button onClick={this.handleLogout}>Logout</Button>
      </div>
    );
  }

  handleLogout = (event) => {
    event.preventDefault();
    document.cookie = "token = ;";
    document.cookie = "role = ;";
    store.dispatch(setTokenData(null,null));
    window.location.href = "http://localhost:3000";
  }
}

const mapStateToProps = state => {return ({token: state.token})};

Owner = connect(mapStateToProps)(Owner);

export default Owner;