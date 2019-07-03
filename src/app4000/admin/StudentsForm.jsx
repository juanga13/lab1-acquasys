import React, {Component} from 'react';
import {Form, Button, Row, DropdownButton, Dropdown} from 'react-bootstrap';
import Input from '../helpers/Input';
import DataVerifier from '../DataVerifier';

const emptyForm = {
    email: '', password: '', name: '', surname: '', dni: '', sex: 'Masculino', 
    address: '', birthday: '', phone: '', avatarUrl: '', socialPlan: '', affiliateNumber: '',
    fatherName: '', fatherSurname: '', fatherEmail: '', fatherPhone: '',
    motherName: '', motherSurname: '', motherEmail: '', motherPhone: '',
};
// TODO: fix sex form...
class StudentsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: (props.fields === null) ? emptyForm : props.fields,
            errors: emptyForm,
            enableParentData: false
        };
    };

    handleChange = event => {
        console.log(event.target);
        if (event.target.id === 'check') {
            this.setState({...this.state, enableParentData: !this.state.enableParentData});
        } else if (event.target.id === 'sex') {
            console.log('is sex');
            console.log(event.target.id);
            console.log(event.target.title);
            
            if (event.target.title === 'Masculino') this.setState({...this.state, fields: {...this.state.fields, sex: event.target.title}});
            if (event.target.title === 'Femenino') this.setState({...this.state, fields: {...this.state.fields, sex: event.target.title}});
        } else {
            event.preventDefault();
            this.setState({fields: {...this.state.fields, [event.target.id]: event.target.value}});
        }
    };

    handleSubmit = (event) => {  
        event.preventDefault();
        let isValid = true;
        let errors = {};
        let values = Object.values(this.state.fields);
        if (this.state.enableParentData) {
            Object.keys(this.state.fields).forEach((type, index) => {
                const value = values[index];
                errors[type] = DataVerifier._verify(type, value);
                if (errors[type] !== '') isValid = false; 
            });    
        } else {
            values.splice(12);
            console.log(values);
            let keys = Object.keys(this.state.fields)
            keys.splice(12);
            keys.forEach((type, index) => {
                const value = values[index];
                errors[type] = DataVerifier._verify(type, value);
                if (errors[type] !== '') isValid = false; 
            });    
        }
        this.setState({...this.state, errors: errors});
        if (isValid) this.props.onAddConfirm(event, this.state.fields);  // props call
    };

    handleCancel = event => {
        event.preventDefault();
        this.setState({fields: emptyForm, errors: emptyForm});
        this.props.onAddCancel(event);
    };

    render() {
        console.log(this.state.fields);
        return (<Form>
            <Row>
                <Button onClick={this.handleSubmit}>Aceptar</Button>
                <Button className='btn btn-secondary' onClick={this.handleCancel}>Cancelar</Button>
            </Row>
            <Input id='email'           title='Email'               value={this.state.fields.email}           onChange={this.handleChange} error={this.state.errors.email}            placeholder='' type='email' autoFocus/>
            <Input id='password'        title='Contraseña'          value={this.state.fields.password}        onChange={this.handleChange} error={this.state.errors.password}         placeholder='' type='password'/>
            <Input id='name'            title='Nombre'              value={this.state.fields.name}            onChange={this.handleChange} error={this.state.errors.name}             placeholder=''/>
            <Input id='surname'         title='Apellido'            value={this.state.fields.surname}         onChange={this.handleChange} error={this.state.errors.surname}          placeholder=''/>
            <Input id='dni'             title='DNI'                 value={this.state.fields.dni}             onChange={this.handleChange} error={this.state.errors.dni}              placeholder='' type='number'/>
            {/* <Input id='sex'             title='Sexo'                value={this.state.fields.sex}             onChange={this.handleChange} error={this.state.errors.sex}              placeholder='' /> */}
            <DropdownButton title={this.state.fields.sex}>
                <Dropdown.Item id='sex' title='Masculino' onClick={this.handleChange}>Masculino</Dropdown.Item>
                <Dropdown.Item id='sex' title='Femenino' onClick={this.handleChange}>Femenino</Dropdown.Item>
            </DropdownButton>
            {/* TODO: use date picker */}
            <Input id='birthday'        title='Fecha de Nacimiento' value={this.state.fields.birthday}        onChange={this.handleChange} error={this.state.errors.birthday}         placeholder=''/>
            <Input id='address'         title='Direccion'           value={this.state.fields.address}         onChange={this.handleChange} error={this.state.errors.address}          placeholder=''/>
            <Input id='phone'           title='Telefono'            value={this.state.fields.phone}           onChange={this.handleChange} error={this.state.errors.phone}            placeholder='' type='number'/>
            {/* TODO: photo upload */}
            <Input id='avatarUrl'       title='Foto de perfil'      value={this.state.fields.avatarUrl}       onChange={this.handleChange} error={this.state.errors.avatarUrl}        placeholder=''/>
            <Input id='socialPlan'      title='Plan Social'         value={this.state.fields.socialPlan}      onChange={this.handleChange} error={this.state.errors.socialPlan}       placeholder=''/>
            <Input id='affiliateNumber' title='Numero de Afiliado'  value={this.state.fields.affiliateNumber} onChange={this.handleChange} error={this.state.errors.affiliateNumber}  placeholder='' type='number'/>
            <Row><h6>Incluir datos de padre/madre </h6><Form.Check type='checkbox' id='check' onChange={this.handleChange} checked={this.state.enableParentData}/></Row>
            <h5>Datos padre</h5>
            <Input id='fatherName'      title='Nombre'              value={this.state.fields.fatherName}      onChange={this.handleChange} error={this.state.errors.fatherName}       placeholder='' disabled={!this.state.enableParentData}/>
            <Input id='fatherSurname'   title='Apellido'            value={this.state.fields.fatherSurname}   onChange={this.handleChange} error={this.state.errors.fatherSurname}    placeholder='' disabled={!this.state.enableParentData}/>
            <Input id='fatherEmail'     title='Email'               value={this.state.fields.fatherEmail}     onChange={this.handleChange} error={this.state.errors.fatherEmail}      placeholder='' disabled={!this.state.enableParentData} type='email'/>
            <Input id='fatherPhone'     title='Telefono'            value={this.state.fields.fatherPhone}     onChange={this.handleChange} error={this.state.errors.fatherPhone}      placeholder='' disabled={!this.state.enableParentData} type='number'/>
            <h5>Datos madre</h5> 
            <Input id='motherName'      title='Nombre'              value={this.state.fields.motherName}      onChange={this.handleChange} error={this.state.errors.motherName}       placeholder='' disabled={!this.state.enableParentData}/>
            <Input id='motherSurname'   title='Apellido'            value={this.state.fields.motherSurname}   onChange={this.handleChange} error={this.state.errors.motherSurname}    placeholder='' disabled={!this.state.enableParentData}/>
            <Input id='motherEmail'     title='Email'               value={this.state.fields.motherEmail}     onChange={this.handleChange} error={this.state.errors.motherEmail}      placeholder='' disabled={!this.state.enableParentData} type='email'/>
            <Input id='motherPhone'     title='Telefono'            value={this.state.fields.motherPhone}     onChange={this.handleChange} error={this.state.errors.motherPhone}      placeholder='' disabled={!this.state.enableParentData} type='number'/>
        </Form>);
    };
};

export default StudentsForm;