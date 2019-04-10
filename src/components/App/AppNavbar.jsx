import React, {Component} from 'react';
import {Nav, Navbar, NavbarBrand, NavItem} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import logo from "../../logo.png";

export default class AppNavbar extends Component {
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
          <NavItem><NavLink className='nav-link app-link' to="/">Inicio</NavLink></NavItem>
          <NavItem><NavLink className='nav-link app-link' to="/login">Ingresar</NavLink></NavItem>
          <NavItem><NavLink className='nav-link app-link' to="/register#/1">Registrar</NavLink></NavItem>
        </Nav>
      </Navbar>
    );
  };
}