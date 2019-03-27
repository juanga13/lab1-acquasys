import React, {Component} from 'react';
import {HashRouter, NavLink, Route, Redirect} from 'react-router-dom';
import {Button} from 'react-bootstrap';
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
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {/*<li className="page-item"><NavLink to=>Previous</NavLink></li>*/}
              <li className="page-item"><NavLink to='/register/1'>1</NavLink></li>
              <li className="page-item"><NavLink to='/register/2'>2</NavLink></li>
              <li className="page-item"><NavLink to='/register/3'>3</NavLink></li>
              {/*<li className="page-item"><NavLink>Next</NavLink></li>*/}
            </ul>
          </nav>
          <Route path="/register/1" component={RegisterFirstPage}/>
          <Route path="/register/2" component={RegisterSecondPage}/>
          <Route path="/register/3" component={RegisterThirdPage}/>
        </HashRouter>
      </div>
      )
  };
}
