import React, {Component} from 'react';
import {Button, Form, Row, Col, Dropdown} from 'react-bootstrap';
import ReactModal from 'react-modal';
import RequestManager from "../../../network/RequestManager";

class NewStudent extends Component {
  constructor(props) {
    super(props);

    this.allStudents = [];
    this.allUnverifiedStudents = [];

    this.state = {
      errors: { 
        email: false, password: false, name: false, surname: false,
        dni: false, sex: false, birthday: false, address: false, phoneNumber: false,
        avatarUrl: false, socialPlan: false, affiliateNumber: false,
        fatherName: false, fatherSurname: false,
        fatherPhoneNumber: false, fatherEmail: false, motherName: false, 
        motherSurname: false, motherPhoneNumber: false, motherEmail: false,
      },
      token: localStorage.getItem("token"),
      isModalOpen: false,
      email: '', password: '', name: '', surname: '',
      // additional data (optional)
      optionalData: false,  // only upload if this is true
      formPage: 1,
      dni: -1, sex: '', birthday: '', address: '', phoneNumber: -1,
      avatarUrl: '', socialPlan: '', affiliateNumber: -1,
      fatherName: '', fatherSurname: '',
      fatherPhoneNumber: -1, fatherEmail: '', motherName: '', 
      motherSurname: '', motherPhoneNumber: -1, motherEmail: '',

      waitList1: true,
      waitList2: true,
    }
  }

  componentWillMount() {
    console.log("getting students, token " + localStorage.getItem("token"));
    fetch(RequestManager.baseUrl + "/api/user/student/all", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers:
      { "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      redirect: "follow",
        referrer: "no-referrer",
    })
    .then(response => {
      if (response.ok) {
        response.json()
          .then(body => {this.allStudents = body;})
          .then(() => {
            fetch(RequestManager.baseUrl + "/api/user/unregistered/all", {
              method: "GET",
              mode: "cors",
              cache: "no-cache",
              credentials: "same-origin",
              headers:
                { "Content-Type": "application/json",
                  "Authorization": "Bearer " + localStorage.getItem("token")
                },
              redirect: "follow",
              referrer: "no-referrer",
            }).then(response => {
              if (response.ok) {
                response.json().then(body => {
                  console.log(body);
                  this.allUnverifiedStudents = body;})
                .then(() => {
                  console.log("finished second fetch");
                  this.setState({waitList2: false})
                })
              }
            });
          }).then(() => {
            console.log("finished first fetch");
            this.setState({waitList1: false})
        });
      } else {
        console.log(response);
      }
    })
    .catch(error => {
      console.log("Error: " + error)
    });
  };

  handleAddStudent = event => {
    event.preventDefault();
    this.setState({ isModalOpen: true });
  };

  cancelModal = () => {
    this.setState({
      isModalOpen: false,
      email: '', password: '', name: '', surname: '',
      dni: -1, sex: '', birthday: '', address: '',
      phoneNumber: -1, avatarUrl: '', socialPlan: '', affiliateNumber: -1,
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
    // console.log("current state: " + this.state.email);
    const email = this.state.email; const password = this.state.password;
    const name = this.state.name; const surname = this.state.surname;
    const dni = this.state.dni; const sex = this.state.sex;
    const birthday = this.state.birthday; const address = this.state.address;
    const phoneNumber = this.state.phoneNumber; const avatarUrl = this.state.avatarUrl;
    const fatherName = this.state.fatherName; const fatherSurname = this.state.fatherSurname;
    const fatherPhoneNumber = this.state.fatherPhoneNumber; const fatherEmail = this.state.fatherEmail;
    const motherName = this.state.motherName; const motherSurname = this.state.motherSurname;
    const motherPhoneNumber = this.state.motherPhoneNumber; const motherEmail = this.state.motherEmail;
    const socialPlan = this.state.socialPlan; const affiliateNumber = this.state.affiliateNumber;
    if (this.state.optionalData) {
      this.setState({ errors: {
          email: (email.length === 0 ||
            !email.includes("@") ||
            !email.includes(".")), password: (password.length < 6),
          name: (name.length === 0), surname: (surname.length === 0),
          dni: (dni === -1), sex: (sex === ""),
          birthday: (birthday === ""), address: (address === ""),
          phoneNumber: (phoneNumber === -1), avatarUrl: (avatarUrl === ""),
          socialPlan: (socialPlan === ""), affiliateNumber: (affiliateNumber === -1),
        fatherName: (fatherName === ""), fatherSurname: (fatherSurname === ""),
        fatherPhoneNumber: (fatherPhoneNumber === -1), fatherEmail: (fatherEmail === ""),
        motherName: (motherName === ""), motherSurname: (motherSurname === ""),
        motherPhoneNumber: (motherPhoneNumber === -1), motherEmail: (motherEmail === ""),

      }});
      return (
        (name.length === 0) || (surname.length === 0)
        || (dni === -1) || (sex === "")
        || (birthday === "") || (address === "")
        || (phoneNumber === -1) || (avatarUrl === "")
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
            !email.includes(".")), password: (password.length < 6),
          name: (name.length === 0), surname: (surname.length === 0),
          dni: (dni === -1), sex: (sex === ""),
          birthday: (birthday === ""), address: (address === ""),
          phoneNumber: (phoneNumber === -1), avatarUrl: (avatarUrl === ""),
          socialPlan: (socialPlan === ""), affiliateNumber: (affiliateNumber === -1),
        }
      });
      return (
        (name.length === 0) || (surname.length === 0)
        || (dni === -1) || (sex === "")
        || (birthday === "") || (address === "")
        || (phoneNumber === -1) || (avatarUrl === "")
      );
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.validateInputs()) {
     // event.stopPropagation();
     // return;
    }
    
