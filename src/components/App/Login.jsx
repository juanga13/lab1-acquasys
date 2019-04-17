import React, {Component} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import logo2 from "../../logo2.jpg";
import './login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        username: "",
        password: "",
      }
    }
  };

  getData(url: '') {
    return fetch(url,
      {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {"Content-Type": "application/json"},
        redirect: "follow",
        referrer: "no-referrer"
      })
      .then(results => {return results.json();})
      // .then(data => this.setState({name : data}))
  };

  handleSubmit = event => {
    event.preventDefault();
    this.postData("", this.state.data);
  };

  render() {
    return(
      <div className='login'>
        <div className='login-box'>
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
            <div className="login-button"><Button className="btn-info loin-button" type="submit">Entrar</Button></div>
          </Form>
        </div>
      </div>
    );
  };
}