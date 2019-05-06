import React, {Component} from 'react';

import {Button} from 'react-bootstrap';
// import Modal from 'react-modal';

const popup = {
  NEW_STUDENT: "new_student",
  NEW_TEACHER: "new_teacher",
  NEW_CLASS: "new_class",
}

class Owner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      showModal: popup.STUDENT,
    };
  };

  addStudentPopup = event => {
    event.preventDefault();
    console.log("e");
    this.setState({isModalOpen: true, showModal: popup.NEW_STUDENT});
  };

  addTeacherPopup = event => {
    event.preventDefault();
    this.setState({isModalOpen: true, showModal: popup.NEW_TEACHER});
  };

  addClassPopup = event => {
    event.preventDefault();
    this.setState({isModalOpen: true, showModal: popup.NEW_CLASS});
  };
  
  closeModal = event => {
    event.preventDefault();
    this.setState({isModalOpen: false})
  };

  render() {
    return (
      <div>
        <ul>
          <li>Crear Alumno</li>
          <li>Crear Profesor</li>
          <li>Creat Clase</li>
          <li>--------------</li>
          <li>Lista de alumnos (todos)</li>
          <li>    - Clases</li>
          <li>    - Asistencias</li>
          <li>Lista de profesores</li>
          <li>Lista de clases</li>
          <li>  - Lista de alumnos (parcial)</li>
          <li>---------------</li>
          <li>Calendario</li>
          <li>Mensajeria</li>
        </ul>
        <div className="">
          <Button onClick={this.addStudentPopup}>Crear un nuevo alumno</Button>
          <Button onClick={this.addTeacherPopup}>Crear un nuevo profesor</Button>
          <Button onClick={this.addClassPopup}>Crear una nueva clase</Button>
        </div>
        {/* <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          // style={customStyles}
          contentLabel="Example Modal"
        >
 
          <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal> */}
      </div>
    );
  }
}

export default Owner;