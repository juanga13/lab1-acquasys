import React, {Component} from 'react';
import {Button, Form, Row, Col, Dropdown} from "react-bootstrap";
import '../../../css/unregistered-student.css';
import ReactModal from 'react-modal';
import '../../../css/modal-form.css';
import store from "../../../store";
import {setTokenData} from "../../../actions";

class UnverifiedStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      CRPage: 1,  // 1 or 2

      errors: {
        dni: false, sex: false, birthday: false, address: false,
        phoneNumber: false, avatarURL: false, socialPlan: false, affiliateNumber: false,
        fatherName: false, fatherSurname: false, fatherPhoneNumber: false, fatherEmail: false, 
        motherName: false, motherSurname: false, motherPhoneNumber: false, motherEmail: false
      },
      // default values
      dni: -1, sex: "", birthday: '', address: '',
      phoneNumber: -1, avatarURL: '', socialPlan: '', affiliateNumber: -1, 
      fatherName: '', fatherSurname: '', fatherPhoneNumber: -1, fatherEmail: '',
      motherName: '', motherSurname: '',motherPhoneNumber: -1, motherEmail: '',

      responseValid: false,
    }
  }

  validateInputs() {
    const dni = this.state.dni;
    const sex = this.state.sex;
    const birthday = this.state.birthday;
    const address = this.state.address;
    const phoneNumber = this.state.phoneNumber;
    const avatarURL = this.state.avatarURL;
    const socialPlan = this.state.socialPlan;
    const affiliateNumber = this.state.affiliateNumber;
    const fatherName = this.state.fatherName;
    const fatherSurname = this.state.fatherSurname;
    const fatherPhoneNumber = this.state.fatherPhoneNumber;
    const fatherEmail = this.state.fatherEmail;
    const motherName = this.state.motherName;
    const motherSurname = this.state.motherSurname;
    const motherPhoneNumber = this.state.motherPhoneNumber;
    const motherEmail = this.state.motherEmail;
    this.setState({errors: {
      dni: (dni === -1), sex: (sex === ""), birthday: (birthday === ""), 
      address: (address === ""), phoneNumber: (phoneNumber === -1), avatarURL: (avatarURL === ''), 
      socialPlan: (socialPlan === ''), affiliateNumber: (affiliateNumber === -1), 
      fatherName: (fatherName === ''), fatherSurname: (fatherSurname === ''), 
      fatherPhoneNumber: (fatherPhoneNumber === -1), fatherEmail: (fatherEmail === ''),
      motherName: (motherName === ''), motherSurname: (motherSurname === ''), 
      motherPhoneNumber: (motherPhoneNumber === -1), motherEmail: (motherEmail === '')
    }})
    return (
      (dni === -1) || (sex === "") || (birthday === "") 
      || (address === "") || (phoneNumber === -1) || (avatarURL === '') 
      || (socialPlan === '') || (affiliateNumber === -1) 
      || (fatherName === '') || (fatherSurname === '')
      || (fatherPhoneNumber === -1) || (fatherEmail === '')
      || (motherName === '') || (motherSurname === '') 
      || (motherPhoneNumber === -1) || (motherEmail === '')
    )
    
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.validateInputs()) {
      event.stopPropagation();
      return;
    }

    // facu do what you know ;)
    

  };

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

  handleCRPageChange = page => {this.setState({CRPage: page});};
  handleCRPagePrevious = event => {event.preventDefault(); this.setState({CRPage: this.state.CRPage - 1});};
  handleCRPageNext = event => {event.preventDefault(); this.setState({CRPage: this.state.CRPage + 1});};

  handleSexChange = newSex => {
    this.setState({sex: newSex});
  };
  
  renderCRFormPage = () => {
    const page = this.state.CRPage;
    if (page === 1) {
      return (<div>
        <h3>Datos personales</h3>
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
            {(this.state.errors.dni) && <h6 className="text-danger border border-danger">DNI invalido</h6>}
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Sexo</Form.Label>
            <Col><Dropdown
                title={this.state.sex} 
                className={(this.state.errors.sex) && "border border-danger"}
              >
                <Dropdown.Item onClick={() => this.handleSexChange("m")}
                  >Masculino</Dropdown.Item>
                <Dropdown.Item onClick={() => this.handleSexChange("f")}
                  >Femenino</Dropdown.Item>
            </Dropdown></Col>
            {(this.state.errors.sex) && <h6 className="text-danger border border-danger">Sexo invalido</h6>}
          </Form.Group>
          {/* <Form.Group as={Row}>   TODO poner datepicker
            <Form.Label column>Fecha de nacimiento</Form.Label>
            <Col><Form.Control
              id="birthday"
              type="name"
              placeholder="Fecha de nacimiento"
              className={(this.state.errors.dni) && "border border-danger"}
              onChange={this.handleChange}
            /></Col>
            {(this.state.errors.birthday) && <h6 className="text-danger border border-danger">Fecha de nacimiento invalido</h6>}
          </Form.Group> */}
          <Form.Group as={Row}>
            <Form.Label column>Direccion</Form.Label>
            <Col><Form.Control
              id="address"
              type="name"
              placeholder="Direccion"
              className={(this.state.errors.address) && "border border-danger"}
              onChange={this.handleChange}
            /></Col>
            {(this.state.errors.address) && <h6 className="text-danger border border-danger">Direccion invalida</h6>}
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Telefono</Form.Label>
            <Col><Form.Control
              id="phoneNumber"
              type="number"
              placeholder="Telefono"
              className={(this.state.errors.phoneNumber) && "border border-danger"}
              onChange={this.handleChange}
            /></Col>
            {(this.state.errors.phoneNumber) && <h6 className="text-danger border border-danger">Telefono invalido</h6>}
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>avatarURL</Form.Label>
            <Col><Form.Control
              id="avatarURL"
              type="name"
              placeholder="URL"
              className={(this.state.errors.avatartURL) && "border border-danger"}
              onChange={this.handleChange}
            /></Col>
            {(this.state.errors.avatarURL) && <h6 className="text-danger border border-danger">Foto invalida</h6>}
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Plan social</Form.Label>
            <Col><Form.Control
              id="socialPlan"
              type="name"
              placeholder="Plan social"
              className={(this.state.errors.socialPlan) && "border border-danger"}
              onChange={this.handleChange}
            /></Col>
            {(this.state.errors.socialPlan) && <h6 className="text-danger border border-danger">Plan social invalido</h6>}
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Numero de afiliado</Form.Label>
            <Col><Form.Control
              id="affiliateNumber"
              type="number"
              placeholder="Numero"
              className={(this.state.errors.affiliateNumber) && "border border-danger"}
              onChange={this.handleChange}
            /></Col>
            {(this.state.errors.affiliateNumber) && <h6 className="text-danger border border-danger">Numero de afiliado invalido</h6>}
          </Form.Group>
        </Form>
      </div>)
    } else if (page === 2) {
      return (<div>
        <h3>Datos de madre y padre</h3>
        <Form>
          <Row>
            <Col>
              <h4>Padre</h4>
              <Form.Group as={Row}>
                <Form.Label column>Nombre</Form.Label>
                <Col><Form.Control
                  id="fatherName"
                  type="name"
                  autoFocus
                  placeholder="Nombre"
                  className={(this.state.errors.fatherName) && "border border-danger"}
                  onChange={this.handleChange}
                /></Col>
                {(this.state.errors.fatherName) && <h6 className="text-danger border border-danger">Nombre invalido</h6>}
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column>Apellido</Form.Label>
                <Col><Form.Control
                  id="fatherSurname"
                  type="name"
                  placeholder="Apellido"
                  className={(this.state.errors.fatherSurname) && "border border-danger"}
                  onChange={this.handleChange}
                /></Col>
                {(this.state.errors.fatherSurname) && <h6 className="text-danger border border-danger">Apellido invalido</h6>}
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column>Telefono</Form.Label>
                <Col><Form.Control
                  id="fatherPhoneNumber"
                  type="number"
                  placeholder="Telefono"
                  className={(this.state.errors.fatherPhoneNumber) && "border border-danger"}
                  onChange={this.handleChange}
                /></Col>
                {(this.state.errors.fatherPhoneNumber) && <h6 className="text-danger border border-danger">Telefono invalido</h6>}
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column>Email</Form.Label>
                <Col><Form.Control
                  id="fatherEmail"
                  type="name"
                  placeholder="email"
                  className={(this.state.errors.fatherEmail) && "border border-danger"}
                  onChange={this.handleChange}
                /></Col>
                {(this.state.errors.fatherEmail) && <h6 className="text-danger border border-danger">Email invalido</h6>}
              </Form.Group>
            </Col>
            <Col>
              <h4>Padre</h4>
              <Form.Group as={Row}>
                <Form.Label column>Nombre</Form.Label>
                <Col><Form.Control
                  id="motherName"
                  type="name"
                  placeholder="Nombre"
                  className={(this.state.errors.motherName) && "border border-danger"}
                  onChange={this.handleChange}
                /></Col>
                {(this.state.errors.motherName) && <h6 className="text-danger border border-danger">Nombre invalido</h6>}
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column>Apellido</Form.Label>
                <Col><Form.Control
                  id="motherSurname"
                  type="name"
                  placeholder="Apellido"
                  className={(this.state.errors.motherSurname) && "border border-danger"}
                  onChange={this.handleChange}
                /></Col>
                {(this.state.errors.motherSurname) && <h6 className="text-danger border border-danger">Apellido invalido</h6>}
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column>Telefono</Form.Label>
                <Col><Form.Control
                  id="motherPhoneNumber"
                  type="number"
                  placeholder="Telefono"
                  className={(this.state.errors.motherPhoneNumber) && "border border-danger"}
                  onChange={this.handleChange}
                /></Col>
                {(this.state.errors.motherPhoneNumber) && <h6 className="text-danger border border-danger">Telefono invalido</h6>}
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column>Email</Form.Label>
                <Col><Form.Control
                  id="motherEmail"
                  type="name"
                  placeholder="email"
                  className={(this.state.errors.motherEmail) && "border border-danger"}
                  onChange={this.handleChange}
                /></Col>
                {(this.state.errors.motherEmail) && <h6 className="text-danger border border-danger">Email invalido</h6>}
              </Form.Group>
            </Col>
          </Row>
        </Form>
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
          <h6>Informacion: complete el registro paso a paso.</h6>
          <div>
            {(this.state.CRPage !== 1)
              ? <Button onClick={this.handleCRPagePrevious}>Anterior</Button> : null}
            {(this.state.CRPage !== 2)
              ? <Button onClick={this.handleCRPageNext}>Siguiente</Button> : null}
          </div>
          {this.renderCRFormPage()}
          <Button onClick={this.handleSubmit}>Completar</Button>
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