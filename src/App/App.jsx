import React, {Component, Fragment} from 'react';
import {NavLink, Route} from "react-router-dom";
import {Navbar, Nav, NavbarBrand, NavItem} from 'react-bootstrap';
import logo from "../resources/logo.png";
import Home from './Home/Home';
import Login from './Login';
import Register from './Register/Register';
import './app.css';


export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Navbar className={"bg-info app-navbar"}>
          <NavbarBrand><NavLink className={"nav-link"} to={"/"}>
            <img alt='' src={logo} width='30' height='30' className='d-inline-block'/>
            {' Mundo Acqua'}
          </NavLink></NavbarBrand>
          <Nav>
            <NavItem><NavLink className='nav-link' to="/">Inicio</NavLink></NavItem>
            <NavItem><NavLink className='nav-link' to="/login">Ingresar</NavLink></NavItem>
            <NavItem><NavLink className='nav-link' to="/register">Register</NavLink></NavItem>
          </Nav>
        </Navbar>
        {/*Component Home has all info components inside*/}
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
      </Fragment>
    );
  }
}