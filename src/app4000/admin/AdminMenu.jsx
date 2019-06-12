import React, {Component, Fragment} from 'react'
import {Route, NavLink, Redirect} from 'react-router-dom';
import Home from "./Home";
import Students from "./Students";
import Teachers from "./Teachers";
import Lessons from "./Lessons";
import UserService from '../UserService';

class AdminMenu extends Component {
    state = {
        data: null,
        students: null,
        verified: null,
        unverified: null,
        teachers: null,
        lessons: null,
    };

    // gets students, teachers and lessons
    componentWillMount() {
        UserService.getUserInfo().then(x => {
            this.setState({data: x});
        });
        UserService.getAllStudents().then( x=>{
            this.setState({students: x});
        });
        UserService.getVerified().then( x=>{
            this.setState({verified: x});
        });
        UserService.getUnverified().then( x=>{
            this.setState({unverified: x});
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
                <Route exact path='/account'
                       render={() => <Home name={this.state.data && this.state.data.name ? this.state.data.name : ""}
                                           surname={this.state.data && this.state.data.surname ? this.state.data.surname : ""}/>}/>
                <Route path='/account/students' render={() => <Students students={this.state.students} verified={this.state.verified} unverified={this.state.unverified}/>}/>
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
