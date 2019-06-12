import React, { Component } from 'react'
import {Form, Button} from 'react-bootstrap';
import Input from './helpers/Input';
import UserService from './UserService';
import {Redirect} from "react-router";

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            success: false,
            error: false,
            errorMessage: null
        }
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({[event.target.id]: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        UserService.register(this.state.email,this.state.password).then(result => {
           this.setState({success: result.success});
           if(result.error){
               result.errorMessage.then(text =>{
                   this.setState({errorMessage: text});
                   this.setState({error: true});
               })
           }
           console.log(result);
        })
    };
    renderRedirect = () => {
        if (this.state.success) {
            this.setState({success: false});
            return <Redirect exact to='/login'/>
        }
    };
    renderError = () => {
        if (this.state.error) {
            return <div className="alert alert-primary" role="alert">
                {this.state.errorMessage}
            </div>
        }
    };

    render() {
        return (
            <div>
                {this.renderError()}
                {this.renderRedirect()}
                <Form>
                    <Input
                        title='Email'
                        id='email'
                        type='email'
                        onChange={this.handleChange}
                    />
                    <Input
                        title='Password'
                        id='password'
                        type='password'
                        onChange={this.handleChange}
                    />
                    <Button onClick={this.handleSubmit}>Login</Button>
                </Form>
            </div>
        )
    }
}
