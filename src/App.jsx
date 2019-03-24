import React, { Component } from "react";
import InitialPage from "./InitialPage";
import {Navbar, Nav, NavbarBrand} from 'react-bootstrap';
import logo from './resources/logo.png';
import RegisterPage from "./RegisterPage";
import background from './resources/background.jpg';
import MainContainer from "./MainContainer";

export default class App extends Component {
  handleLogin = () => {
    console.log("changing to loginPage")
  };

  render() {
    return (
      <div
        style={{
          backgroundImage: 'url(' + background + ')',
          height: '1000px',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'fill'
        }}>
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
        <MainContainer/>
      </div>
    );
  }
}