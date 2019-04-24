import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import '../css/login.css';
import RequestManager from "../network/RequestManager";
import {Redirect} from "react-router";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validated: false,
      redirect: false,
      data: {
        email: '',
        password: '',
      }
    }
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({data: {[event.target.id]: event.target.value}});
  };

  handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ validated: true });
    if (RequestManager.postData('http://172.22.44.128:8080/api/user/register', this.state.data) === 200) {
      this.setState({ redirect: true })
    } else {

    }
  };

  renderRedirect = () => {
    console.log("haro");
    if (this.state.redirect) {
      this.setState({ redirect: false });
      return <Redirect to='/'/>
    }
  };

  render() {
    return (
      <div className='login'>
        <h5>Ingrese a Mundo Acqua</h5>
        <hr/>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Correo electronico</Form.Label>
            <Form.Control
              id='email'
              type='email'
              placeholder='Email'
              autoFocus
              onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              id='password'
              type='password'
              placeholder='Contraseña'
              onChange={this.handleChange}/>
          </Form.Group>
          <Button type='submit'>Ingresar</Button>
        </Form>
        {this.renderRedirect}
      </div>
    );
  }
}

export default Login;