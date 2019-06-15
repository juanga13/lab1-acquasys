import React, { Component } from 'react'
import FilterBar from '../helpers/FilterBar';
import ItemList from '../helpers/ItemList';
import { Form, Button, Row } from 'react-bootstrap';
import ReactModal from 'react-modal';
import Input from '../helpers/Input';
import DataVerifier from '../DataVerifier';
import UserService from '../UserService';
import StudentsForm from './StudentsForm';
import '../css/main.css'
// ReactModal.setAppElement('root');  to get rid of 'App element is not defined' warning

class Students extends Component {
    constructor(props) {
        super(props);
        this.editData = null;
        this.state = {
            filter: '',
            isModalOpen: false,
            modalEditMode: false, 
            addResponse: null,
            editResponse: null,
            deleteResponse: null,
        };
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
    _getStateStudentData = () => {
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

    handleAddConfirm = (event, data) => {
        event.preventDefault();
        console.log('Adding new student!');
        console.log(event.currentTarget);
        if (this.state.modalEditMode) {
            UserService.editStudent(data).then(response => {
                console.log('adding new student response:')
                console.log(response);
                this.setState({editResponse: data});
                this.props.onUpdateList();
            });
        } else {
            UserService.createStudent(data).then(response => {
                console.log('results');
                console.log(response);
                if (response.success) {
                    this.setState({isModalOpen: false, response: response});
                    this.props.updateList();
                }
            })
        }
    };

    handleAddCancel = event => {
        event.preventDefault();
        console.log('canceled add student');
        this.editData = null;
        this.setState({isModalOpen: false, modalEditMode: false});
    };

    handleFilterChange = event => {
        event.preventDefault();
        this.setState({[event.target.id]: event.target.value});
    };

    handleEdit = id => {
        console.log("handle edit event is: " + id);
        let data;
        // get all of student data
        this.props.verified.forEach(student => {if (student.id === id) data = student});
        this.props.unverified.forEach(student => {if (student.id === id) data = student});
        data.password = '';  // omit password because is encrypted
        this.editData = data;
        // console.log(data);
        this.setState({isModalOpen: true, modalEditMode: true});
    };

    handleDelete = id => {
        // console.log("handle delete event is: " + id);
        UserService.deleteStudent(id).then(data => {
            // console.log(data);
            this.setState({deleteResponse: data});
            this.props.updateList();
        });
    };

    handleChange = event => {   
        event.preventDefault();
        this.setState({[event.target.id]: event.target.value});
    };

    render() {
        return (
            <div className='menu-container'>
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
                <ReactModal isOpen={this.state.isModalOpen}>
                    {/* StudentForm verifies data onSubmit and does props.onSubmit */}
                    <StudentsForm 
                        fields={this.editData}
                        onAddConfirm={(e, fields) => this.handleAddConfirm(e, fields)} 
                        onAddCancel={e => this.handleAddCancel(e)}    
                    />  
                </ReactModal>
            </div>
        )
    }
}

export default Students;