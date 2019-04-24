import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";

import '../css/register.css';

class Register extends Component {
  render() {
    return (
      <div className='register'>
        <h5>Registra un nuevo usuario</h5>
        <hr/>
        <Form>
          <Form.Group>
            <Form.Label>Correo electronico</Form.Label>
            <Form.Control
              id='email'
              type='email'
              placeholder='Email'
              autoFocus/>
          </Form.Group>
        </Form>
        <Form>
          <Form.Group>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              id='password'
              type='password'
              placeholder='Contraseña'/>
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