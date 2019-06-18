import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import {Navbar} from 'react-bootstrap';
import './css/navbar.css';

class AppNavbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: props.loggedIn,
        };
    };

    // handle user login/logout
    componentWillReceiveProps(nextProps) {
        (this.state.loggedIn !== nextProps.loggedIn) && this.setState({loggedIn: nextProps.loggedIn});
    }

    render() {
        if (this.state.loggedIn) { 
            return ( 
                <Navbar className='navbar-container'>
                    <NavLink className='nav-link navbar-link' activeClassName='nav-link navbar-link-active' exact to='/'>Home</NavLink>
                    <NavLink className='nav-link navbar-link' activeClassName='nav-link navbar-link-active' to='/account'>Mi cuenta</NavLink>
                    {/* '/logout' does not exists, invalid to='' prop */}
                    <NavLink className='nav-link navbar-link' activeClassName='nav-link navbar-link-active' to='/logout' onClick={this.props.onLogout}>Desloguear</NavLink>
                </Navbar>
            )
        } else {
            return (
                <Navbar className='navbar-container'>               
                    <NavLink className='nav-link navbar-link' activeClassName='nav-link navbar-link-active' exact to='/'>Home</NavLink>
                    <NavLink className='nav-link navbar-link' activeClassName='nav-link navbar-link-active' to='/login'>Login</NavLink>
                    <NavLink className='nav-link navbar-link' activeClassName='nav-link navbar-link-active' to='/register'>Register</NavLink>
                </Navbar>
            )
        }
    };
}

export default AppNavbar;