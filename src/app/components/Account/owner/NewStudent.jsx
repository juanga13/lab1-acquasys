import React, {Component} from 'react';
import {Button, Form, Row, Col, Dropdown} from 'react-bootstrap';
import ReactModal from 'react-modal';

class NewStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: { 
        email: false, password: false, name: false, surname: false,
        dni: false, sex: false, birthday: false, address: false, phoneNumber: false,
        avatartUrl: false, fatherName: false, fatherSurname: false,
        fatherPhoneNumber: false, fatherEmail: false, motherName: false, 
        motherSurname: false, motherPhoneNumber: false, motherEmail: false,
        socialPlan: false, affiliateNumber: false    
      },
      token: this.props.token,
      isModalOpen: false,
      email: '', password: '', name: '', surname: '',
      // additional data (optional)
      optionalData: true,  // only upload if this is true
      formPage: 1,
      dni: -1, sex: '', birthday: '', address: '', phoneNumber: -1,
      avatartUrl: '', fatherName: '', fatherSurname: '',
      fatherPhoneNumber: -1, fatherEmail: '', motherName: '', 
      motherSurname: '', motherPhoneNumber: -1, motherEmail: '',
      socialPlan: '', affiliateNumber: -1
    }
  }

  handleAddStudent = event => {
    event.preventDefault();
    this.setState({ isModalOpen: true });
  };

  cancelModal = () => {
    this.setState({
      isModalOpen: false,
      email: '', password: '', name: '', surname: '',
      dni: -1, sex: '', birthday: '', address: '',
      phoneNumber: -1, avatartUrl: '', socialPlan: '', affiliateNumber: -1,
      fatherName: '', fatherSurname: '',
      fatherPhoneNumber: -1, fatherEmail: '', motherName: '', motherSurname: '',
      motherPhoneNumber: -1, motherEmail: ''
    })
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({ [event.target.id]: event.target.value });
  };

  validateInputs() {
    console.log("current state: " + this.state.email);
    const email = this.state.email; const password = this.state.password;
    const name = this.state.name; const surname = this.state.surname;
    const dni = this.state.surname; const sex = this.state.surname;
    const birthday = this.state.surname; const address = this.state.surname;
    const phoneNumber = this.state.surname; const avatartUrl = this.state.surname;
    const fatherName = this.state.surname; const fatherSurname = this.state.surname;
    const fatherPhoneNumber = this.state.surname; const fatherEmail = this.state.surname;
    const motherName = this.state.surname; const motherSurname = this.state.surname;
    const motherPhoneNumber = this.state.surname; const motherEmail = this.state.surname;
    const socialPlan = this.state.surname; const affiliateNumber = this.state.surname;
    if (this.state.optionalData) {
      this.setState({ errors: {
        email: (email.length === 0 ||
          !email.includes("@") ||
          !email.includes(".")), password: (password.length < 6),
        name: (name.length === 0), surname: (surname.length === 0),
        dni: (dni === -1), sex: (sex === ""),
        birthday: (birthday === ""), address: (address === ""),
        phoneNumber: (phoneNumber === -1), avatartUrl: (avatartUrl === ""),
        fatherName: (fatherName === ""), fatherSurname: (fatherSurname === ""),
        fatherPhoneNumber: (fatherPhoneNumber === -1), fatherEmail: (fatherEmail === ""),
        motherName: (motherName === ""), motherSurname: (motherSurname === ""),
        motherPhoneNumber: (motherPhoneNumber === -1), motherEmail: (motherEmail === ""),
        socialPlan: (socialPlan === ""), affiliateNumber: (affiliateNumber === -1),
      }});
      return (
        (name.length === 0) || (surname.length === 0)
        || (dni === -1) || (sex === "")
        || (birthday === "") || (address === "")
        || (phoneNumber === -1) || (avatartUrl === "")
        || (fatherName === "") || (fatherSurname === "")
        || (fatherPhoneNumber === -1) || (fatherEmail === "")
        || (motherName === "") || (motherSurname === "")
        || (motherPhoneNumber === -1) || (motherEmail === "")
        || (socialPlan === "") || (affiliateNumber === -1)
      );
    } else {
      this.setState({
        errors: {
          email: (email.length === 0 ||
            !email.includes("@") ||
            !email.includes(".")),
          password: (password.length < 6), name: (name.length === 0),
          surname: (surname.length === 0)
        }
      });
      return (
        (name.length === 0) || (surname.length === 0)
        || (dni === -1) || (sex === "")
        || (birthday === "") || (address === "")
        || (phoneNumber === -1) || (avatartUrl === "")
      );
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.validateInputs()) {
      event.stopPropagation();
      return;
    }
    
    let data = {};
    if (this.state.optionalData) {
      data = {
        email: this.state.email, password: this.state.password,
        name: this.state.name, surname: this.state.surname,
        dni: this.state.dni, sex: this.state.sex,
        birthday: this.state.birthday, address: this.state.address,
        phoneNumber: this.state.phoneNumber, avatartUrl: this.state.avatartUrl,
        fatherName: this.state.fatherName, fatherSurname: this.state.fatherSurname,
        fatherPhoneNumber: this.state.fatherPhoneNumber, fatherEmail: this.state.fatherEmail,
        motherName: this.state.motherName, motherSurname: this.state.motherSurname,
        motherPhoneNumber: this.state.motherPhoneNumber, motherEmail: this.state.motherEmail,
        socialPlan: this.state.socialPlan, affiliateNumber: this.state.affiliateNumber
      }
    } else {
      data = {email: this.state.email, password: this.state.password,
        name: this.state.name, surname: this.state.surname};
    }

    console.log("token: " + this.state.token);
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

  handleSexChange = newSex => {
    this.setState({sex: newSex});
  };

  handleCheckbox = event => {
    event.preventDefault();
    console.log("previous optionalData was " + this.state.optionalData);
    this.setState({optionalData: !this.state.optionalData});
  };

  renderFormNavbar = () => {
    return (this.state.optionalData) && (
      <Row>
        <Button onClick={() => (this.setState({formPage: 1}))}>1</Button>
        <Button onClick={() => (this.setState({formPage: 2}))}>2</Button>
      </Row>
    ) 
  };

  renderFormPages = () => {
    if (this.state.formPage === 1) {
      return (
        <Form>
          <h4>Datos personales</h4>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              id="email"
              type="email"
              placeholder="Email"
              onChange={this.handleChange}
            />
            {(this.state.errors.email) && <h6 className="text-danger">Email invalido</h6>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Contrasena</Form.Label>
            <Form.Control
              id="password"
              type="password"
              onChange={this.handleChange}
            />
            {(this.state.errors.password) && <h6 className="text-danger">Contrasena invalida</h6>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              id="name"
              type="name"
              placeholder="Nombre"
              onChange={this.handleChange}
            />
            {(this.state.errors.name) && <h6 className="text-danger">Nombre invalido</h6>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              id="surname"
              type="name"
              placeholder="Apellido"
              onChange={this.handleChange}
            />
            {(this.state.errors.surname) && <h6 className="text-danger">Apellido invalido</h6>}
          </Form.Group>
          <Form.Group>
            <Form.Label>DNI</Form.Label>
            <Form.Control
              id="dni"
              type="name"
              onChange={this.handleChange}
            />
            {(this.state.errors.dni) && <h6 className="text-danger">DNI invalido</h6>}
          </Form.Group>
          <Form.Group>
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
            {(this.state.errors.sex) && <h6 className="text-danger">Sexo invalido</h6>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control
              id="birthday"
              type="name"
              onChange={this.handleChange}
            />
            {(this.state.errors.birthday) && <h6 className="text-danger">Fecha de nacmimiento invalido</h6>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Direccion</Form.Label>
            <Form.Control
              id="address"
              type="name"
              onChange={this.handleChange}
            />
            {(this.state.errors.address) && <h6 className="text-danger">Direccion invalida</h6>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              id="phoneNumber"
              type="name"
              onChange={this.handleChange}
            />
            {(this.state.errors.phoneNumber) && <h6 className="text-danger">Telefono invalido</h6>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Foto de perfil</Form.Label>
            <Form.Control
              id="avatarURL"
              type="name"
              onChange={this.handleChange}
            />
            {(this.state.errors.avatartUrl) && <h6 className="text-danger">URL invalido</h6>}
          </Form.Group>
        </Form>
      );
    } else if (this.state.formPage === 2) {
      return (
        <Form>
          <Row>
            <h4>Padre</h4>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                id="fatherName"
                type="name"
                onChange={this.handleChange}
              />
              {(this.state.errors.fatherName) && <h6 className="text-danger">Nombre invalido</h6>}
            </Form.Group>
            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                id="fatherSurname"
                type="name"
                onChange={this.handleChange}
              />
              {(this.state.errors.fatherSurname) && <h6 className="text-danger">Apellido invalido</h6>}
            </Form.Group>
            <Form.Group>
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                id="fatherPhoneNumber"
                type="name"
                onChange={this.handleChange}
              />
              {(this.state.errors.fatherPhoneNumber) && <h6 className="text-danger">Telefono invalido</h6>}
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                id="fatherEmail"
                type="name"
                onChange={this.handleChange}
              />
              {(this.state.errors.fatherEmail) && <h6 className="text-danger">Email invalido</h6>}
            </Form.Group>
          </Row>
          <Row>
            <h4>Madre</h4>
            <Form.Group>
              <Form.Control
                id="motherName"
                type="name"
                onChange={this.handleChange}
              />
              {(this.state.errors.motherName) && <h6 className="text-danger">Nombre invalido</h6>}
            </Form.Group>
            <Form.Group>
              <Form.Control
                id="motherSurname"
                type="name"
                onChange={this.handleChange}
              />
              {(this.state.errors.motherSurname) && <h6 className="text-danger">Apellido invalido</h6>}
            </Form.Group>
            <Form.Group>
              <Form.Control
                id="motherPhoneNumber"
                type="name"
                onChange={this.handleChange}
              />
              {(this.state.errors.motherPhoneNumber) && <h6 className="text-danger">Telefono invalido</h6>}
            </Form.Group>
            <Form.Group>
              <Form.Control
                id="motherEmail"
                type="name"
                onChange={this.handleChange}
              />
              {(this.state.errors.motherEmail) && <h6 className="text-danger">Email invalido</h6>}
            </Form.Group>
          </Row>
        </Form>
      );
    }
  };

  render() {
    return (
      <div>
        <h2>Alumnos</h2>
        {this.renderNotification()}
        <Button onClick={this.handleAddStudent}>Agregar un nuevo alumno</Button>
        <ReactModal
          className="modal-form-2"
          isOpen={this.state.isModalOpen}
          onRequestClose={this.cancelModal}
          contentLabel="Add teacher modal"
        >
          <Row>
            {this.renderFormNavbar()}
            <Button onClick={this.handleSubmit}>Aceptar</Button>
          </Row>
          <Form.Check onChange={this.handleCheckbox}/>
          <Form>

          </Form>
          {this.renderFormPages()}
        </ReactModal>
      </div>
    );
  }
}

export default NewStudent;