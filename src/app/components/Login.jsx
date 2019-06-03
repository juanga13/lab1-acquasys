import React, {Component} from 'react';
import {Redirect} from "react-router";
import {connect} from "react-redux";
import store from "../store";
import {setTokenData} from '../actions';
import {Button, Form, Row, Spinner} from "react-bootstrap";
import RequestManager from "../network/RequestManager";
import '../css/login.css';
import Owner from "./Account/Account";
import { domainToUnicode } from 'url';

class Login extends Component {
  constructor(props) {
    super(props);

    this.test = {
      role: '',
    };

    this.state = {
      redirect: false,
      loginResponse: null,
      errors: {
        email: false,
        password: false,
      },
      email: '',
      password: '',
    };
  }

  validateInputs() {
    const email = this.state.email;
    const password = this.state.password;
    this.setState({
      errors: {
        email: (email.length <= 4 ||
          !email.includes("@") ||
          !email.includes(".")),
        password: (password.length < 6),
      }
    });
    return email.length < 4 || !email.includes("@") || !email.includes(".") || password.length < 6;
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({[event.target.id]: event.target.value});
  };

  handleSubmit = event => {
    event.preventDefault();
    // loading animation
    if (this.validateInputs()) {
      event.stopPropagation();
      return;
    }
    // localStorage.setItem("token", "token_test");
    // localStorage.setItem("role", "ROLE_ADMIN");
    // store.dispatch(setTokenData("token_test", "ROLE_ADMIN"));
    // this.setState({redirect: true})

    // form data is verified, request login to server
    let urlen = "grant_type=password&password=" + this.state.password + "&username=" + this.state.email;
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.datatype = 'json';

    xhr.open("POST", RequestManager.baseUrl + "/oauth/token", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Authorization", "Basic Y2xpZW50aWQ6Y2xpZW50c2VjcmV0");//ClientId y clientsecret hardcodeado
    xhr.setRequestHeader("cache-control", "no-cache");
    let login = this;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          let response = JSON.parse(this.responseText);
          console.log(response);
          if (response.error === "invalid_grant") {
            login.setState({loginResponse: "Los datos ingresados no son validos"});
            return;
          }
          if (response.access_token !== undefined) {
            login.setState({waitUserInfo: true});
            RequestManager.getUserInfo(response.access_token)
              .then((data) => {
                localStorage.setItem("token",response.access_token);
                localStorage.setItem("role",data.authorities[0]);
                store.dispatch(setTokenData(response.access_token, data.authorities[0]));
                login.setState({redirect: true})
              });
          }
        } else {
          console.log(this.readyState);
        }
      }
    );
    xhr.send(urlen);
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      this.setState({redirect: false});
      return <Redirect exact to='/my-account'/>;

    }
  };

  renderRegisterStatus = () => {
    return (localStorage.getItem("registerStatus") === "success")
      ? (<h5 className="text-success">Registro completado con exito!</h5>)
      : null
  };

  componentWillUnmount() {
    console.log("xd");
    localStorage.removeItem("registerStatus");
  }

  renderEmailError = () => {
    return (this.state.errors.email) && <h6 className="text-danger">Invalid email!</h6>
  };
  renderPasswordError = () => {
    return (this.state.errors.password) && <h6 className="text-danger">Password must be 6 characters or more</h6>
  };

  renderLoginResponse = () =>{
      return <h6 className="text-danger">{this.state.loginResponse}</h6>;
  };

  render() {
    return (
      <div className='login'>
        <h4>Ingrese a Mundo Acqua</h4>
        <hr/>
        {this.renderRegisterStatus()}
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Correo electronico</Form.Label>
            <Form.Control
              id='email'
              type='email'
              placeholder='Email'
              autoFocus
              autoComplete='on'
              onChange={this.handleChange}/>
            {this.renderEmailError()}
          </Form.Group>
          <Form.Group>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              id='password'
              type='password'
              placeholder='Contraseña'
              autoComplete='on'
              onChange={this.handleChange}/>
          </Form.Group>
          {this.renderPasswordError()}
            {this.renderLoginResponse()}
            <Row>
            <Button type='submit'>Ingresar</Button>
          </Row>

        </Form>
        {this.renderRedirect()}
      </div>
    );
  }

}

Login = connect()(Login);

export default Login;
