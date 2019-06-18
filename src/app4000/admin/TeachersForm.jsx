import React, {Component} from 'react';
import {Form, Button, Row} from 'react-bootstrap';
import Input from '../helpers/Input';
import DataVerifier from '../DataVerifier';

const emptyForm = {
    email: '', password: '', name: '', surname: '', dni: '', sex: '', 
    address: '', birthday: '', phone: '', avatarUrl: '', socialPlan: '', affiliateNumber: '',
    fatherName: '', fatherSurname: '', fatherEmail: '', fatherPhone: '',
    motherName: '', motherSurname: '', motherEmail: '', motherPhone: '',
};

class TeachersForm extends Component {
    constructor(props) {
        console.log('constructor of students form')
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
        console.log('render from student form')
        console.log(this.state.fields);
        return (<Form>
            <Row>
                <Button onClick={this.handleSubmit}>Aceptar</Button>
                <Button onClick={this.handleCancel}>Cancelar</Button>
            </Row>
            <Input id='email'           title='Email'               value={this.state.fields.email}           onChange={this.handleChange} error={this.state.errors.email}            placeholder='' autoFocus/>
            <Input id='password'        title='Contraseña'          value={this.state.fields.password}        onChange={this.handleChange} error={this.state.errors.password}         placeholder=''/>
            <Input id='name'            title='Nombre'              value={this.state.fields.name}            onChange={this.handleChange} error={this.state.errors.name}             placeholder=''/>
            <Input id='surname'         title='Apellido'            value={this.state.fields.surname}         onChange={this.handleChange} error={this.state.errors.surname}          placeholder=''/>
            <Input id='dni'             title='DNI'                 value={this.state.fields.dni}             onChange={this.handleChange} error={this.state.errors.dni}              placeholder=''/>
            <Input id='sex'             title='Sexo'                value={this.state.fields.sex}             onChange={this.handleChange} error={this.state.errors.sex}              placeholder='' />
            <Input id='birthday'        title='Fecha de Nacimiento' value={this.state.fields.birthday}        onChange={this.handleChange} error={this.state.errors.birthday}         placeholder=''/>
            <Input id='address'         title='Direccion'           value={this.state.fields.address}         onChange={this.handleChange} error={this.state.errors.address}          placeholder=''/>
            <Input id='phone'           title='Telefono'            value={this.state.fields.phone}           onChange={this.handleChange} error={this.state.errors.phone}            placeholder=''/>
            <Input id='avatarUrl'       title='Foto de perfil'      value={this.state.fields.avatarUrl}       onChange={this.handleChange} error={this.state.errors.avatarUrl}        placeholder=''/>
            <Input id='socialPlan'      title='Plan Social'         value={this.state.fields.socialPlan}      onChange={this.handleChange} error={this.state.errors.socialPlan}       placeholder=''/>
            <Input id='affiliateNumber' title='Numero de Afiliado'  value={this.state.fields.affiliateNumber} onChange={this.handleChange} error={this.state.errors.affiliateNumber}  placeholder=''/>
            <Input id='fatherName'     title='Nombre'              value={this.state.fields.fatherName}      onChange={this.handleChange} error={this.state.errors.fatherName}       placeholder=''/>
            <Input id='fatherSurname'  title='Apellido'            value={this.state.fields.fatherSurname}   onChange={this.handleChange} error={this.state.errors.fatherSurname}    placeholder=''/>
            <Input id='fatherEmail'    title='Email'               value={this.state.fields.fatherEmail}     onChange={this.handleChange} error={this.state.errors.fatherEmail}      placeholder=''/>
            <Input id='fatherPhone'    title='Telefono'            value={this.state.fields.fatherPhone}     onChange={this.handleChange} error={this.state.errors.fatherPhone}      placeholder=''/>
            <Input id='motherName'     title='Nombre'              value={this.state.fields.motherName}      onChange={this.handleChange} error={this.state.errors.motherName}       placeholder=''/>
            <Input id='motherSurname'  title='Apellido'            value={this.state.fields.motherSurname}   onChange={this.handleChange} error={this.state.errors.motherSurname}    placeholder=''/>
            <Input id='motherEmail'    title='Email'               value={this.state.fields.motherEmail}     onChange={this.handleChange} error={this.state.errors.motherEmail}      placeholder=''/>
            <Input id='motherPhone'    title='Telefono'            value={this.state.fields.motherPhone}     onChange={this.handleChange} error={this.state.errors.motherPhone}      placeholder=''/>
        </Form>);
    };
};

export default TeachersForm;