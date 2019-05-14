import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar} from 'react-bootstrap';
// import '../../../css/owner.css';

class OwnerNavbar extends Component {
  render() {
    return (
      <Navbar className='owner-account-navbar'>
        <div className='app-link-container'>
          <NavLink className='nav-link app-link' activeClassName='navlink app-link-active' to='/new-student'>Nuevo alumno</NavLink>
          <NavLink className='nav-link app-link' activeClassName='navlink app-link-active' to='/new-teacher'>Nuevo profesor</NavLink>
          <NavLink className='nav-link app-link' activeClassName='navlink app-link-active' to='/new-class'>Nueva clase</NavLink>
        </div>
      </Navbar>
    );
  }
}

export default OwnerNavbar;