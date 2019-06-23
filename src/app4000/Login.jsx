import React, { Component, Fragment } from 'react'
import UserService from './network/UserService';
import {Form, Button, Spinner} from 'react-bootstrap';
import Input from './helpers/Input';
import './css/form.css';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '', 
            password: '',
            errors: {email: '', password: ''},
            loading: false,  // loading spinner while doing request of login
            response: '',
            error: false,
        };
    };
    
    handleChange = event => {
        event.preventDefault();
        this.setState({[event.target.id]: event.target.value});
    };
    
    handleSubmit = event => {
        event.preventDefault();
        this.handleValidation();
        this.setState({loading: true, error: false, response: ''})
        UserService.login(this.state.email, this.state.password)
            .then(response => {
                console.log(response);
                if (response.success) {
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('role', response.role);
                } else this.setState({error: true, response: response.errorMessage});
            }).then(() => {
                this.setState({loading: false});
                this.props.onLogin();
            });
    };

    handleValidation() {
        
    };

    renderResponse = () => {return (this.state.error) 
        ? <h6 className='text text-danger'>{this.state.response}</h6>
        : <h6 className='text text-success'>{this.state.response}</h6>
    };

    render() {
        return (
            <Fragment>
                <h5>Login</h5>
                {(this.state.loading) && <Spinner animation="border"/>}
                {this.renderResponse()}
                <Form className='form-container'>
                    <Input id='email' type='email' value={this.state.email} onChange={this.handleChange} title='Email' autoFocus/>
                    <Input id='password' type='password' value={this.state.password} onChange={this.handleChange} title='Contraseña'/>
                    <Button onClick={this.handleSubmit}>Ingresar</Button>
                </Form>
            </Fragment>
        )
    };
}
