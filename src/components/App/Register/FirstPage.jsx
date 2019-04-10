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
        <h3>First Register Page</h3>
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
            <Form.Label column>Nombre</Form.Label>
            <Col><Form.Control value={this.state.name}
                               id="name"
                               type="name"
                               placeholder="Nombre"
                               onChange={this.handleChange}/></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Apellido</Form.Label>
            <Col><Form.Control value={this.state.surname}
                               id="surname"
                               type="name"
                               placeholder="Apellido"
                               onChange={this.handleChange}/></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Direccion</Form.Label>
            <Col><Form.Control value={this.state.address}
                               id="address"
                               type="name"
                               placeholder="Direccion"
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
          <Form.Group as={Row}>
            <Form.Label column>Sexo</Form.Label>
            <Col><Form.Control id="sex"
                               as="select"
                               type="password"
                               placeholder="Contraseña"
                               onChange={this.handleChange}>
              <option>Masculino</option>
              <option>Femenino</option>
            </Form.Control></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Telefono</Form.Label>
            <Col><Form.Control value={this.state.phoneNumber}
                               id="phoneNumber"
                               type="number"
                               placeholder="Telefono"
                               onChange={this.handleChange}/></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Fecha de nacimiento</Form.Label>
            <Col><Form.Control value={this.state.birthday}
                               id="birthday"
                               type="name"
                               placeholder="Fecha de nacimiento"
                               onChange={this.handleChange}/></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Foto de perfil</Form.Label>
            <Col><Form.Control value={this.state.avatarUrl}
                               id="avatarUrl"
                               type="name"
                               placeholder="Foto de perfil"
                               onChange={this.handleChange}/></Col>
            <Col><Button>Seleccionar</Button></Col>
          </Form.Group>
        </Form>
      </div>
    );
  };

}