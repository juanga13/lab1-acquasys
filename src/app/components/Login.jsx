import React, { Component } from 'react';
import { Redirect} from "react-router";
import { connect} from "react-redux";
import store from "../store";
import { setTokenData } from '../actions';
import { Button, Form } from "react-bootstrap";
import RequestManager from "../network/RequestManager";
import '../css/login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.test = {
      role: '',
    };

    this.state = {
      redirect: false,
      loginResponse: null,
      errors: {
        email: false,
        password: false,
      },
      email: '',
      password: '',
    };
  }
  
  validateInputs() {
    const email = this.state.email;
    const password = this.state.password;
    this.setState({errors: {
      email: ((email.length === 0 || 
                !email.includes("@") || 
                !email.includes(".")) 
                  ? true : false),
      password: (password.length < 6),
    }});
  }
 
  handleChange = event => {
    event.preventDefault();
    this.setState({[event.target.id]: event.target.value});
  };

  handleSubmit = event => {
    event.preventDefault();
    this.validateInputs();
    if (this.state.errors.email || this.state.errors.password) {
      event.stopPropagation();
      return;
    }

    // form data is verified, request login to server    
    // TODO pasar metodo xhr para aca
    // let response = RequestManager.getToken(this.state.email, this.state.password)
    
    /**
    if (response.error === "invalid_grant") {
      this.setState({loginReponse: response.error_description})
    }
    if (response.access_token !== undefined) {
      this.setState({waitUserInfo: true});
      RequestManager.getUserInfo(response.access_token)
      .then(function(data) {
        // console.log("NANI");
        // console.log(data);
        store.dispatch(setTokenData(response.access_token,  data.authorities[0]));
      })
      .then(this.setState({redirect: true}));
    } 
     */

    /** test */
    if (this.test.role !== '') {
      console.log("dispatching test token");
      store.dispatch(setTokenData("testToken", this.test.role));
      this.setState({redirect: true});
    }
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      this.setState({ redirect: false });
      return <Redirect exact to='/my-account/new-student'/>
    }
  };

  renderEmailError = () => {return (this.state.errors.email) && <h6 className="text-danger">Invalid email!</h6>}
  renderPasswordError = () => {return (this.state.errors.password) && <h6 className="text-danger">Password must be 6 characters or more</h6>}

  render() {
    return (
      <div className='login'>
        <h5>Ingrese a Mundo Acqua</h5>
        <hr/>
        {/*TODO use Formik to validate data before submitting*/}
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Correo electronico</Form.Label>
            <Form.Control
              id='email'
              type='email'
              placeholder='Email'
              autoFocus
              autoComplete='on'
              onChange={this.handleChange}/>
            {this.renderEmailError()}
          </Form.Group>
          <Form.Group>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              id='password'
              type='password'
              placeholder='Contraseña'
              autoComplete='on'
              onChange={this.handleChange}/>
          </Form.Group>
          {this.renderPasswordError()}
          <Button type='submit'>Ingresar</Button>
        </Form>
        {this.renderRedirect()}

        {/**TEST*/}
        <div className="border border-secondary m-2 p-2">
          <h6>test, set response status manually</h6>
          <h6>set the role</h6>
          <Button onClick={() => (this.test.role = 'ROLE_OWNER')} className="btn btn-primary m-1">Owner</Button>
          <Button onClick={() => (this.test.role = 'ROLE_TEACHER')} className="btn btn-warning m-1">Teacher</Button>
          <Button onClick={() => (this.test.role = 'ROLE_STUDENT')} className="btn btn-success m-1">Student</Button>
          {/*<Button onClick={() => (this.test.role = 'unverified-student')} className="btn btn-danger m-1">Unverified Student</Button>*/}
        </div>
        
      </div>
    );
  }
}
Login = connect()(Login);

export default Login;