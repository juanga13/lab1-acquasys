import React, {Component} from 'react';
import store from './redux/store';
import { NavLink } from "react-router-dom";
import {Nav, Navbar, NavbarBrand, NavItem} from "react-bootstrap";
import logo from './logo.png';
import '../css/app-navlink.css';


class AppNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      role: null,
    };

    store.subscribe(() => {
      const newState = store.getState();
      this.setState({
        token: newState.token,
        role: newState.role,
      })
    });
  }

  renderNavItems = () => {
    if (this.state.token === null) {
      return (
        <div className='app-link-container'>
          <NavLink className='nav-link app-link' activeClassName='navlink app-link-active' exact to='/'>Inicio</NavLink>
          <NavLink className='nav-link app-link' activeClassName='navlink app-link-active' to='/login'>Ingresar</NavLink>
          <NavLink className='nav-link app-link' activeClassName='navlink app-link-active' to='/register'>Registrarse</NavLink>
        </div>
      );
    } else {
      return (
        <Nav>
          <NavItem><NavLink className='nav-link app-link' exact to='/'>Inicio</NavLink></NavItem>
          <NavItem><NavLink className='nav-link app-link' to='/my-account'>Mi Cuenta</NavLink></NavItem>
        </Nav>
      );
    }
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