    let data = {};
    if (this.state.optionalData) {
      data = {
        email: this.state.email, password: this.state.password,
        name: this.state.name, surname: this.state.surname,
        dni: this.state.dni, sex: this.state.sex,
        birthday: this.state.birthday, address: this.state.address,
        phoneNumber: this.state.phoneNumber, avatarUrl: this.state.avatarUrl,
        socialPlan: this.state.socialPlan, affiliateNumber: this.state.affiliateNumber,
        fatherName: this.state.fatherName, fatherSurname: this.state.fatherSurname,
        fatherPhoneNumber: this.state.fatherPhoneNumber, fatherEmail: this.state.fatherEmail,
        motherName: this.state.motherName, motherSurname: this.state.motherSurname,
        motherPhoneNumber: this.state.motherPhoneNumber, motherEmail: this.state.motherEmail,
      }
    } else {
      data = {
        email: this.state.email, password: this.state.password,
        name: this.state.name, surname: this.state.surname,
        dni: this.state.dni, sex: this.state.sex,
        birthday: this.state.birthday, address: this.state.address,
        phoneNumber: this.state.phoneNumber, avatarUrl: this.state.avatarUrl,
        socialPlan: this.state.socialPlan, affiliateNumber: this.state.affiliateNumber,
      };
    }

    fetch(RequestManager.baseUrl + "/api/user/register", {
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
          this.cancelModal();
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
      return <h6 className="text-success">Nuevo alumno registrado correctamente</h6>;
    }
  };

  handleSexChange = newSex => {
    this.setState({sex: newSex});
  };

  renderCheckbox = () => {
    console.log("rendering checkbox: " + this.state.optionalData);
    return ((this.state.optionalData)
      ? <Form.Check checked onChange={this.handleCheckbox}/>
      : <Form.Check onChange={this.handleCheckbox}/>
    );
  };

  handleCheckbox = event => {
    event.stopPropagation();
    const previousOptionalData = this.state.optionalData;
    this.setState({optionalData: !previousOptionalData});
    // Warning: A component is changing an uncontrolled input
    // of type checkbox to be controlled. (what?)
  };

