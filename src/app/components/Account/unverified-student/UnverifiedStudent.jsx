import React, {Component} from 'react';
import {Button, Form, Row, Col} from "react-bootstrap";
import '../../../css/unverified-student.css';
import ReactModal from 'react-modal';
import '../../../css/modal-form.css';
import store from "../../../store";
import {setTokenData} from "../../../actions";

class UnverifiedStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      CRPage: 1,  // 1, 2 or 3

      errors: {
        dni: false,
        sex: false,
        birthday: false,
        address: false,
        phoneNumber: false,
        avatartUrl: false,
        fatherName: false,
        fatherSurname: false,
        fatherPhoneNumber: false,
        fatherEmail: false,
        motherName: false,
        motherSurname: false,
        motherPhoneNumber: false,
        motherEmail: false,
        socialPlan: false,
        affiliateNumber: false
      },
      // default values
      dni: -1,
      sex: true,
      birthday: '',
      address: '',
      phoneNumber: -1,
      avatartUrl: '',
      fatherName: '',
      fatherSurname: '',
      fatherPhoneNumber: -1,
      fatherEmail: '',
      motherName: '',
      motherSurname: '',
      motherPhoneNumber: -1,
      motherEmail: '',
      socialPlan: '',
      affiliateNumber: -1
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

  handleCRPageChange = page => {
    this.setState({CRPage: page});
  };

  handleCRPagePrevious = event => {
    event.preventDefault();
    this.setState({CRPage: this.state.CRPage - 1});
  };

  handleCRPageNext = event => {
    event.preventDefault();
    this.setState({CRPage: this.state.CRPage + 1});
  };

  renderCRFormPage = () => {
    const page = this.state.CRPage;
    {/*private Integer dni;*/}
    {/*private String sex;*/}
    {/*  private String birthday;*/}
    {/*  private String address;*/}
    {/*private String phoneNumber;*/}
    {/*private String avatarUrl;*/}
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
    if (page === 1) {
      return (<div>
        <h1>Primer Pagina</h1>
        <Form as={Col}>
          <Form.Group as={Row}>
            <Form.Label column>DNI</Form.Label>
            <Col><Form.Control
              id="dni"
              type="number"
              autoFocus
              placeholder="dni"
              className={(this.state.errors.dni) && "border border-danger"}
              onChange={this.handleChange}
            /></Col>
            {/*{this.renderDNError()}*/}
          </Form.Group>
        </Form>
      </div>)
    } else if (page === 2) {
      return (<div>
        <h1>Segunda Pagina</h1>
      </div>)
    } else if (page === 3) {
      return (<div>
        <h1>Tercera Pagina</h1>
      </div>)
    }
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
          <div>
            {(this.state.CRPage !== 1)
              ? <Button onClick={this.handleCRPagePrevious}>Anterior</Button> : null}
            {(this.state.CRPage !== 3)
              ? <Button onClick={this.handleCRPageNext}>Siguiente</Button> : null}
          </div>
          {this.renderCRFormPage()}
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