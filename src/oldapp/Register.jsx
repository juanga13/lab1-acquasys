import React, {Component} from 'react';
import {HashRouter as Router, Route, NavLink, Redirect} from 'react-router-dom';
import './register.css';
import {Button, Col, Form, Row} from "react-bootstrap";


export default class Register extends Component {
  constructor(props) {
    super(props);
    // default values so that does not break on first time
    this.state = {
      validated: false,
      redirect: false,
      data: {
        email: "",
        password: "",
      }
    };
  }

  postData(url: '', data= {}) {
    let responseStatus;
    fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {"Content-Type": "application/json"},
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(data),
    }).then(response => {
      responseStatus = response.status;
      console.log("responseStatus: " + responseStatus);
      return response;
    }).then(response => {return response.text()})
      .then((text) => {alert(text)});
    return responseStatus;
  };

  handleSubmit = event => {
    console.log(this.state);
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // } else {
    event.preventDefault();
    this.setState({ validated: true });
    if (this.postData('http://172.22.44.128:8080/api/user/register', this.state.data) === 200) {
      this.setState({ redirect: true })
    }
    // }
  };

  /**
   *
   * @param event (Form.Control
   */
  handleChange = event => {
    event.preventDefault();
    this.setState({data: {[event.target.id]: event.target.value}});
    console.log(this.state.data);
  };

  renderRedirect = () => {
    console.log("haro");
    if (this.state.redirect) {
      this.setState({ redirect: false });
      return <Redirect to='/'/>
    }
  };

  /**
   *
   * @returns html
   */
  render() {
    return(
      <div className={"register-box"}>
        <Router>
          <h3>Registro</h3>
          <hr className={"separator"}/>
          <div className={"register-page-sub"}>
            <h4>Datos de usuario</h4>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group as={Row}>
                <Form.Label column>E-mail</Form.Label>
                <Col><Form.Control
                  value={this.state.email}
                  id="email"
                  type="email"
                  placeholder="E-mail"
                  autoFocus
                  onChange={this.handleChange}/></Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column>Contraseña</Form.Label>
                <Col><Form.Control
                  value={this.state.password}
                  id="password"
                  type="password"
                  placeholder="Contraseña"
                  onChange={this.handleChange}/></Col>
              </Form.Group>
              <Button type="submit">Registrarse</Button>
              {this.renderRedirect()}
            </Form>
          </div>
        </Router>
      </div>

    );
  };
}