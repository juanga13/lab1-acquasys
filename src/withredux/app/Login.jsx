/**
 * imports:
 * -  react
 * --  react-router
 * --  react-redux
 * --  react-bootstrap
 * -  project components
 * -  css
 */
import React, {Component} from 'react';

import {Redirect} from "react-router";

import {connect} from "react-redux";
import store from "./redux/store";
import { setTokenData } from './redux/actions';

import {Button, Form} from "react-bootstrap";

import RequestManager from "../network/RequestManager";

import '../css/login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.test = {
      response: -1,  // test
        role: '',
    };
    this.state = {
      validated: false,
      redirect: false,
      data: {
        email: '',
        password: '',
      },
    };
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({data: {[event.target.id]: event.target.value}});
  };

  handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) event.stopPropagation();
    this.setState({ validated: true });
    let response = RequestManager.postData('http://172.22.44.128:8080/api/user/register', this.state.data);
    console.log(response);
    // if (response === 200) {
    //   // handle successfull login
    //
    // } else if (response > 399) {
    //   // handle failed login
    //
    // }

    /**TEST*/
    if (this.test.response !== -1) {  // if you click on test buttons, begin a fake login
      response = this.test.response;
      if (response > 399) {
        this.setState({status: 'failure'});
      }
      else {
        this.setState({redirect: true, status: 'success'});
        store.dispatch(setTokenData("test_token", this.test.role));
      }
    }
  };

  renderAlert() {
    if (this.state.status === 'success') {
      return (
        <div className="border border-success alert-notification">
          <h6>Login successful!</h6>
        </div>
      );
    } else if (this.state.status === 'failure') {
      return (
        <div className="border border-danger alert-notification">
          <h6>Failed to login</h6>
        </div>
      );
    } else return (null);
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      this.setState({ redirect: false });
      return <Redirect exact to='/'/>
    }
  };

  render() {
    return (
      <div className='login'>
        <h5>Ingrese a Mundo Acqua</h5>
        <hr/>
        {this.renderAlert()}
        {/*TODO use Formik to validate data before submitting*/}
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Correo electronico</Form.Label>
            <Form.Control
              id='email'
              type='email'
              placeholder='Email'
              autoFocus
              autoComplete='on'
              onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              id='password'
              type='password'
              placeholder='Contraseña'
              autoComplete='on'
              onChange={this.handleChange}/>
          </Form.Group>
          <Button type='submit'>Ingresar</Button>
        </Form>
        {this.renderRedirect()}

        {/**TEST*/}
        <div className="border border-secondary m-2 p-2">
          <h6>test, set response status manually</h6>
          <Button onClick={() => (this.test.response = 200)} className="btn btn-success m-1">200</Button>
          <Button onClick={() => (this.test.response = 400)} className="btn btn-danger m-1">400</Button>
          <h6>set the role</h6>
          <Button onClick={() => (this.test.role = 'owner')} className="btn btn-secondary m-1">Owner</Button>
          <Button onClick={() => (this.test.role = 'teacher')} className="btn btn-secondary m-1">Teacher</Button>
          <Button onClick={() => (this.test.role = 'student')} className="btn btn-secondary m-1">Student</Button>
          <Button onClick={() => (this.test.role = 'unverified-student')} className="btn btn-secondary m-1">Unverified Student</Button>
        </div>
      </div>
    );
  }
}
Login = connect()(Login);

export default Login;