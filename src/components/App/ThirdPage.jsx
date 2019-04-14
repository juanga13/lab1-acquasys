import React, {Component} from 'react';
import {Form, Col, Row, Button} from 'react-bootstrap';

export default class SecondPage extends Component {
  get id() {
    return this._id;
  }
  constructor(props) {
    super(props);

    super._id = 5;
    this.state = {
      validated: false
    };
  };

  render(){
    const validated = this.state.validated;
    return(
      <div className={"register-page-sub"}>
        <h3>Third Register Page</h3>
        <Form onSubmit={this.handleSubmit}
              noValidate
              validated={validated}
        >
          <Form.Group as={Row}>
            <Form.Label column>Nombre del padre</Form.Label>
            <Col><Form.Control value={this.state.fatherName}
                               id="fatherName"
                               type="name"
                               placeholder="Nombre del padre"
                               onChange={this.handleChange}/></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Apellido del padre</Form.Label>
            <Col><Form.Control value={this.state.fatherSurname}
                               id="fatherSurname"
                               type="name"
                               placeholder="Nombre del padre"
                               onChange={this.handleChange}/></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Telefono del padre</Form.Label>
            <Col><Form.Control value={this.state.fatherPhoneNumber}
                               id="fatherPhoneNumber"
                               type="number"
                               placeholder="Telefono del padre"
                               onChange={this.handleChange}/></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>E-mail del padre</Form.Label>
            <Col><Form.Control value={this.state.fatherEmail}
                               id="fatherEmail"
                               type="email"
                               placeholder="E-mail del padre"
                               onChange={this.handleChange}/></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Nombre de la Madre</Form.Label>
            <Col><Form.Control value={this.state.motherName}
                               id="motherName"
                               type="name"
                               placeholder="Nombre de la madre"
                               onChange={this.handleChange}/></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Apellido de la Madre</Form.Label>
            <Col><Form.Control value={this.state.motherSurname}
                               id="motherSurname"
                               type="name"
                               placeholder="Apellido de la madre"
                               onChange={this.handleChange}/></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Telefono de la madre</Form.Label>
            <Col><Form.Control value={this.state.motherPhoneNumber}
                               id="motherPhoneNumber"
                               type="number"
                               placeholder="Telefono de la madre"
                               onChange={this.handleChange}/></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>E-mail de la madre</Form.Label>
            <Col>
              <Form.Control value={this.state.motherEmail}
                            id="motherEmail"
                            required
                            type="email"
                            placeholder="E-mail de la madre"
                            onChange={this.handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              defaultValue="Otto"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Button type="submit">Registrarse</Button>
        </Form>
      </div>
    );
  };
}