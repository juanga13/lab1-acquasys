import React, {Component} from 'react';
import { NavLink } from "react-router-dom";
import { NavItem } from "react-bootstrap";

class Navbar extends Component {
  render() {
    return (
      <div>
        <NavItem><NavLink exact to='/'>Inicio</NavLink></NavItem>
        <NavItem><NavLink to='/login'>Ingresar</NavLink></NavItem>
        <NavItem><NavLink to='/register'>Registrarse</NavLink></NavItem>
      </div>
    );
  }
}

export default Navbar;