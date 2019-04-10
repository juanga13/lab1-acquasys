import React, {Component} from 'react';
import {Form, Row, Col, Button} from "react-bootstrap";
import {HashRouter as Router, Route, NavLink} from 'react-router-dom';
import './register.css';
import Pagination from "react-bootstrap/Pagination";

export default class Register extends Component {
  constructor(props) {
    super(props);

    // default values so that does not break on first time
    this.state = {
      active: 1,
      data: {
        username: "juanga13",
        password: "",
        name: "",
        surname: "",
        address: "",
        email: "",
        sex: "",
        phoneNumber: "",
        birthday: "",
        avatarUrl: "",
        dni: "",
        socialPlan: "",
        affiliateNumber: "",
        fatherName: "",
        fatherSurname: "",
        fatherPhoneNumber: "",
        fatherEmail: "",
        motherName: "",
        motherSurname: "",
        motherPhoneNumber: "",
        motherEmail: ""
      }
    };
  }

  postData(url: '', data= {}) {
    return fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {"Content-Type": "application/json"},
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(data),
    })
      .then(response => console.log(response.ok))
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    this.postData('http://172.22.41.200:8080/api/user/register', this.state.data);
  };

  handleChange = event => {
    event.preventDefault();
    console.log(event.target);
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  renderFirstPage = () => {
    return(
      <div className={"register-page-sub"}>
        <h3>First Register Page</h3>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column>Nombre de usuario</Form.Label>
            <Col><Form.Control value={this.state.username}
                               id="username"
                               type="name"
                               placeholder="Nombre de usuario"
                               onChange={this.handleChange}/></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Contraseña</Form.Label>
            <Col><Form.Control value={this.state.password}
                               id="password"
                               type="password"
                               placeholder="Contraseña"
                               onChange={this.handleChange}/></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Nombre</Form.Label>
            <Col><Form.Control value={this.state.name}
                               id="name"
                               type="name"
                               placeholder="Nombre"
                               onChange={this.handleChange}/></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Apellido</Form.Label>
            <Col><Form.Control value={this.state.surname}
                               id="surname"
                               type="name"
                               placeholder="Apellido"
                               onChange={this.handleChange}/></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Direccion</Form.Label>
            <Col><Form.Control value={this.state.address}
                               id="address"
                               type="name"
                               placeholder="Direccion"
                               onChange={this.handleChange}/></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>E-mail</Form.Label>
            <Col><Form.Control value={this.state.email}
                               id="email"
                               type="email"
                               placeholder="E-mail"
                               onChange={this.handleChange}/></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Sexo</Form.Label>
            <Col><Form.Control id="sex"
                               as="select"
                               type="password"
                               placeholder="Contraseña"
                               onChange={this.handleChange}>
              <option>Masculino</option>
              <option>Femenino</option>
            </Form.Control></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Telefono</Form.Label>
            <Col><Form.Control value={this.state.phoneNumber}
                               id="phoneNumber"
                               type="number"
                               placeholder="Telefono"
                               onChange={this.handleChange}/></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Fecha de nacimiento</Form.Label>
            <Col><Form.Control value={this.state.birthday}
                               id="birthday"
                               type="name"
                               placeholder="Fecha de nacimiento"
                               onChange={this.handleChange}/></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Foto de perfil</Form.Label>
            <Col><Form.Control value={this.state.avatarUrl}
                               id="avatarUrl"
                               type="name"
                               placeholder="Foto de perfil"
                               onChange={this.handleChange}/></Col>
            <Col><Button>Seleccionar</Button></Col>
          </Form.Group>
        </Form>
      </div>
    );
  };

  renderSecondPage = () => {
    return(
      <div className={"register-page-sub"}>
        <h3>Second Register Page</h3>
        <Form.Group as={Row}>
          <Form.Label column>DNI</Form.Label>
          <Col><Form.Control value={this.state.dni}
                             id="dni"
                             type="number"
                             placeholder="DNI"
                             onChange={this.handleChange}/></Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column>Obra Social</Form.Label>
          <Col><Form.Control value={this.state.socialPlan}
                             id="socialPlan"
                             type="name"
                             placeholder="Obra Social"
                             onChange={this.handleChange}/></Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column>Numero de afiliado</Form.Label>
          <Col><Form.Control value={this.state.affiliateNumber}
                             id="affiliateNumber"
                             type="number"
                             placeholder="Numero de afiliado"
                             onChange={this.handleChange}/></Col>
        </Form.Group>

      </div>
    );
  };

  renderThirdPage = () => {
    return(
      <div className={"register-page-sub"}>
        <h3>Third Register Page</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Row}>
            <Form.Label column>Nombre del padre</Form.Label>
            <Col><Form.Control value={this.state.fatherName}
                               id="fatherName"
                               type="name"
                               placeholder="Nombre del padre"
                               onChange={this.handleChange}/></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Apellido del padre</Form.Label>
            <Col><Form.Control value={this.state.fatherSurname}
                               id="fatherSurname"
                               type="name"
                               placeholder="Nombre del padre"
                               onChange={this.handleChange}/></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Telefono del padre</Form.Label>
            <Col><Form.Control value={this.state.fatherPhoneNumber}
                               id="fatherPhoneNumber"
                               type="number"
                               placeholder="Telefono del padre"
                               onChange={this.handleChange}/></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>E-mail del padre</Form.Label>
            <Col><Form.Control value={this.state.fatherEmail}
                               id="fatherEmail"
                               type="email"
                               placeholder="E-mail del padre"
                               onChange={this.handleChange}/></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Nombre de la Madre</Form.Label>
            <Col><Form.Control value={this.state.motherName}
                               id="motherName"
                               type="name"
                               placeholder="Nombre de la madre"
                               onChange={this.handleChange}/></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Apellido de la Madre</Form.Label>
            <Col><Form.Control value={this.state.motherSurname}
                               id="motherSurname"
                               type="name"
                               placeholder="Apellido de la madre"
                               onChange={this.handleChange}/></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Telefono de la madre</Form.Label>
            <Col><Form.Control value={this.state.motherPhoneNumber}
                               id="motherPhoneNumber"
                               type="number"
                               placeholder="Telefono de la madre"
                               onChange={this.handleChange}/></Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>E-mail de la madre</Form.Label>
            <Col><Form.Control value={this.state.motherEmail}
                               id="motherEmail"
                               type="email"
                               placeholder="E-mail de la madre"
                               onChange={this.handleChange}/></Col>
          </Form.Group>
          <Button type="submit">Registrarse</Button>
        </Form>
      </div>
    );
  };

  /**
   * renders pagination buttons which have an active state
   *
   * @returns {Array} of NavLinks
   */
  renderPaginationItems = () => {
    let items = [];
    for (let number = 1; number <= 3; number++) {
      items.push(
        <NavLink className={"btn btn-info outline-none navlink-pagination"}
                 to={"/register/" + number}
                 active={number === this.state.active}>
          {number}
        </NavLink>
      );
    }
    return items;
  };

  /**
   *
   * @returns html
   */
  render() {
    return(
      <div className={"register-page"}>
        <Router>
          <h2>REGISTER PAGE</h2>
          <Pagination>
            {this.renderPaginationItems()}
          </Pagination>
          <hr className={"separator"}/>
          <div>
            <Route path="/register/1" component={this.renderFirstPage}/>
            <Route path="/register/2" component={this.renderSecondPage}/>
            <Route path="/register/3" component={this.renderThirdPage}/>
          </div>
        </Router>
      </div>

    );
  };
}