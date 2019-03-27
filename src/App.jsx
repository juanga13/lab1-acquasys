import React, { Component } from "react";
// import InitialPage from "./InitialPage";
// import {Navbar, Nav, NavbarBrand} from 'react-bootstrap';
// import logo from './resources/logo.png';
// import RegisterPage from "./RegisterPage";
import background from './resources/background.jpg';
import MainContainer from "./MainContainer";

export default class App extends Component {
  // handleLogin = () => {
  //   console.log("changing to loginPage")
  // };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          height: '1080px',
          justifyContent: 'center',
          backgroundImage: 'url(' + background + ')',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}>
        <MainContainer/>
      </div>
    );
  }
}