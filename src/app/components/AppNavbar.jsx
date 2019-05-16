import React, {Component} from 'react';
import store from '../store';
import {NavLink} from "react-router-dom";
import {Nav, Navbar, NavbarBrand} from "react-bootstrap";
import logo from '../logo.png';
import '../css/app-navlink.css';
import {connect} from "react-redux";


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
      });
    });
  }

  renderNavItems = () => {
    if (this.state.token === null) return (
      <div className='app-link-container'>
        <NavLink className='nav-link app-link' activeClassName='navlink app-link-active' exact to='/'>Inicio</NavLink>
        <NavLink className='nav-link app-link' activeClassName='navlink app-link-active' to='/login'>Ingresar</NavLink>
        <NavLink className='nav-link app-link' activeClassName='navlink app-link-active'
                 to='/register'>Registrarse</NavLink>
      </div>
    );
    else return (
      <div className='app-link-container'>
        <NavLink className='nav-link app-link' activeClassName='navlink app-link-active' exact to='/'>Inicio</NavLink>
        <NavLink className='nav-link app-link' activeClassName='navlink app-link-active' to='/my-account/new-student'>Mi
          Cuenta</NavLink>
      </div>
    );
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

const mapStateToProps = state => {
  return ({
    token: state.token,
    role: state.role,
  })
};

AppNavbar = connect(mapStateToProps)(AppNavbar);

export default AppNavbar;

