import React, { Component, Fragment } from 'react'
import { Route, NavLink} from 'react-router-dom';
import Home from "./Home";
import Students from "./Students";
import Teachers from "./Teachers";
import Lessons from "./Lessons";
import UserService from '../UserService';

class AdminMenu extends Component {
    // gets students, teachers and lessons
    componentWillMount() {
        this.setState({data: UserService.getAdminData()});
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
                {/*TODO Each routed component should be stateless?*/}
                <Route exact path='/account' render={() => <Home/>}/>
                <Route path='/account/students' render={() => <Students/>}/>
                <Route path='/account/teachers' render={() => <Teachers/>}/>
                <Route path='/account/lessons' render={() => <Lessons/>}/>
            </Fragment>
        )
    };
}
export default AdminMenu;