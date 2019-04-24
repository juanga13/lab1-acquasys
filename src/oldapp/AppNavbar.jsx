import React, {Component} from 'react';
import {Nav, Navbar, NavbarBrand, NavItem} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import logo from "../logo.png";

export default class AppNavbar extends Component {
  constructor(props) {
    super(props);
    // this.renderNavItems(false);
    this.state = {
      navItems: [this.renderNavItems(false)],
    };
    console.log(this.state);
  };

  componentWillReceiveProps(newProps) {
    console.log("component will recieve props");
    this.setState({navItems: this.renderNavItems(newProps.isLogged)});
  };

  renderNavItems = isLogged => {
    console.log("nani");
    let navItems = [];
    if (!isLogged) {
      navItems = [
        <NavItem><NavLink className='nav-link app-link' to="/">Inicio</NavLink></NavItem>,
        <NavItem><NavLink className='nav-link app-link' to="/login">Ingresar</NavLink></NavItem>,
        <NavItem><NavLink className='nav-link app-link' to="/register#/1">Registrar</NavLink></NavItem>];
    } else {
      navItems = [
        <NavItem><NavLink className='nav-link app-link' to="/">Inicio</NavLink></NavItem>,
        <NavItem><NavLink className='nav-link app-link' to="/my-account">Mi Cuenta</NavLink></NavItem>
      ];
    }
    return navItems;
  };

  render() {
    return (
      <Navbar className={"app-navbar"}>
        <Nav className={"mr-auto"}>
          <NavbarBrand><NavLink className={"nav-link"} to={"/"}>
            <img alt='' src={logo} width='50' height='50'/>
            {' Mundo Acqua'}
          </NavLink></NavbarBrand>
        </Nav>
        <Nav>
          {this.state.navItems}
        </Nav>
      </Navbar>
    );
  };
}