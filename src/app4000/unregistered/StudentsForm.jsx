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

class StudentsForm extends Component {
    constructor(props) {
        super(props);
        console.log("HOLA");
        console.log(props);
        this.state = {
            fields: (props.fields === null) ? emptyForm : props.fields,
            errors: emptyForm,
        };
    };

    handleSubmit = (event) => {  
        event.preventDefault();
        let isValid = true;
        let errors = {};
        const values = Object.values(this.props.fields);
        Object.keys(this.props.fields).forEach((type, index) => {
            const value = values[index];
            errors[type] = DataVerifier._verify(type, value);
            if (errors[type] !== '') isValid = false; 
        });
        this.setState({...this.state, errors: errors});
        if (isValid) this.props.onAddConfirm(event, this.state.fields);  // props call
    };

    render() {
        if(this.props.fields === null)
            return null;

        return (<Form>
            <Row>
                <Button onClick={this.handleSubmit}>Aceptar</Button>
            </Row>
            <Input id='email'           title='Email'               value={this.props.fields.email}           onChange={this.props.handleChange} error={this.state.errors.email}            placeholder='' autoFocus/>
            <Input id='password'        title='Contraseña'          value={this.props.fields.password}        onChange={this.props.handleChange} error={this.state.errors.password}         placeholder=''/>
            <Input id='name'            title='Nombre'              value={this.props.fields.name}            onChange={this.props.handleChange} error={this.state.errors.name}             placeholder=''/>
            <Input id='surname'         title='Apellido'            value={this.props.fields.surname}         onChange={this.props.handleChange} error={this.state.errors.surname}          placeholder=''/>
            <Input id='dni'             title='DNI'                 value={this.props.fields.dni}             onChange={this.props.handleChange} error={this.state.errors.dni}              placeholder=''/>
            <Input id='sex'             title='Sexo'                value={this.props.fields.sex}             onChange={this.props.handleChange} error={this.state.errors.sex}              placeholder='' />
            <Input id='birthday'        title='Fecha de Nacimiento' value={this.props.fields.birthday}        onChange={this.props.handleChange} error={this.state.errors.birthday}         placeholder=''/>
            <Input id='address'         title='Direccion'           value={this.props.fields.address}         onChange={this.props.handleChange} error={this.state.errors.address}          placeholder=''/>
            <Input id='phone'           title='Telefono'            value={this.props.fields.phone}           onChange={this.props.handleChange} error={this.state.errors.phone}            placeholder=''/>
            <Input id='avatarUrl'       title='Foto de perfil'      value={this.props.fields.avatarUrl}       onChange={this.props.handleChange} error={this.state.errors.avatarUrl}        placeholder=''/>
            <Input id='socialPlan'      title='Plan Social'         value={this.props.fields.socialPlan}      onChange={this.props.handleChange} error={this.state.errors.socialPlan}       placeholder=''/>
            <Input id='affiliateNumber' title='Numero de Afiliado'  value={this.props.fields.affiliateNumber} onChange={this.props.handleChange} error={this.state.errors.affiliateNumber}  placeholder=''/>
            <h5>Datos padre</h5>
            <Input id='fatherName'      title='Nombre'              value={this.props.fields.fatherName}      onChange={this.props.handleChange} error={this.state.errors.fatherName}       placeholder=''/>
            <Input id='fatherSurname'   title='Apellido'            value={this.props.fields.fatherSurname}   onChange={this.props.handleChange} error={this.state.errors.fatherSurname}    placeholder=''/>
            <Input id='fatherEmail'     title='Email'               value={this.props.fields.fatherEmail}     onChange={this.props.handleChange} error={this.state.errors.fatherEmail}      placeholder=''/>
            <Input id='fatherPhone'     title='Telefono'            value={this.props.fields.fatherPhone}     onChange={this.props.handleChange} error={this.state.errors.fatherPhone}      placeholder=''/>
            <h5>Datos madre</h5>
            <Input id='motherName'      title='Nombre'              value={this.props.fields.motherName}      onChange={this.props.handleChange} error={this.state.errors.motherName}       placeholder=''/>
            <Input id='motherSurname'   title='Apellido'            value={this.props.fields.motherSurname}   onChange={this.props.handleChange} error={this.state.errors.motherSurname}    placeholder=''/>
            <Input id='motherEmail'     title='Email'               value={this.props.fields.motherEmail}     onChange={this.props.handleChange} error={this.state.errors.motherEmail}      placeholder=''/>
            <Input id='motherPhone'     title='Telefono'            value={this.props.fields.motherPhone}     onChange={this.props.handleChange} error={this.state.errors.motherPhone}      placeholder=''/>
        </Form>);
    };
};

export default StudentsForm;
