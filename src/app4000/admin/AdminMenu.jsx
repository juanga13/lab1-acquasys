import React, {Component, Fragment} from 'react'
import {Route, NavLink, Redirect} from 'react-router-dom';
import Home from "./Home";
import Students from "./Students";
import Teachers from "./Teachers";
import Lessons from "./Lessons";
import UserService from '../UserService';
import { Navbar } from 'react-bootstrap';
import '../css/admin.css';

class AdminMenu extends Component {
    state = {
        data: null,
        students: null,  // only name, surname, dni and id
        verified: null,  
        unverified: null,
        teachers: null,
        lessons: null,
    };

    // gets students, teachers and lessons
    componentWillMount() {
        UserService.getUserInfo().then(x    => {this.setState({data: x})});
        UserService.getVerified().then(x    => {this.setState({verified: x})});
        UserService.getUnverified().then(x  => {this.setState({unverified: x})});

        this.getStudentList();
        this.getTeachersList();
        this.getLessonsList();
    };

    getStudentList = () => {UserService.getAllStudents().then( x =>{ this.setState({students: x})})};
    getTeachersList = () => {};
    getLessonsList = () => {};

    render() {
        console.log("rendering admin");
        return (
            <Fragment className='admin-container'>
                <Navbar className='admin-navbar-container'>
                    <NavLink className='nav-link admin-navbar-link' activeClassName='nav-link admin-navbar-link-active' to='/account/students'>Alumnos</NavLink>
                    <NavLink className='nav-link admin-navbar-link' activeClassName='nav-link admin-navbar-link-active' to='/account/teachers'>Profesores</NavLink>
                    <NavLink className='nav-link admin-navbar-link' activeClassName='nav-link admin-navbar-link-active' to='/account/lessons'>Clases</NavLink>
                </Navbar>
                {/* (2) props given not complete */}
                <Route exact path='/account'
                       render={() => <Home name={this.state.data && this.state.data.name ? this.state.data.name : ""}
                                           surname={this.state.data && this.state.data.surname ? this.state.data.surname : ""}/>}/>
                <Route path='/account/students' render={() => <Students students={this.state.students} verified={this.state.verified} unverified={this.state.unverified} updateList={this.getStudentList}/>}/>
                <Route path='/account/teachers' render={() => <Teachers teachers={this.state.teachers}/>}/>
                <Route path='/account/lessons' render={() => <Lessons lessons={this.state.lessons}/>}/>
            </Fragment>
        )
    };

    componentDidMount() {
        this.setState({redirect: false});
    };
}

export default AdminMenu;
