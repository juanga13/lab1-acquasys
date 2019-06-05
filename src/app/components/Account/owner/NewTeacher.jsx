import React, { Component } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import ReactModal from 'react-modal';
import '../../../css/modal-form.css'
import RequestManager from '../../../network/RequestManager';

class NewTeacher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: localStorage.getItem("token"),
      
      teachers: null,
      loadedTeachers: false,
      registerSuccess: false,
      editSuccess: false,
      deleteSuccess: false,
      
      isModalOpen: false,
      showEditModal: false,
      editCUIL: '',
      showDeleteModal: false,
      deleteCUIL: '',

      errors: {
        email: false,
        password: false,
        name: false,
        surname: false,
        cuil: false,
      },
      id: null,
      email: "",
      password: "",
      name: "",
      surname: "",
      cuil: '',
    }
  }

  componentDidMount() {
    fetch(RequestManager.baseUrl + "/api/teacher/all", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.state.token
      },
      redirect: "follow",
      referrer: "no-referrer",
    })
      .then(response => {
        return response.json()
      }).then(teachers => {
        this.setState({ teachers: teachers, loadedTeachers: true });
      })
  };

  handleAddTeacher = event => {
    event.preventDefault();
    this.resetSuccessBools();
    this.setState({ isModalOpen: true });
  };

  cancelModal = () => {
    this.setState({
      isModalOpen: false,
      email: '',
      password: '',
      name: '',
      surname: '',
      cuil: '',
    })
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({ [event.target.id]: event.target.value });
  };

  validateInputs() {
    // console.log("current state: " + this.state.email);
    const email = this.state.email;
    const password = this.state.password;
    const name = this.state.name;
    const surname = this.state.surname;
    const cuil = this.state.cuil;
    this.setState({
      errors: {
        email: (email.length === 0 ||
          !email.includes("@") ||
          !email.includes(".")),
        password: (password.length < 6),
        name: (name.length === 0),
        surname: (surname.length === 0),
        cuil: (cuil.length === 0)
      }
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.validateInputs();
    if (this.state.errors.email || this.state.errors.password ||
      this.state.errors.name || this.state.errors.surname 
      || this.state.errors.cuil) {
      event.stopPropagation();
      return;
    }

    const data = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      surname: this.state.surname,
      cuil: this.state.cuil
    };

    // console.log("token: " + this.state.token);
    (this.state.id)
    ? (fetch(RequestManager.baseUrl + '/api/teacher/update', {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers:
      {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.state.token
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          console.log(response);
          this.setState({ editSuccess: true });
        } else {
          console.log(response);
        }
      })
      .catch(error => {
        console.log("Error: " + error)
    }))
    : (fetch(RequestManager.baseUrl + "/api/admin/createTeacher", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers:
      {
        "Content-Type": "application/json",
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
    }));
  };

  resetSuccessBools = () => {
    this.setState({registerSuccess: false, editSuccess: false, deleteSuccess: false});
  };

  handleEditTeacher = teacher => {
    // event.preventDefault();
    this.resetSuccessBools();
    this.setState({
      id: teacher.id,
      email: teacher.email,
      password: '',
      name: teacher.name,
      surname: teacher.surname,
      cuil: teacher.cuil,

      editTeacher: teacher,
      isModalOpen: true,
    });
  };

  handleDeleteTeacher = teacher => {
    // event.preventDefault();
    this.resetSuccessBools();
    fetch(RequestManager.baseUrl + "/api/teacher/delete/" + teacher.id, {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers:
        {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.state.token
        },
        redirect: "follow",
        referrer: "no-referrer",
    })
        .then(response => {
            if (response.status === 200) {
                this.setState({ deleteSuccess: true })
            }
        }).then(x => {
            this.componentDidMount(); // Geteame la lista denuevo jajajajajaja
            // TODO: no seas negro facundo sacalo a manopla de la lista en vez de traer todo de nuevo JAJAJAJAJA
            //PD: BiCONeee!
        })
  };

  renderNotification = () => {
    if (this.state.registerSuccess) {
      return <h6 className="text-success">Nuevo profesor registrado correctamente</h6>;
    }
    if (this.state.editSuccess) {
      return <h6 className="text-success">Profesor editado correctamente</h6>;
    }
    if (this.state.deleteSuccess) {
      return <h6 className="text-success">Profesor eliminado correctamente</h6>;
    }
  };

  renderTeachers = () => {
    const teachers = this.state.teachers;
    // console.log(this.state.loadedTeachers + " xd " + teachers);
    if (this.state.loadedTeachers) {
      return (
        <div>
          <Row>
            <h6 className='p-2 m-auto'>Nombre</h6>
            <h6 className='p-2 m-auto'>Apellido</h6>
            <h6 className='p-2 m-auto'>CUIL</h6>
          </Row>
          {(teachers) ? teachers.map((teacher) => (
            <Row id={teacher.id}>
              <h6 className='p-2 m-auto'>{teacher.name}</h6>
              <h6 className='p-2 m-auto'>{teacher.surname}</h6>
              <h6 className='p-2 m-auto'>{teacher.cuil}</h6>
              <Button 
                className='btn btn-secondary p-2 m-auto' 
                onClick={() => this.handleEditTeacher(teacher)}>Editar</Button>
              <Button
                className='btn btn-danger p-2 m-auto' 
                onClick={() => this.handleDeleteTeacher(teacher)}>Eliminar</Button>
            </Row>))
            : <h5>Lista vacia!</h5>}
        </div>
      );
    } else return <h5>Cargando...</h5>;
  };

  render() {
    return (
      <div>
        <h2>Profesores</h2>
        {this.renderNotification()}
        <Button onClick={this.handleAddTeacher}>Agregar nuevo profesor</Button>
        {this.renderTeachers()}

        <ReactModal
          className="modal-form"
          isOpen={this.state.isModalOpen}
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
            {(this.state.errors.email) && <h6 className="text-danger">Email invalido</h6>}
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
            {(this.state.errors.password) && <h6 className="text-danger">Contrasena invalida</h6>}
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
            {(this.state.errors.name) && <h6 className="text-danger">Nombre invalido</h6>}
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
            {(this.state.errors.surname) && <h6 className="text-danger">Apellido invalido</h6>}
            <Form.Group>
              <Form.Label>CUIL</Form.Label>
              <Form.Control
                id="cuil"
                type="name"
                placeholder="CUIL"
                className={(this.state.errors.cuil) && "border border-danger"}
                onChange={this.handleChange}
              />
            </Form.Group>
            {(this.state.errors.cuil) && <h6 className="text-danger">Apellido invalido</h6>}
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