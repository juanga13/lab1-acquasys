import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import '../css/login.css';
import {Redirect} from "react-router";
import RequestManager from "../network/RequestManager";


class Login extends Component {
  constructor(props) {
    super(props);

    this.response = -1;
    this.state = {
      validated: false,
      redirect: false,
      status: '',  // test
      counter: 0,
      data: {
        email: '',
        password: '',
      }
    };
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({data: {[event.target.id]: event.target.value}});
  };

  handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) event.stopPropagation();
    this.setState({ validated: true });
    let response = RequestManager.postData('http://172.22.44.128:8080/api/user/register', this.state.data);
    console.log(response);

    /**TEST*/
    if (this.response !== -1) {  // if you click on test buttons, begin a fake login
      response = this.response;
      if (response > 399) this.setState({status: 'failure'});
      else this.setState({redirect: true, status: 'success'})
    }
  };

  renderAlert() {
    if (this.state.status === 'success') {
      return (
        <div className="border border-success alert-notification">
          <h6>Login successful!</h6>
        </div>
      );
    } else if (this.state.status === 'failure') {
      return (
        <div className="border border-danger alert-notification">
          <h6>Failed to login</h6>
        </div>
      );
    } else return (null);
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      this.setState({ redirect: false });
      return <Redirect exact to='/'/>
    }
  };

  render() {
    return (
      <div className='login'>
        <h5>Ingrese a Mundo Acqua</h5>
        <hr/>
        {this.renderAlert()}
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
          <Button type='submit'>Ingresar</Button>
        </Form>
        {this.renderRedirect()}

        {/**TEST*/}
        <div className="border border-secondary m-2 p-2">
          <h6>test, set response status manually</h6>
          <Button onClick={() => (this.response = 200)} className="btn btn-success m-1">200</Button>
          <Button onClick={() => (this.response = 400)} className="btn btn-danger m-1">400</Button>
        </div>
      </div>
    );
  }
}

export default Login;