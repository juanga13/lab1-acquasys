import React, {Component} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import logo2 from "../resources/logo2.jpg";

export default class Login extends Component {
  handleSubmit = event => {
    event.preventDefault();

  };

  postData(url: '', data= {}) {
    return fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {"Content-Type": "application/json"},
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(data),
    }).then(response => response.json)
  };


  render() {
    return(
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <img alt='' src={logo2} width='200' height='200'/>
        <br/>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Row}>
            <Form.Label column>Nombre de usuario</Form.Label>
            <Col><Form.Control id="username"
                               type="name"
                               placeholder="Nombre de usuario"
                               onChange={this.handleChange}/></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Contraseña</Form.Label>
            <Col><Form.Control id="password"
                               type="password"
                               placeholder="Contraseña"
                               onChange={this.handleChange}/></Col>
          </Form.Group>
          <Button className="btn-info" type="submit">Entrar</Button>
        </Form>
      </div>
    );
  };
}