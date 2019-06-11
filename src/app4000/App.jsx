import React, { Component, Fragment } from 'react';
// import UserService from './UserService';
import {Route, Redirect} from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import AdminMenu from './admin/AdminMenu';
import TeacherMenu from './teacher/TeacherMenu';
import StudentMenu from './student/StudentMenu';

const roles = {
    admin: "ROLE_ADMIN",
    teacher: "ROLE_TEACHER",
    student: "ROLE_STUDENT",
    unverifiedStudent: "ROLE_UNREGISTERED"
};

class App extends Component {
    constructor(props) {
        super(props);

        // session login persists
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        let loggedIn = false;
        if (token && role) loggedIn = true;
        
        this.state = {
            // token and role
            token: token,
            role: role,
            loggedIn: loggedIn,  // Login changes this
        }
    };

    // called by Login
    handleLogin = () => {
        console.log('logged in, token: ' + localStorage.getItem('token') + ' and role: ' + localStorage.getItem('role'));
        this.setState({token: localStorage.getItem('token'), role: localStorage.getItem('role'), loggedIn: true});
    };

    // called by Navbar
    handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        this.setState({token: null, role: null, loggedIn: false});
    };

    // always called by this.render()
    renderLogin = () => {
        let result = null;
        console.log(this.state.role);
        if (this.state.role === null) return <Redirect to='/'/> 
        else if (this.state.role === roles.admin) result = <Route path='/account' render={() => <AdminMenu/>}/>
        else if (this.state.role === roles.student) result = <Route path='/account' render={() => <TeacherMenu/>}/>
        else if (this.state.role === roles.teacher) result = <Route path='/account' render={() => <StudentMenu/>}/>
        //TODO redirige a /account pero  PROVOCA LOOP INFINITO WTF
        // if (result !== null) result = (<div>{result}, <Redirect exact to='/account'/></div>)  
        return result;
    };

    render() {
        console.log("render");
        if (this.state.token && this.state.role) {  // check for null token/role
            // token and role exists -> logged in
            return (
                <Fragment>
                    <Navbar loggedIn onLogout={this.handleLogout}/>,
                    <div>
                        <Route exact path='/' render={() => <Home loggedIn/>}/>
                        {this.renderLogin()}
                    </div>

                </Fragment>
            )
        } else {
            // token and role null -> not logged in
            return (
                <Fragment>   
                    <Navbar/>,
                    <div>
                        <Route exact path='/' render={() => <Home/>}/>
                        <Route path='/login' render={() => (<Login onLogin={this.handleLogin}/>)}/>
                        <Route path='/register' render={() => <Register/>}/>
                    </div>
                </Fragment>
            )
        }
    };
}

export default App;