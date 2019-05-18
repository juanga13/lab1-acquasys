import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Button, Form, Row } from 'react-bootstrap';
import ReactModal from 'react-modal';
import '../../../css/modal-form.css'
import RequestManager from '../../../network/RequestManager';

class NewTeacher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {
        email: false,
        password: false,
        name: false,
        surname: false
      },
      token: this.props.token,
      isModalOpen: false,
      email: "",  // "Natacion bebes 2"
      password: "",  //  "14:00"
      name: "",  //  "45" en minutos
      surname: ""  // "jueves"  nombres en espaniol, lowercase
    }
  }

  handleAddTeacher = event => {
    event.preventDefault();
    this.setState({ isModalOpen: true });
  };

  cancelModal = () => {
    this.setState({
      isModalOpen: false,
      email: '',
      password: '',
      name: '',
      surname: ''
    })
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({ [event.target.id]: event.target.value });
  };

  validateInputs() {
    console.log("current state: " + this.state.email);
    const email = this.state.email;
    const password = this.state.password;
    const name = this.state.name;
    const surname = this.state.surname;
    this.setState({ errors: {
      email: (email.length === 0 ||
        !email.includes("@") ||
        !email.includes(".")),
      password: (password.length < 6),
      name: (name.length === 0),
      surname: (surname.length === 0)
    }})
  }

  handleSubmit = event => {
    event.preventDefault();
    this.validateInputs();
    if (this.state.errors.email || this.state.errors.password ||
      this.state.errors.name || this.state.errors.surname) {
      event.stopPropagation();
      return;
    }

    const data = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      surname: this.state.surname
    };

    console.log("token: " + this.state.token)
    fetch("http://172.22.44.128:8080/api/admin/createTeacher", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: 
        { "Content-Type": "application/json",
          "Authorization": "Bearer " + this.state.token
        },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          console.log(response);
          this.setState({ registerSuccess: true });
        } else {
          console.log(response);
        }
      })
      .catch(error => {
        console.log("Error: " + error)
      })
  };

  renderNotification = () => {
    if (this.state.registerSuccess) {
      this.setState({ registerSuccess: false });
      return <h6 className="text-success">Nuevo profesor registrado correctamente</h6>;
    }
  };

  renderEmailError = () => { return (this.state.errors.email) && <h6 className="text-danger">Email invalido</h6> }
  renderPasswordError = () => { return (this.state.errors.password) && <h6 className="text-danger">Contrasena invalida</h6> }
  renderNameError = () => { return (this.state.errors.name) && <h6 className="text-danger">Nombre invalido</h6> }
  renderSurnameError = () => { return (this.state.errors.surname) && <h6 className="text-danger">Apellido invalido</h6> }

  render() {
    return (
      <div>
        <h2>Profesores</h2>
        {this.renderNotification()}
        <Button onClick={this.handleAddTeacher}>Agregar nueva clase</Button>
        <ReactModal 
          className="modal-form"
          isOpen={this.state.isModalOpen}
          onRequestClose={this.cancelModal}
          contentLabel="Add teacher modal"
        >
          <Form onSubmit={this.handleSubmit} >
            <Form.Group>
              <Form.Label>Correo Electronico</Form.Label>
              <Form.Control
                id="email"
                type="email"
                autoFocus
                placeholder="Email"
                className={(this.state.errors.email) && "border border-danger"}
                onChange={this.handleChange}
              />
            </Form.Group>
            {this.renderEmailError()}
            <Form.Group>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                id="password"
                type="password"
                placeholder="Contraseña"
                className={(this.state.errors.password) && "border border-danger"}
                onChange={this.handleChange}
              />
            </Form.Group>
            {this.renderPasswordError()}
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                id="name"
                type="name"
                placeholder="Nombre"
                className={(this.state.errors.name) && "border border-danger"}
                onChange={this.handleChange}
              />
            </Form.Group>
            {this.renderNameError()}
            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                id="surname"
                type="name"
                placeholder="Apellido"
                className={(this.state.errors.surname) && "border border-danger"}
                onChange={this.handleChange}
              />
            </Form.Group>
            {this.renderSurnameError()}
            <Row className="modal-form-button-container">
              <Button type="submit">Agregar nuevo profesor</Button>
              <Button
                onClick={this.cancelModal}
                className="btn btn-secondary modal-button"
              >Cancelar</Button>
            </Row>
          </Form>
        </ReactModal>
      </div>
    );
  }
}

const mapStateToProps = state => {return ({token: state.token})};

NewTeacher = connect(mapStateToProps)(NewTeacher);

export default NewTeacher;