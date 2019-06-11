import React, { Component } from 'react'
import {Form, Button} from 'react-bootstrap';
import Input from './helpers/Input';

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({[event.target.id]: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();
        
    }

    render() {
        return (
            <div>
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
