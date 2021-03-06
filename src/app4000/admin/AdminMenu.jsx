import React, {Component } from 'react'
import {Route, NavLink } from 'react-router-dom';
import Home from "./Home";
import Payments from './Payments';
import Students from "./Students";
import Teachers from "./Teachers";
import Lessons from "./Lessons";
import AdminService from '../network/AdminService';
import { Navbar } from 'react-bootstrap';
import '../css/admin.css';

class AdminMenu extends Component {
    state = {
        data: null,
        paymentAmount: null,
        payments: null,
        students: null, 
        teachers: null,
        lessons: null,
    };

    // gets students, teachers and lessons
    componentWillMount() {
        AdminService.getUserInfo().then(x => {this.setState({data: x})});
        this.getStudentList();
        this.getTeachersList();
        this.getLessonsList();
        this.getPaymentsData();
    };

    getStudentList = () =>  AdminService.getAllStudents().then( x  => {this.setState({students: x})});
    getTeachersList = () => AdminService.getTeachers().then( x     => {this.setState({teachers: x})});
    getLessonsList = () =>  AdminService.getLessons().then( x      => {this.setState({lessons:  x})});
    getPaymentsData = () => {
        AdminService.getPaymentAmount().then( x => {this.setState({paymentAmount: x.amount})});
        AdminService.getPayments().then( x      => {this.setState({payments:  x})});
    };

    render() {
        return (
            <div className='admin-container'>
                <Navbar className='admin-navbar-container'>
                    <NavLink className='nav-link admin-navbar-link' activeClassName='nav-link admin-navbar-link-active' to='/account/payment'>Pagos</NavLink>
                    <NavLink className='nav-link admin-navbar-link' activeClassName='nav-link admin-navbar-link-active' to='/account/students'>Alumnos</NavLink>
                    <NavLink className='nav-link admin-navbar-link' activeClassName='nav-link admin-navbar-link-active' to='/account/teachers'>Profesores</NavLink>
                    <NavLink className='nav-link admin-navbar-link' activeClassName='nav-link admin-navbar-link-active' to='/account/lessons'>Clases</NavLink>
                </Navbar>
                {/* (2) props given not complete */}
                <Route exact path='/account'
                       render={() => <Home name={this.state.data && this.state.data.name ? this.state.data.name : ""}
                                           surname={this.state.data && this.state.data.surname ? this.state.data.surname : ""}/>}/>
                <Route path='/account/payment'  render={() => (
                    <Payments
                        payments={this.state.payments} 
                        amount={this.state.paymentAmount}
                        updateList={this.getPaymentsData}
                    />)}
                />
                <Route path='/account/students' render={() => <Students students={this.state.students} updateList={this.getStudentList}/>}/>
                <Route path='/account/teachers' render={() => <Teachers teachers={this.state.teachers} updateList={this.getTeachersList}/>}/>
                <Route path='/account/lessons' render={() => <Lessons lessons={this.state.lessons} teachers={this.state.teachers} updateList={this.getLessonsList}/>}/>
            </div>
        )
    };

    componentDidMount() {
        this.setState({redirect: false});
    };
}

export default AdminMenu;
