import React, { Component } from "react";
import MainPage from "./MainPage";
import {Navbar, Nav, NavbarBrand} from 'react-bootstrap';
import logo from './resources/logo.png';

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar bg="info" variant="dark">
          <NavbarBrand href="/home">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            {' Mundo Acqua'}
          </NavbarBrand>
          <Nav className="mr-auto">
            <Nav.Link href="/ingresar">Ingresar</Nav.Link>
            <Nav.Link href="/contacto">Contacto</Nav.Link>
          </Nav>
        </Navbar>
        <MainPage/>
      </React.Fragment>
    );
  }
}