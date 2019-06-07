import React, { Component, Fragment } from 'react'
import {NavLink} from 'react-router-dom';

class Navbar extends Component {
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
                <Fragment>
                    <NavLink exact to='/'>Home</NavLink>
                    <NavLink to='/account'>Mi cuenta</NavLink>
                    <NavLink exact to='/' onClick={this.props.onLogout}>Desloguear</NavLink>
                </Fragment>
            )
        } else {
            return (
                <Fragment>               
                    <NavLink exact to='/'>Home</NavLink>
                    <NavLink to='/login'>Login</NavLink>
                    <NavLink to='/register'>Register</NavLink>
                </Fragment>
            )
        }
    };
}

export default Navbar;