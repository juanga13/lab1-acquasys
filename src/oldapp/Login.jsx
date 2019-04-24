import React, {Component} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import logo2 from "../logo2.jpg";
import './login.css';
import RequestManager from './RequestManager'
import {instanceOf} from "prop-types";
import {Cookies} from "react-cookie";
import {Redirect} from "react-router";
import {NavLink} from "react-router-dom";

export default class Login extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      username: "facundo",
      password: "asd123",
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const {cookies} = this.props;
    console.log(this.state);
    // let tokenObject = JSON.parse(RequestManager.getToken(this.state.username, this.state.password));
    // cookies.set('token', tokenObject.access_token, {path: '/'});
    cookies.set('token', 'test')
  };

  handleChange = event => {
    event.preventDefault();
    console.log(event);
    this.setState({
        [event.target.id]: event.target.value
      }
    );
  };

  render() {
    return (
      <div className='login'>
        <div className='login-box'>
          <img alt='' src={logo2} width='200' height='200'/>
          <br/>
          <Form onSubmit={this.handleSubmit}>
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
            <div className="login-button">
              <Button className="btn-info"
                      type="submit"
                      onClick={this.props.onLogged}
              ><NavLink className='login-text' to='/my-account'>Entrar</NavLink></Button>
            </div>
          </Form>
        </div>
      </div>
    );
  };
}