import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import '../../css/unverified-student.css';
import ReactModal from 'react-modal';
import '../../css/modal-form.css';
import store from "../../store";
import {setTokenData} from "../../actions";

class UnverifiedStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    }
  }

  handleModal = event => {
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

  handleLogout = event => {
    event.preventDefault();
    event.preventDefault();
    document.cookie = "token = ;";
    document.cookie = "role = ;";
    store.dispatch(setTokenData(null,null));
    window.location.href = "http://localhost:3000";  // todo redirect to home
  };

  render() {
    return (
      <div className="account-container">
        <h3>Mi cuenta</h3>
        <h5 className='border border-danger unverified-notice'>
          Atencion: su usuario no esta verificado,
          complete sus datos personales.
        </h5>
        <Button className="btn btn-info m-1" onClick={this.handleModal}>Completar registro</Button>
        <Button className="btn btn-secondary m-1" onClick={this.handleLogout}>Desloguearse</Button>
        <ReactModal
          className="modal-form"
          isOpen={this.state.isModalOpen}
          onRequestClose={this.cancelModal}
          contentLabel="Add teacher modal"
        >
          <h4>Informacion: complete el registro paso a paso.</h4>
          {/*<Form>*/}
          {/*  <Form.Group>*/}
          {/*    <Form.Label>Correo Electronico</Form.Label>*/}
          {/*    <Form.Control*/}
          {/*      id="email"*/}
          {/*      type="email"*/}
          {/*      autoFocus*/}
          {/*      placeholder="Email"*/}
          {/*      className={(this.state.errors.email) && "border border-danger"}*/}
          {/*      onChange={this.handleChange}*/}
          {/*    />*/}
          {/*  </Form.Group>*/}
          {/*  {this.renderEmailError()}*/}
          {/*  private String fatherName;*/}
          {/*  private String fatherSurname;*/}
          {/*  private String fatherPhoneNumber;*/}
          {/*  private String fatherEmail;*/}
          {/*  private String motherName;*/}
          {/*  private String motherSurname;*/}
          {/*  private String motherPhoneNumber;*/}
          {/*  private String motherEmail;*/}
          {/*  private String socialPlan;*/}
          {/*  private String affiliateNumber;*/}
          {/*  private String address;*/}
          {/*  private String birthday;*/}
          {/*</Form>*/}
          <Button
            onClick={this.cancelModal}
            className="btn btn-secondary modal-button"
          >Cancelar</Button>
        </ReactModal>

        {/*TEST*/}
        <div className="border border-secondary m-1 p-1">
          <span>Test</span>
          <Button>Verificar</Button>
        </div>
      </div>
    );
  }
}

export default UnverifiedStudent;