import React, { Component } from 'react';
import { Redirect} from "react-router";
import { connect} from "react-redux";
import store from "../_store";
import { setTokenData } from '../_actions';
import { Button, Form } from "react-bootstrap";
import RequestManager from "../network/RequestManager";
import '../css/login.css';

/** ######################################################################
 * Login class 
 * 
 * two forms fields saved in state
 * if login successful --> redirect to main page
 * if not --> show error 
 ###################################################################### */
class Login extends Component {
  /** ==========================================================
   * Constructor
   ========================================================== */
  constructor(props) {
    super(props);

    this.test = {
      role: '',
    };

    this.state = {
      redirect: false,
      loginResponse: null,
      errors: {
        email: false,
        password: false,
      },
      email: '',
      password: '',
    };
  }

  /**
   * form validation, in the setState function checks conditions given
   * 
   * then sets a boolean if the error message should appear, that
   * render shows (checking the error state)
   */
  validateInputs() {
    const email = this.state.email;
    const password = this.state.password;
    this.setState({errors: {
      email: ((email.length === 0 || 
                !email.includes("@") || 
                !email.includes(".")) 
                  ? true : false),
      password: (password.length < 6) ? true : false,
    }});
  }
 
  /** ==========================================================
   * Event handling
   * 
   * onClick, onChange
   ========================================================== */

  /**
   * called when any form input text changes
   * saves change into state so that submit 
   * gets it later.
   */
  handleChange = event => {
    event.preventDefault();
    this.setState({[event.target.id]: event.target.value});
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
    const form = event.currentTarget;
    this.validateInputs();
    if (this.state.errors.email || this.state.errors.password) {
      event.stopPropagation();
      return;
    }
    // form data is verified, request login to server
    
    let response = RequestManager.getToken(this.state.email, this.state.password)
    
    // RequestManager.userLogin(this.state.email, this.state.password);
    if (response.error === "invalid_grant") {
      this.setState({loginReponse: response.error_description})
    }
    if (response.access_token !== undefined) {
      this.setState({waitUserInfo: true});
      RequestManager.getUserInfo(response.access_token)
      .then(function(data) {
        // console.log("NANI");
        // console.log(data);
        store.dispatch(setTokenData(response.access_token,  data.authorities[0]));
      })
      .then(this.setState({redirect: true}));
    } 
    
    /** test */
    if (this.test.role !== '') {
      store.dispatch(setTokenData("testToken", this.test.role));
      this.setState({redirect: true});
    }
  };

  /** ==========================================================
   * Secondary render methods
   ========================================================== */

  /**
   * renders an alert depending on response given
   * after requesting login to server
   */
  renderAlert() {
    if (this.state.loginReponse !== null) {
      return (
        <div className="border border-success alert-notification">
          <h6>{this.state.loginResponse}</h6>
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

  renderEmailError = () => {
    // console.log("error in email?: " + this.state.errors.email);
    if (this.state.errors.email) { 
      return (
        <h6 className="text-danger">
          Invalid email!
        </h6>);
    } else return null;
  }

  renderPasswordError = () => {
    // console.log("error in password?: " + this.state.errors.password);
    if (this.state.errors.password) { 
      return (
        <h6 className="text-danger">
          Password must be 6 characters or more
        </h6>);
    } else return null; 
  }

  /** ==========================================================
   * main render method
   * (updates when setState is called)
   ========================================================== */
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
            {this.renderEmailError()}
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
          {this.renderPasswordError()}
          <Button type='submit'>Ingresar</Button>
        </Form>
        {this.renderRedirect()}

        {/**TEST*/}
        <div className="border border-secondary m-2 p-2">
          <h6>test, set response status manually</h6>
          <h6>set the role</h6>
          <Button onClick={() => (this.test.role = 'ROLE_OWNER')} className="btn btn-primary m-1">Owner</Button>
          <Button onClick={() => (this.test.role = 'ROLE_TEACHER')} className="btn btn-warning m-1">Teacher</Button>
          <Button onClick={() => (this.test.role = 'ROLE_STUDENT')} className="btn btn-success m-1">Student</Button>
          {/*<Button onClick={() => (this.test.role = 'unverified-student')} className="btn btn-danger m-1">Unverified Student</Button>*/}
        </div>
        
      </div>
    );
  }
}
Login = connect()(Login);

export default Login;