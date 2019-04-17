import React, {Component} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import logo2 from "../../logo2.jpg";
import './login.css';
import RequestManager from './RequestManager'
import {instanceOf} from "prop-types";
import {Cookies} from "react-cookie";

export default class Login extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      token: cookies.get('token') || null
    };
  }
  handleSubmit = event => {
    event.preventDefault();
    let username = "facundo";//placeholder
    let password = "asd123"; //placeholder
    let url = "http://localhost:8080/oauth/token";
    const { cookies } = this.props;
    let tokenObject = JSON.parse(RequestManager.getToken(url,username,password));
    cookies.set('token', tokenObject.access_token, { path: '/' });
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