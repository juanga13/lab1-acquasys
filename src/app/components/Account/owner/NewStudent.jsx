import React, { Component } from 'react';
import { Form, Row } from 'react-bootstrap';

class NewStudent extends Component {
  render() {
    const user = {email: '', social: {facebook: '', twitter: ''}}
    return (
      <div>
        <h2>Nuevo Estudiante</h2>
        <Form>
          <Form.Group as={Row}>
            <Form.Label>Correo electronico</Form.Label>
            <Form.Control
              id=""
              type=""
              placholder=""
              autoFocus
              onChange={this.handleChange}
            />
          </Form.Group>
        </Form>
      </div>
    )
  }
}

export default NewStudent;