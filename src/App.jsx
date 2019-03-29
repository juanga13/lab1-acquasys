import React, { Component } from "react";
import {Navbar, Nav, NavbarBrand} from 'react-bootstrap';
import logo from './resources/logo.png';
import MainFeed from "./MainFeed";
import MainInfo from "./MainInfo";
import MainContact from "./MainContact";

export default class App extends Component {
  render() {
    return (
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
            <img
              alt=''
              src={logo}
              width='30'
              height='30'
              className='d-inline-block'
              />
            {' Mundo Acqua'}
          </NavbarBrand>
          <Nav
            style={{
              display: 'flex',
              alignSelf: 'flex-end'
            }}
          >
            <Nav.Link href="#/login">Ingresar</Nav.Link>
            <Nav.Link href="#/register/1">Registrarse</Nav.Link>
          </Nav>
        </Navbar>
        <MainFeed/>
        <MainInfo/>
        <MainContact/>
      </div>
    );
  }
}