import React, { Component } from 'react'
import FilterBar from '../helpers/FilterBar';
import ItemList from '../helpers/ItemList';
import { Form, Button, Row } from 'react-bootstrap';
import ReactModal from 'react-modal';
import Input from '../helpers/Input';
import DataVerifier from '../DataVerifier';
import UserService from '../UserService';

class Students extends Component {
    state = {
        filter: '',
        isModalOpen: false,
        modalEditMode: false, 

        editResponse: null,
        deleteResponse: null,

        email: '', password: '', name: '', surname: '', dni: '', sex: '', 
        address: '', birthday: '', phone: '', avatarUrl: '', socialPlan: '', affiliateNumber: '',
        fatherName: '', fatherSurname: '', fatherEmail: '', fatherPhone: '',
        motherName: '', motherSurname: '', motherEmail: '', motherPhone: '',
    };

    _filterList() {
        const students = this.props.students;
        // let filteredList = [];
        // for (var key in students) {
        //     if (students[key].name.toLowerCase().includes(this.state.filter.toLowerCase()) ||
        //     students[key].surname.toLowerCase().includes(this.state.filter.toLowerCase()) {
        //         filteredList.push(students[key]);
        //     }
        // }
        // return filteredList;
        return students;
    };

    // gives me object with only data from student
    _getStateStudentData() {
        const data = this.state;
        delete data.filter;
        delete data.isModalOpen;
        delete data.modalEditMode;
        delete data.editResponse;
        delete data.deleteResponse;
        return data;
    }

    handleAdd = event => {
        event.preventDefault();
        this.setState({isModalOpen: true});
    };

    handleAddConfirm = event => {
        event.preventDefault();
        UserService.editStudent(this._getStateStudentData()).then(data => {
            console.log(data);
            this.setState({editResponse: data})
        });
        this.setState({isModalOpen: false});
    };

    handleAddCancel = event => {
        event.preventDefault();
        this.setState({isModalOpen: false});
    };

    handleFilterChange = event => {
        event.preventDefault();
        this.setState({[event.target.id]: event.target.value});
    };

    handleSelect = value => {
        this.setState({filterType: value});
    };

    handleEdit = id => {
        console.log("handle edit event is: " + id);
        let data;
        this.props.verified.forEach(student => {if (student.id === id) data = student});
        this.props.unverified.forEach(student => {if (student.id === id) data = student});
        this.setState(data);
        this.setState({password: '', isModalOpen: true, modalEditMode: true,});
    };

    handleDelete = id => {
        console.log("handle delete event is: " + id);
        UserService.deleteStudent(id).then(data => {
            console.log(data);
            this.setState({deleteResponse: data});
        });
    };

    handleChange = event => {
        event.preventDefault();
        this.setState({[event.target.id]: event.target.value});
    };

    render() {
        console.log(this.props.students);
        return (
            <div>
                <h4>Students</h4>
                <Button onClick={this.handleAdd}>Agregar nuevo alumno</Button>
                <FilterBar 
                    autoFocus 
                    placeholder='Nombre apellido dni' 
                    onChange={this.handleFilterChange} 
                    value={this.state.filter}
                />
                <ItemList
                    type='students'
                    items={this.props.students} 
                    filter={this.state.filter}
                    onEdit={this.handleEdit}
                    onDelete={this.handleDelete}    
                />
                <ReactModal
                    isOpen={this.state.isModalOpen}
                >
                    <Row>
                        <Button onClick={this.handleAddConfirm}>Aceptar</Button>
                        <Button onClick={this.handleAddCancel}>Cancelar</Button>
                    </Row>
                    <Form>
                        <Input id='email'           title='Email'               value={this.state.email}           onChange={this.handleChange} placeholder='' autoFocus/>
                        <Input id='password'        title='Contraseña'          value={this.state.password}        onChange={this.handleChange} placeholder=''/>
                        <Input id='name'            title='Nombre'              value={this.state.name}            onChange={this.handleChange} placeholder=''/>
                        <Input id='surname'         title='Apellido'            value={this.state.surname}         onChange={this.handleChange} placeholder=''/>
                        <Input id='dni'             title='DNI'                 value={this.state.dni}             onChange={this.handleChange} placeholder=''/>
                        <Input id='sex'             title='Sexo'                value={this.state.sex}             onChange={this.handleChange} placeholder='' />
                        <Input id='birthday'        title='Fecha de Nacimiento' value={this.state.birthday}        onChange={this.handleChange} placeholder=''/>
                        <Input id='address'         title='Direccion'           value={this.state.address}         onChange={this.handleChange} placeholder=''/>
                        <Input id='phone'           title='Telefono'            value={this.state.phone}           onChange={this.handleChange} placeholder=''/>
                        <Input id='avatarUrl'       title='Foto de perfil'      value={this.state.avatarUrl}       onChange={this.handleChange} placeholder=''/>
                        <Input id='socialPlan'      title='Plan Social'         value={this.state.socialPlan}      onChange={this.handleChange} placeholder=''/>
                        <Input id='affiliateNumber' title='Numero de Afiliado'  value={this.state.affiliateNumber} onChange={this.handleChange} placeholder=''/>
                        <Input id='father.name'     title='Nombre'              value={this.state.fatherName}      onChange={this.handleChange} placeholder=''/>
                        <Input id='father.surname'  title='Apellido'            value={this.state.fatherSurname}   onChange={this.handleChange} placeholder=''/>
                        <Input id='father.email'    title='Email'               value={this.state.fatherEmail}     onChange={this.handleChange} placeholder=''/>
                        <Input id='father.phone'    title='Telefono'            value={this.state.fatherPhone}     onChange={this.handleChange} placeholder=''/>
                        <Input id='mother.name'     title='Nombre'              value={this.state.motherName}      onChange={this.handleChange} placeholder=''/>
                        <Input id='mother.surname'  title='Apellido'            value={this.state.motherSurname}   onChange={this.handleChange} placeholder=''/>
                        <Input id='mother.email'    title='Email'               value={this.state.motherEmail}     onChange={this.handleChange} placeholder=''/>
                        <Input id='mother.phone'    title='Telefono'            value={this.state.motherPhone}     onChange={this.handleChange} placeholder=''/>
                    </Form>
                </ReactModal>
            </div>
        )
    }
}

export default Students;