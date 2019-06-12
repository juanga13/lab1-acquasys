import React, { Component, Fragment } from 'react'
import { Route, NavLink, Redirect} from 'react-router-dom';
import Home from "./Home";
import Students from "./Students";
import Teachers from "./Teachers";
import Lessons from "./Lessons";
import UserService from '../UserService';

class AdminMenu extends Component {
    state = {
        data: null,
        students: null,
        teachers: null,
        lessons: null,
    };
    // gets students, teachers and lessons
    componentWillMount() {
        console.log(UserService.getStudentData());
        this.setState({
            data: UserService.getAdminData(),
            students: UserService.getStudentData(),
            // teachers: UserService.getTeacherData(),
            // lessons: UserService.getLessonsData(),   
        });
    };

    render() {
        console.log("rendering admin");
        return (
            <Fragment>
                <div>
                    <NavLink to='/account/students'>Alumnos</NavLink>
                    <NavLink to='/account/teachers'>Profesores</NavLink>
                    <NavLink to='/account/lessons'>Clases</NavLink>
                </div>
                {/* (1) //TODO Each routed component should be stateless? */}
                {/* (2) props given not complete */}
                <Route exact path='/account' render={() => <Home name={this.state.data.name} surname={this.state.data.surname}/>}/>
                <Route path='/account/students' render={() => <Students students={this.state.students}/>}/>
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