  renderFormNavbar = () => {
    return (
      <div className='new-student-modal-pages'>
        <Button onClick={() => (this.setState({formPage: 1}))}>1</Button>
        <Button onClick={() => (this.setState({formPage: 2}))}>2</Button>
      </div>
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
              id="avatarUrl"
              type="name"
              onChange={this.handleChange}
            />
            {(this.state.errors.avatarUrl) && <h6 className="text-danger">URL invalido</h6>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Obra Social</Form.Label>
            <Form.Control
              id="socialPlan"
              type="name"
              onChange={this.handleChange}
            />
            {(this.state.errors.socialPlan) && <h6 className="text-danger">Obra social invalida</h6>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Numero de afiliado</Form.Label>
            <Form.Control
              id="affiliateNumber"
              type="name"
              onChange={this.handleChange}
            />
            {(this.state.errors.affiliateNumber) && <h6 className="text-danger">Numero de afiliado invalido</h6>}
          </Form.Group>
        </Form>
      );
    } else if (this.state.formPage === 2) {
      return (
        <Form>
          <Row>
            <h6>Incluir datos de padre/madre</h6>
            {this.renderCheckbox()}
          </Row>
          {/*TODO set everything disabled from parent, not each child (disabled=!this.state.optionalData)*/}
          <Row>
            <h4>Padre</h4>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control disabled={!this.state.optionalData}
                id="fatherName"
                type="name"
                onChange={this.handleChange}
              />
              {(this.state.errors.fatherName) && <h6 className="text-danger">Nombre invalido</h6>}
            </Form.Group>
            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control disabled={!this.state.optionalData}
                id="fatherSurname"
                type="name"
                onChange={this.handleChange}
              />
              {(this.state.errors.fatherSurname) && <h6 className="text-danger">Apellido invalido</h6>}
            </Form.Group>
            <Form.Group>
              <Form.Label>Telefono</Form.Label>
              <Form.Control disabled={!this.state.optionalData}
                id="fatherPhoneNumber"
                type="name"
                onChange={this.handleChange}
              />
              {(this.state.errors.fatherPhoneNumber) && <h6 className="text-danger">Telefono invalido</h6>}
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control disabled={!this.state.optionalData}
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
              <Form.Control disabled={!this.state.optionalData}
                id="motherName"
                type="name"
                onChange={this.handleChange}
              />
              {(this.state.errors.motherName) && <h6 className="text-danger">Nombre invalido</h6>}
            </Form.Group>
            <Form.Group>
              <Form.Control disabled={!this.state.optionalData}
                id="motherSurname"
                type="name"
                onChange={this.handleChange}
              />
              {(this.state.errors.motherSurname) && <h6 className="text-danger">Apellido invalido</h6>}
            </Form.Group>
            <Form.Group>
              <Form.Control disabled={!this.state.optionalData}
                id="motherPhoneNumber"
                type="name"
                onChange={this.handleChange}
              />
              {(this.state.errors.motherPhoneNumber) && <h6 className="text-danger">Telefono invalido</h6>}
            </Form.Group>
            <Form.Group>
              <Form.Control disabled={!this.state.optionalData}
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

  showStudent = id => {
    
  };

  deleteStudent = id => {
    fetch(RequestManager.baseUrl + "/api/student/delete/" + id, {
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
          if(response.status === 200){
            this.setState({deleteSuccess: true})
          }
        }).then(x => {
          this.componentWillMount();
      // TODO: no seas negro facundo sacalo a manopla de la lista en vez de traer todo de nuevo JAJAJAJAJA
    })
  };

  renderStudentList = () => {
    // console.log("waitList1: " + this.state.waitList1 + ", waitList2: " + this.state.waitList2);
    if (this.state.waitList1 || this.state.waitList2) return null;

    let result = [];

    this.allStudents.map(obj => {
      result.push(
        <div>
          <h6>{obj.name + ", " + obj.surname}</h6>
          <h6>{obj.dni}</h6>
          <h6>Verificado</h6>
          <Button className='btn btn-primary' onClick={() => this.showStudent(obj.id)}>Ver datos</Button>
          <Button className='btn btn-danger' onClick={() => this.deleteStudent(obj.id)}>Eliminar</Button>
        </div>
      );
    });
    // console.log(this.allUnverifiedStudents);
    this.allUnverifiedStudents.map(obj => {
      result.push(
        <div>
          <h6>{obj.name + ", " + obj.surname}</h6>
          <h6>{obj.dni}</h6>
          <h6>Sin verificar! </h6>
          <Button className='btn btn-primary' onClick={() => this.showStudent(obj.id)}>Ver datos</Button>
          <Button className='btn btn-danger' onClick={() => this.deleteStudent(obj.id)}>Eliminar</Button>
        </div>
      );
    });

    return (
      result
    );
  };

  render() {
    return (
      <div>
        <h2>Alumnos</h2>
        {this.renderNotification()}
        <Button onClick={this.handleAddStudent}>Agregar un nuevo alumno</Button>
        {this.renderStudentList()}
        <ReactModal
          className="modal-form-2"
          isOpen={this.state.isModalOpen}
          contentLabel="Add teacher modal"
        >
          <div className='new-student-modal-buttons'>
            {this.renderFormNavbar()}
            <Button onClick={this.handleSubmit}>Aceptar</Button>
            <Button className='btn btn-secondary' onClick={this.cancelModal}>Cancelar</Button>
          </div>
          {this.renderFormPages()}
        </ReactModal>
      </div>
    );
  }
}

export default NewStudent;
