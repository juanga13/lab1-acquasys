import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar} from 'react-bootstrap';
import '../../../css/owner.css';

class OwnerNavbar extends Component {
  render() {
    return (
      <Navbar>
        <div className='owner-navbar'>
          <NavLink className='nav-link app-link' activeClassName='navlink app-link-active' to='new-student'>Nuevo alumno</NavLink>
          {/* <vr className="vertical-separator"/> */}
          <NavLink className='nav-link app-link' activeClassName='navlink app-link-active' to='new-teacher'>Nuevo profesor</NavLink>
          {/* <vr className="vertical-separator"/> */}
          <NavLink className='nav-link app-link' activeClassName='navlink app-link-active' to='new-class'>Nueva clase</NavLink>
        </div>
      </Navbar>
    );
  }
}

export default OwnerNavbar;