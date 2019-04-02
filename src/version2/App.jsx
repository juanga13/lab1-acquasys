import React, {Component, Fragment} from 'react';
import {NavLink, Redirect, Route} from "react-router-dom";
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
        <Navbar bg='info'
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  flowDirection: "row",
                  justifyContent: "space-between"
                }}>
          <NavbarBrand >
            <img alt='' src={logo} width='30' height='30' className='d-inline-block'/>
            {' Mundo Acqua'}
          </NavbarBrand>
          <Nav>
            <NavItem><NavLink className='nav-link' to="/">Inicio</NavLink></NavItem>
            <NavItem><NavLink className='nav-link' to="/login">Ingresar</NavLink></NavItem>
            <NavItem><NavLink className='nav-link' to="/register/1">Register</NavLink></NavItem>
          </Nav>
        </Navbar>
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/register/1' component={Register}/>
      </Fragment>
    );
  }
}