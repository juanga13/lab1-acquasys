import React, { Component } from "react";
import {Navbar, Nav, NavbarBrand} from 'react-bootstrap';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import logo from '../resources/logo.png';
import MainFeed from "./MainFeed";
import MainInfo from "./MainInfo";
import MainContact from "./MainContact";
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
// import './styles/App.css';


export default class App extends Component {
  render() {
    return (
      <Router>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}>
          <Navbar bg='info'
            style={{
              display: 'flex',
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
            <NavbarBrand href='#'>
              <img alt='' src={logo} width='30' height='30' className='d-inline-block'/>
              {' Mundo Acqua'}
            </NavbarBrand>
            <Nav
              style={{
                display: 'flex',
                alignSelf: 'flex-end'
              }}>
              <Nav.Link><NavLink to="/login">Ingresar</NavLink></Nav.Link>
              <Nav.Link><NavLink to="/register/1">Registrarse</NavLink></Nav.Link>
            </Nav>
            <div>
              <Route path="/login" component={LoginPage}/>
              <Route path="/register/1" component={RegisterPage}/>
            </div>
          </Navbar>
          <MainFeed/>
          <MainInfo/>
          <MainContact/>
        </div>
      </Router>
    );
  }
}