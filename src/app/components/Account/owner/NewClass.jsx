import React, {Component} from 'react';
import {Button, Form} from 'react-bootstrap';

class NewClass extends Component {
  render() {
    return (
      <div>
        <h1>Clase</h1>
        <Button>Agregar nueva clase</Button>
        <Form>
          <Form.Label>nothing</Form.Label>
          <Form.Control/>
        </Form>
      </div>
    );
  }
}

export default NewClass;