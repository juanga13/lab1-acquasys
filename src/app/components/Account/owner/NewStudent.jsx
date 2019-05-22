import React, {Component} from 'react';
import {Button, Form, Row} from 'react-bootstrap';
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
      optionalData: false,  // only upload if this is true
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
  }

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
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({ [event.target.id]: event.target.value });
  }

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
      }})
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
      this.setState({ errors: {
        email: (email.length === 0 ||
          !email.includes("@") ||
          !email.includes(".")),
        password: (password.length < 6),name: (name.length === 0),
        surname: (surname.length === 0)
      }})
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
    
    const data = {};
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
  }
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
  renderDNIError = () => { return (this.state.errors.dni) && <h6 className="text-danger">DNI invalido</h6> }
  renderSexError = () => { return (this.state.errors.sex) && <h6 className="text-danger">Sexo invalido</h6> }
  renderBirthdayError = () => { return (this.state.errors.birthday) && <h6 className="text-danger">Fecha de nacmimiento invalido</h6> }
  renderAddressError = () => { return (this.state.errors.address) && <h6 className="text-danger">Direccion invalida</h6> }
  renderPhoneNumberError = () => { return (this.state.errors.phoneNumber) && <h6 className="text-danger">Telefono invalido</h6> }
  renderAvatarURLError = () => { return (this.state.errors.avatartUrl) && <h6 className="text-danger">URL invalido</h6> }
  renderSocialPlanError = () => { return (this.state.errors.socialPlan) && <h6 className="text-danger">Plan social invalido</h6> }
  renderAffiliateNumberError = () => { return (this.state.errors.affiliateNumber) && <h6 className="text-danger">Numero de afiliado invalido</h6> }
  renderFatherNameError = () => { return (this.state.errors.fatherName) && <h6 className="text-danger">Nombre invalido</h6> }
  renderFatherSurnameError = () => { return (this.state.errors.fatherSurname) && <h6 className="text-danger">Apellido invalido</h6> }
  renderFatherPhoneError = () => { return (this.state.errors.fatherPhoneNumber) && <h6 className="text-danger">Telefono invalido</h6> }
  renderFatherEmailError = () => { return (this.state.errors.fatherEmail) && <h6 className="text-danger">Email invalido</h6> }
  renderMotherNameError = () => { return (this.state.errors.motherName) && <h6 className="text-danger">Nombre invalido</h6> }
  renderMotherSurnameError = () => { return (this.state.errors.motherSurname) && <h6 className="text-danger">Apellido invalido</h6> }
  renderMotherPhoneError = () => { return (this.state.errors.motherPhoneNumber) && <h6 className="text-danger">Telefono invalido</h6> }
  renderMotherEmailError = () => { return (this.state.errors.motherEmail) && <h6 className="text-danger">Email invalido</h6> }
  

  renderFormNavbar = () => {
    return (this.state.optionalData) && (
      <Row>
        <Button></Button>
      </Row>
    ) 
  };

  renderFormPages = () => {
    if (this.state.formPage === 1) {
      
    } else if (this.state.formPage === 2) {}
  };

  render() {
    return (
      <div>
        <h2>Alumnos</h2>
        {this.renderNotification()}
        <Button onClick={this.handleAddStudent}>Agregar un nuevo alumno</Button>
        <ReactModal
          className="modal-form"
          isOpen={this.state.isModalOpen}
          onRequestClose={this.cancelModal}
          contentLabel="Add teacher modal"
        >
          {this.renderFormNavbar()}
          <Form.Check
          
          />
          <Form>

          </Form>
          {this.renderFormPages()}
        </ReactModal>
      </div>
    );
  }
}

export default NewStudent;