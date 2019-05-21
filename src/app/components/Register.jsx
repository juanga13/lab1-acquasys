import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";

import '../css/register.css';
import RequestManager from '../network/RequestManager';
import {Redirect} from "react-router";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: '',
        name: '',
        surname: '',
      },
      redirect: false,
      error: null,
      errors: {
        email: false,
        password: false,
        name: false,
        surname: false
      }
    }
  }

  validateInputs() {
    const email = this.state.user.email;
    const password = this.state.user.password;
    this.setState({
      errors: {
        email: ((email.length === 0 ||
          !email.includes("@") ||
          !email.includes("."))),
        password: (password.length < 6),
      }
    });
  }

  handleChange = event => {
    event.preventDefault();
    let oldUser = this.state.user;
    let newUser = {[event.target.id]: event.target.value};
    oldUser.email = newUser.email == null ? oldUser.email : newUser.email;
    oldUser.password = newUser.password == null ? oldUser.password : newUser.password;
    oldUser.name = newUser.name == null ? oldUser.name : newUser.name;
    oldUser.surname = newUser.surname == null ? oldUser.surname : newUser.surname;
//  items: update(this.state.items, {1: {name: {$set: 'updated field name'}}}) TODO: ESTA ES LA MANERA CORRECTA DE HACERLO
    this.setState({user: oldUser, redirect: false});
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

    return fetch(RequestManager.baseUrl + "/api/user/register", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {"Content-Type": "application/json"},
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(this.state.user),
    })
      .then(response => {
        if (response.ok) {
          localStorage.setItem("registerStatus", "success");
          this.setState({redirect: true});
        } else {
          this.setState({error: response.statusText});
          console.log(response);
        }
      })
      .catch(error => {
        console.log("Error: " + error)
      })

  };

  renderRedirect = () => {
    if (this.state.redirect) {
      this.setState({redirect: false});
      return <Redirect exact to='/login'/>
    }
  };
  renderError = () => {
    if (this.state.error != null) {
      console.log(this.state.error);
      return <div className="alert alert-primary" role="alert">
        {this.state.error}
      </div>
    }
  };
  renderNameError = () => {
    // console.log("error in email?: " + this.state.errors.email);
    if (this.state.errors.email) {
      return (
        <h6 className="text-danger">
          Invalid email!
        </h6>);
    } else return null;
  };

  renderSurnameError = () => {
    // console.log("error in password?: " + this.state.errors.password);
    if (this.state.errors.surname) {
      return (
        <h6 className="text-danger">
          El apellido debe tener
        </h6>);
    } else return null;
  };
  renderEmailError = () => {
    // console.log("error in email?: " + this.state.errors.email);
    if (this.state.errors.email) {
      return (
        <h6 className="text-danger">
          Invalid email!
        </h6>);
    } else return null;
  };

  renderPasswordError = () => {
    // console.log("error in password?: " + this.state.errors.password);
    if (this.state.errors.password) {
      return (
        <h6 className="text-danger">
          Password must be 6 characters or more
        </h6>);
    } else return null;
  };

  render() {
    return (
      <div className='register'>
        <h5>Registra un nuevo usuario</h5>
        <hr/>
        <Form onSubmit={this.handleSubmit}>
          {this.renderEmailError()}
          <Form.Group>
            <Form.Label>Correo electronico</Form.Label>
            <Form.Control
              id='email'
              type='email'
              placeholder='Email'
              autoFocus
              onChange={this.handleChange}/>
          </Form.Group>
          {this.renderPasswordError()}
          <Form.Group>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              id='password'
              type='password'
              placeholder='Contraseña'
              onChange={this.handleChange}/>
          </Form.Group>
          {this.renderNameError()}
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              id='name'
              type='name'
              placeholder='Nombre'
              onChange={this.handleChange}/>

          </Form.Group>
          {this.renderSurnameError()}
          <Form.Group>
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              id='surname'
              type='name'
              placeholder='Apellido'
              onChange={this.handleChange}/>

          </Form.Group>
          <Button type='submit'>Registrarse</Button>
        </Form>
        {this.renderError()}
        {this.renderRedirect()}
      </div>
    );
  }
}

export default Register;