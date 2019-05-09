import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";

import '../css/register.css';
import RequestManager from '../network/RequestManager';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {
        onSubmit: false,
        email: false,
        password: false,
        name: false,
        surname: false
      },
      email: '',
      password: '',
      name: '',
      surname: '',
    }
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

  handleChange = event => {
    event.preventDefault();
    this.setState({[event.target.id]: event.target.value});
  };

  handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    
    this.validateInputs();
    if (this.state.errors.email || this.state.errors.password || 
    this.state.errors.name || this.state.errors.surname) {
      event.stopPropagation();
      return;  
    }
    // form data is verified, request login to server
    // /**
    let response = RequestManager.postData(this.state);
    //TODO
    if (response.error === "bad_credentials") {
      this.
    }
    this.setState() 
    // */
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

  renderNameError = () => {
    // console.log("error in email?: " + this.state.errors.email);
    if (this.state.errors.email) { 
      return (
        <h6 className="text-danger">
          Invalid email!
        </h6>);
    } else return null;
  }

  renderSurnameError = () => {
    // console.log("error in password?: " + this.state.errors.password);
    if (this.state.errors.surname) { 
      return (
        <h6 className="text-danger">
          El apellido debe tener 
        </h6>);
    } else return null; 
  }

  render() {
    return (
      <div className='register'>
        <h5>Registra un nuevo usuario</h5>
        <hr/>
        {this.renderAfterSubmitError}
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Correo electronico</Form.Label>
            <Form.Control
              id='email'
              type='email'
              placeholder='Email'
              autoFocus
              onChange={this.handleChange}/>
          </Form.Group>
        </Form>
        <Form>
          <Form.Group>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              id='password'
              type='password'
              placeholder='Contraseña'
              onChange={this.handleChange}/>
          </Form.Group>
        </Form>
        <Form>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              id='name'
              type='name'
              placeholder='Nombre'/>
          </Form.Group>
        </Form>
        <Form>
          <Form.Group>
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              id='surname'
              type='name'
              placeholder='Apellido'/>
          </Form.Group>
        </Form>
        <Button type='submit'>Registrarse</Button>
      </div>
    );
  }
}

export default Register;