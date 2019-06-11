import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar} from 'react-bootstrap';
import '../../../css/owner.css';

class TeacherNavbar extends Component {
  render() {
    return (
      <Navbar>
        <div className='teacher-navbar'>
          <NavLink className='nav-link app-link' activeClassName='navlink app-link-active' to='/my-account/my-classes'>Mis clases</NavLink>
        </div>
      </Navbar>
    );
  }
}

export default TeacherNavbar;
