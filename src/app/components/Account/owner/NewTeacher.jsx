import React, {Component} from 'react';
import {Button, Form, Row} from 'react-bootstrap';
import ReactModal from 'react-modal';
import '../../../css/modal-form.css'

class NewTeacher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {
        name: false,
        startTime: false,
        duration: false,
        day: false    
      },
      isModalOpen: false,
      name: '',  // "Natacion bebes 2"
      startTime: '',  //  "14:00"
      duration: '',  //  "45" en minutos
      day: ''  // "jueves"  nombres en espaniol, lowercase
    }
  }

  handleAddTeacher = event => {
    event.preventDefault();
    this.setState({isModalOpen: true});
  }

  cancelModal = () => {
    this.setState({
      isModalOpen: false,
      name: '',
      startTime: '',
      duration: '',
      day: ''
    })
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({[event.target.id]: event.target.value});
  }

  validateFields() {
    const name = this.state.name;
    const startTime = this.state.startTime;
    const duration = this.state.duration;
    const day = this.state.day;
    this.setState({

    })
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.validateFields()) {
      
    }
  }

  renderEmailError = () => {return (this.state.errors.email) && <h6 className="text-danger">Email invalido</h6>}
  renderPasswordError = () => {return (this.state.errors.password) && <h6 className="text-danger">Contrasena invalida</h6>}
  renderNameError = () => {return (this.state.errors.name) && <h6 className="text-danger">Nombre invalido</h6>}
  renderSurnameError = () => {return (this.state.errors.surname) && <h6 className="text-danger">Apellido invalido</h6>}

  render() {
    return (
      <div>
        <h2>Profesor</h2>
        <Button onClick={this.handleAddTeacher}>Agregar nueva clase</Button>
        <ReactModal className="modal-form"
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
                required
                placeholder="Email"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                id="password"
                type="password"
                required
                placeholder="Contraseña"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                id="name"
                type="name"
                required
                placeholder="Nombre"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                id="surname"
                type="name"
                required
                placeholder="Apellido"
                onChange={this.handleChange}
              />
            </Form.Group>
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

export default NewTeacher;