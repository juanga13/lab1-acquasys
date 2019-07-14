import React, {Component} from 'react'
import Input from '../Input';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: {email:'', password:''},
            errors: {email:'', password:''},
            response: '',
        }
    };

    handleChange = event => {
        event.preventDefault();
        this.setState({[event.target.id]: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        this._verifyForm() && this.props.onSubmit();
    };

    _verifyForm() {
        const keys = this.state.fields.keys();
        const values = this.state.fields.values()
        for (var i in keys) {
            if (keys[i] === 'email') {
                // TODO: where do i put the verification of each type of field
            }
        }
    };
    
    render() {
        return (
            <div>
                <h6 className='login-error'>{this.props.response}</h6>
                <Input id='email'    label='Correo electronico' error={this.state.errors.email}     onChange={this.handleChange}/>
                <Input id='password' label='Contrasena'         error={this.state.errors.password}  onChange={this.handleChange}/>
                <button onClick={this.handleSubmit}>Ingresar</button>
            </div>
        );
    };
}

export default LoginForm;
