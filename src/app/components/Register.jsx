import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";

import '../css/register.css';
import RequestManager from "../network/RequestManager";
import {Redirect} from "react-router";

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user : {
                email: '',
                password: '',
                name: '',
                surname: '',
            },
            redirect : false,
            error : null
        }
    }

    handleChange = event => {
        event.preventDefault();
        let oldUser = this.state.user;
        let newUser = {[event.target.id] : event.target.value};
        oldUser.email = newUser.email == null ? oldUser.email : newUser.email;
        oldUser.password = newUser.password == null ? oldUser.password : newUser.password;
        oldUser.name = newUser.name == null ? oldUser.name : newUser.name;
        oldUser.surname = newUser.surname == null ? oldUser.surname : newUser.surname;
//  items: update(this.state.items, {1: {name: {$set: 'updated field name'}}}) TODO: ESTA ES LA MANERA CORRECTA DE HACERLO
        this.setState({user : oldUser, redirect : false});
    };

    handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        return fetch(RequestManager.baseUrl + "/api/user/register", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {"Content-Type": "application/json"},
            redirect: "follow",
            referrer: "no-referrer",
            body: JSON.stringify(this.state.user),
        })
            .then(response => {
                if(response.ok){
                    this.setState({redirect : true} );
                }else{
                    this.setState({error : response.statusText});
                    console.log(response);
                }
            })
            .catch(error => {
                console.log("Error: " + error)
            })

    };
    renderRedirect = () => {
        if (this.state.redirect) {
            this.setState({ redirect: false });
            return <Redirect exact to='/login'/>
        }
    };
    renderError = () => {
        if (this.state.error != null) {
            console.log(this.state.error);
            return <div className="alert alert-primary" role="alert">
                {this.state.error}
            </div>
        }
    };

    render() {
        return (
            <div className='register'>
                <h5>Registra un nuevo usuario</h5>
                <hr/>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Correo electronico</Form.Label>
                        <Form.Control
                            id='email'
                            type='email'
                            placeholder='Email'
                            autoFocus
                            onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            id='password'
                            type='password'
                            placeholder='Contraseña'
                            onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            id='name'
                            type='name'
                            placeholder='Nombre'
                            onChange={this.handleChange}/>

                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            id='surname'
                            type='name'
                            placeholder='Apellido'
                            onChange={this.handleChange}/>

                    </Form.Group>
                    <Button type='submit'>Registrarse</Button>
                </Form>
                {this.renderError()}
                {this.renderRedirect()}
            </div>
        );
    }
}

export default Register;