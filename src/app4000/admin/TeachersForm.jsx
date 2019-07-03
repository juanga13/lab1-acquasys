import React, {Component} from 'react';
import {Form, Button, Row} from 'react-bootstrap';
import Input from '../helpers/Input';
import DataVerifier from '../DataVerifier';

const emptyForm = {
    email: '', password: '', name: '', surname: '', cuil: '', sex: '', 
    address: '', birthday: '', phone: '', avatarUrl: '', socialPlan: '', affiliateNumber: '',
    fatherName: '', fatherSurname: '', fatherEmail: '', fatherPhone: '',
    motherName: '', motherSurname: '', motherEmail: '', motherPhone: '',
};

// TODO: sex dropdown, data is wrong
class TeachersForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: (props.fields === null) ? emptyForm : props.fields,
            errors: emptyForm,
        };
    };

    handleChange = event => {
        event.preventDefault();
        this.setState({fields: {...this.state.fields, [event.target.id]: event.target.value}});
    };

    handleSubmit = (event) => {  
        event.preventDefault();
        let isValid = true;
        let errors = {};
        const values = Object.values(this.state.fields);
        Object.keys(this.state.fields).forEach((type, index) => {
            const value = values[index];
            errors[type] = DataVerifier._verify(type, value);
            if (errors[type] !== '') isValid = false; 
        });
        this.setState({...this.state, errors: errors});
        if (isValid) this.props.onAddConfirm(event, this.state.fields);  // props call
    };

    handleCancel = event => {
        event.preventDefault();
        this.setState({fields: emptyForm, errors: emptyForm});
        this.props.onAddCancel(event);
    };

    render() {
        return (<Form>
            <Row>
                <Button onClick={this.handleSubmit}>Aceptar</Button>
                <Button onClick={this.handleCancel}>Cancelar</Button>
            </Row>
            <Input id='email'           title='Email'               value={this.state.fields.email}           onChange={this.handleChange} error={this.state.errors.email}            placeholder='' autoFocus/>
            <Input id='password'        title='Contraseña'          value={this.state.fields.password}        onChange={this.handleChange} error={this.state.errors.password}         placeholder=''/>
            <Input id='name'            title='Nombre'              value={this.state.fields.name}            onChange={this.handleChange} error={this.state.errors.name}             placeholder=''/>
            <Input id='surname'         title='Apellido'            value={this.state.fields.surname}         onChange={this.handleChange} error={this.state.errors.surname}          placeholder=''/>
            <Input id='cuil'            title='CUIL'                value={this.state.fields.cuil}            onChange={this.handleChange} error={this.state.errors.cuil}              placeholder=''/>
            <Input id='sex'             title='Sexo'                value={this.state.fields.sex}             onChange={this.handleChange} error={this.state.errors.sex}              placeholder='' />
            <Input id='birthday'        title='Fecha de Nacimiento' value={this.state.fields.birthday}        onChange={this.handleChange} error={this.state.errors.birthday}         placeholder=''/>
            <Input id='address'         title='Direccion'           value={this.state.fields.address}         onChange={this.handleChange} error={this.state.errors.address}          placeholder=''/>
            <Input id='phone'           title='Telefono'            value={this.state.fields.phone}           onChange={this.handleChange} error={this.state.errors.phone}            placeholder=''/>
            <Input id='avatarUrl'       title='Foto de perfil'      value={this.state.fields.avatarUrl}       onChange={this.handleChange} error={this.state.errors.avatarUrl}        placeholder=''/>
            <Input id='socialPlan'      title='Plan Social'         value={this.state.fields.socialPlan}      onChange={this.handleChange} error={this.state.errors.socialPlan}       placeholder=''/>
            <Input id='affiliateNumber' title='Numero de Afiliado'  value={this.state.fields.affiliateNumber} onChange={this.handleChange} error={this.state.errors.affiliateNumber}  placeholder=''/>
        </Form>);
    };
};

export default TeachersForm;