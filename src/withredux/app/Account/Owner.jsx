import React, {Component} from 'react';
import AddModal from './owner/AddModal';

import {Button, Row} from 'react-bootstrap';
// import Modal from 'react-modal';
import '../../css/account-owner.css';

const type = {
  STUDENT: "student",
  TEACHER: "teacher",
  CLASS: "class",
}

class Owner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      showModal: type.STUDENT,
    };
  };

  handleModal = (event) => {
    event.preventDefault();
    const type = event.target.id;
    console.log(event.target.id);
    if (type === "addStudent") this.setState({isModalOpen: true, showModal: type.STUDENT});
    else if (type === "addTeacher") this.setState({isModalOpen: true, showModal: type.TEACHER});
    else if (type === "addClass") this.setState({isModalOpen: true, showModal: type.CLASS});
    else console.log("error on handle modal");
    console.log(this.state.isModalOpen);
  }

  handleCloseModal = event => {
    event.preventDefault();
    this.setState({isModalOpen: false});
  }

  render() {
    return (
      <div className="account-owner-container">
        <div className="button-container">
          <Button id="addStudent" onClick={this.handleModal}>Crear un nuevo alumno</Button>
          <Button id="addTeacher" onClick={this.handleModal}>Crear un nuevo profesor</Button>
          <Button id="addClass" onClick={this.handleModal}>Crear una nueva clase</Button>
        </div>
        <Row className="container-lists">
          <div className="list-container">
            <input
              // id="students"
              placeholder="Filtrar alumnos"
              onChange={() => this.handleSearchChange(type.STUDENT)}
            >
            </input>
            <h3>lista de alumnos</h3>
            <h5>alumno 1</h5>
            <h5>alumno 1</h5>
          </div>
          <div className="list-container">
            <h3>lista de profesores</h3>
            <h5>alumno 1</h5>
            <h5>alumno 1</h5>
          </div>
          <div className="list-container">
            <h3>lista de clases</h3>
            <h5>alumno 1</h5>
            <h5>alumno 1</h5>
          </div>
        </Row>

        <AddModal
          onCloseModal={this.handleCloseModal}
          isOpen={this.state.isModalOpen}
        />
      </div>
    );
  }
}

export default Owner;