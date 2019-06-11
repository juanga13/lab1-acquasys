import React, { Component, Fragment } from 'react'
import UserService from './UserService';
import {Redirect} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import Input from './helpers/Input';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '', 
            password: '',
        };
    };
    handleChange = event => {
        event.preventDefault();
        this.setState({[event.target.id]: event.target.value});
    };
    handleSubmit = event => {
        event.preventDefault();
        // UserService.login(this.state.email, this.state.password)
        //     .then(data => {
        //         console.log(data);
        //         localStorage.setItem('token', data.token);
        //         localStorage.setItem('role', data.role);
        //     }).then(() => this.props.onLogin());
        localStorage.setItem('token', 'testToken');
        localStorage.setItem('role', 'ROLE_ADMIN');
        this.props.onLogin();
    };

    render() {
        return (
            <Fragment>
                <h5>Login</h5>
                <Form>
                    <Input id='email' type='email' value={this.state.email} onChange={this.handleChange} title='Email' autoFocus/>
                    <Input id='password' type='password' value={this.state.password} onChange={this.handleChange} title='Contraseña'/>
                    <Button onClick={this.handleSubmit}>Ingresar</Button>
                </Form>
            </Fragment>
        )
    };
}
