import React, {Component} from 'react';
import {Redirect} from "react-router";
import {connect} from "react-redux";
import store from "../store";
import { setTokenData } from '../actions';
import {Button, Form} from "react-bootstrap";
import RequestManager from "../network/RequestManager";
import '../css/login.css';

/**
 * Login 
 * two forms data, uploads and redirects, 
 * has state.
 */
class Login extends Component {
  constructor(props) {
    super(props);

    this.test = {
      response: -1,
      role: '',
    };
    this.state = {
      redirect: false,
      email: '',
      password: '',
    };
  }

  /**
   * called when any form input text changes
   * saves change into state so that submit 
   * gets it later.
   */
  handleChange = event => {
    console.log(event.target.value);
    event.preventDefault();
    // let data = {};
    // data[event.target.name] = event.target.value;
    this.setState({[event.target.id]: event.target.value});
    console.log(this.state);
  };

  /**
   * TODO checks if data is valid
   * sends data to servers and depending on
   * response:
   *   successful -> redirects to home
   *   failure -> alert 
   */
  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    const form = event.currentTarget;
    if (form.checkValidity() === false) event.stopPropagation();
    this.setState({ validated: true });
    let response = RequestManager.getToken(this.state.email, this.state.password); 
    console.log("token is: " + response.access_token);
    if (response.access_token !== undefined) {
      this.setState({waitUserInfo: true});
      // console.log();
     
      RequestManager.getUserInfo(response.access_token)
      .then(function(data) {
        console.log("NANI");
        console.log(data);
        store.dispatch(setTokenData(response.access_token,  data.authorities[0]));
      })
      .then(this.setState({redirect: true}));
    }
  };

  /**
   * renders an alert depending on response given
   * after requesting login to server
   */
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
    } else return null;
  }

  /**
   * checks whether if a redirect is needed 
   */
  renderRedirect = () => {
    if (this.state.redirect) {
      this.setState({ redirect: false });
      // return <Redirect exact to='/'/>
      return <Redirect exact to='/my-account'/>
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
          <h6>set the role</h6>
          <Button onClick={() => (this.test.role = 'owner')} className="btn btn-primary m-1">Owner</Button>
          <Button onClick={() => (this.test.role = 'teacher')} className="btn btn-warning m-1">Teacher</Button>
          <Button onClick={() => (this.test.role = 'student')} className="btn btn-success m-1">Student</Button>
          <Button onClick={() => (this.test.role = 'unverified-student')} className="btn btn-danger m-1">Unverified Student</Button>
        </div>
      </div>
    );
  }
}
Login = connect()(Login);

export default Login;