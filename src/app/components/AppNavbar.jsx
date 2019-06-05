import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { Nav, Navbar, NavbarBrand } from "react-bootstrap";
import logo from '../logo.png';
import '../css/app-navlink.css';


class AppNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logged : props.loggedNavbar,
      token: null,
      role: null,
    };
    // console.log("NAVBAR LOGGED PROPS: " + props.loggedNavbar);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.loggedNavbar !== this.state.logged) {
      this.setState({logged: newProps.loggedNavbar})
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = "http://localhost:3000";  //todo
  };

  renderNavItems = () => {
    return (!this.state.logged) 
      ? (<div className='app-link-container'>
        <NavLink className='nav-link app-link' activeClassName='navlink app-link-active' exact to='/'>Inicio</NavLink>
        <NavLink className='nav-link app-link' activeClassName='navlink app-link-active' to='/login'>Ingresar</NavLink>
        <NavLink className='nav-link app-link' activeClassName='navlink app-link-active' to='/register'>Registrarse</NavLink>
      </div>)
      : (<div className='app-link-container'>
        <NavLink className='nav-link app-link' activeClassName='navlink app-link-active' exact to='/'>Inicio</NavLink>
        <NavLink className='nav-link app-link' activeClassName='navlink app-link-active' to='/my-account/new-student'>Mi Cuenta</NavLink>
        <NavLink className='nav-link app-link' activeClassName='navlink app-link-active' onClick={this.handleLogout}>Desloguear</NavLink>
      </div>);
  };

  render() {
    return (
      <Navbar className='app-navbar'>
        <Nav className='mr-auto'>
          <NavbarBrand><NavLink className='nav-link' to='/'>
            <img alt='' src={logo}/>
            {' Mundo Acqua'}
          </NavLink></NavbarBrand>
        </Nav>
        {this.renderNavItems()}
      </Navbar>
    );
  }
}

export default AppNavbar;