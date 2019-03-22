import React, { Component } from "react";
import MainPage from "./logged-user/MainPage";
import {Navbar, Nav, NavbarBrand} from 'react-bootstrap';
import logo from './resources/logo.png';
import RegisterPage from "./RegisterPage";

export default class App extends Component {
  handleLogin = () => {
    console.log("changing to loginPage")
  };

  render() {
    return (
      <React.Fragment>
        {/*<Navbar bg="info" variant="dark">*/}
          {/*<NavbarBrand href="/home">*/}
            {/*<img*/}
              {/*alt=""*/}
              {/*src={logo}*/}
              {/*width="30"*/}
              {/*height="30"*/}
              {/*className="d-inline-block align-top"*/}
            {/*/>*/}
            {/*{' Mundo Acqua'}*/}
          {/*</NavbarBrand>*/}
          {/*<Nav className="mr-auto">*/}
            {/*<Nav.Link onClick={this.handleLogin} href="/ingresar">Ingresar</Nav.Link>*/}
            {/*<Nav.Link href="/contacto">Contacto</Nav.Link>*/}
          {/*</Nav>*/}
        {/*</Navbar>*/}
        <RegisterPage/>
      </React.Fragment>
    );
  }
}