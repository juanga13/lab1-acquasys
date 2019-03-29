import React, {Component} from 'react';
import {HashRouter, NavLink, Route, Redirect} from 'react-router-dom';
import {Button, Nav, NavItem} from 'react-bootstrap';
import RegisterFirstPage from './RegisterFirstPage';
import RegisterSecondPage from './RegisterSecondPage';
import RegisterThirdPage from './RegisterThirdPage';

export default class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log("submit!")
  };

  render() {
    return (
      <div>
        <h2>Register Page</h2>
        <HashRouter>
          <Nav className="pagination">
            {/*<li className="page-item"><NavLink to=>Previous</NavLink></li>*/}
            <NavItem className="page-item"><NavLink to='/register/1'>1</NavLink></NavItem>
            <NavItem className="page-item"><NavLink to='/register/2'>2</NavLink></NavItem>
            <NavItem className="page-item"><NavLink to='/register/3'>3</NavLink></NavItem>
            {/*<li className="page-item"><NavLink>Next</NavLink></li>*/}
          </Nav>
          <Route path="/register/1" component={RegisterFirstPage}/>
          <Route path="/register/2" component={RegisterSecondPage}/>
          <Route path="/register/3" component={RegisterThirdPage}/>
        </HashRouter>
        </div>
      )
  };
}
