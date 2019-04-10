import React, {Component} from 'react';
import {Form, Col, Row, Button} from 'react-bootstrap';

export default class FirstPage extends Component {
  get id() {
    return this._id;
  }
  constructor(props) {
    super(props);

    super._id = 3;
    this.state = {
      validated: false
    };
  };

  render() {
    return(
      <div className={"register-page-sub"}>
        <h3>Datos de usuario</h3>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column>Nombre de usuario</Form.Label>
            <Col><Form.Control value={this.state.username}
                               id="username"
                               type="name"
                               placeholder="Nombre de usuario"
                               onChange={this.handleChange}/></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Contraseña</Form.Label>
            <Col><Form.Control value={this.state.password}
                               id="password"
                               type="password"
                               placeholder="Contraseña"
                               onChange={this.handleChange}/></Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column>E-mail</Form.Label>
            <Col><Form.Control value={this.state.email}
                               id="email"
                               type="email"
                               placeholder="E-mail"
                               onChange={this.handleChange}/></Col>
          </Form.Group>
        </Form>
      </div>
    );
  };

}