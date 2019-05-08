import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";

import '../css/register.css';
import RequestManager from '../network/RequestManager';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      name: '',
      surname: '',
    }
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({[event.target.id]: event.target.value});
  };

  handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    if (form.checkValidity() === true) {
      // store.dispatch(userRegister())
      let response = RequestManager.postData(this.state);
      
    } 
    else event.stopPropagation();
    
  };

  render() {
    return (
      <div className='register'>
        <h5>Registra un nuevo usuario</h5>
        <hr/>
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