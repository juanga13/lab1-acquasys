import React, {Component} from 'react';
import AddModal from './owner/AddModal';

import {Button, Row} from 'react-bootstrap';
import '../../css/account-owner.css';

class Owner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      modalType: "xd",
    };
  };

  handleModal = (event) => {
    event.preventDefault();
    const type = event.target.id;
    console.log(event.target.id);
    if (type === "addStudent") this.setState({isOpen: true, modalType: "student"});
    else if (type === "addTeacher") this.setState({isOpen: true, modalType: "teacher"});
    else if (type === "addClass") this.setState({isOpen: true, modalType: "class"});
    else console.log("error on handle modal");
  };

  handleCloseModal = event => {
    event.preventDefault();
    console.log("handle close modal");
    this.setState({isOpen: false});
  };1

  handleSearchChange = event => {
    event.preventDefault();
    // store.dispatch(setNewFilterToListX);
  };



  render() {
    console.log("[Owner] rendering, isOpen? " + this.state.isOpen);
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
              id="students"
              placeholder="Filtrar alumnos"
              // onChange={() => this.handleSearchChange(NEW_STUDENT)}
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
          isOpen={this.state.isOpen}
          onRequestClose={this.handleCloseModal}
          modalType={this.state.modalType}
        />     
      </div>
    );
  }
}

export default Owner;