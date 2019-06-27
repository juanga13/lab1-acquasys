import React, { Component } from 'react'
import FilterBar from '../helpers/FilterBar';
import ItemList from '../helpers/ItemList';
import { Button } from 'react-bootstrap';
import ReactModal from 'react-modal';
import AdminService from '../network/AdminService';
import TeachersForm from './TeachersForm';
import '../css/main.css'
// ReactModal.setAppElement('root');  to get rid of 'App element is not defined' warning

class Teachers extends Component {
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
        const teachers = this.props.teachers;
        let filteredList = [];
        for (var key in teachers) {
            if (teachers[key].name.toLowerCase().includes(this.state.filter.toLowerCase()) ||
            teachers[key].surname.toLowerCase().includes(this.state.filter.toLowerCase())
            //  ||students[key].cuil.toString().includes(this.state.filter.toLowerCase()) TODO filter by cuil
             ) {
                filteredList.push(teachers[key]);
            }
        }
        return filteredList;
    };

    handleAdd = event => {
        event.preventDefault();
        this.setState({isModalOpen: true});
    };

    handleAddConfirm = (event, data) => {
        event.preventDefault();
        if (this.state.modalEditMode) {
            AdminService.editTeacher(data).then(response => {
                this.setState({isModalOpen: false, editResponse: response});
                this.props.updateList();
            });
        } else {
            AdminService.createTeacher(data).then(response => {
                if (response.success) {
                    this.setState({isModalOpen: false, response: response});
                    this.props.updateList();
                }
            })
        }
    };

    handleAddCancel = event => {
        event.preventDefault();
        this.editData = null;
        this.setState({isModalOpen: false, modalEditMode: false});
    };

    handleFilterChange = event => {
        event.preventDefault();
        this.setState({[event.target.id]: event.target.value});
    };

    handleViewInfo = (id) => {

    };

    handleEdit = id => {
        let data;
        // get all of student data
        this.props.teachers.forEach(teacher => {if (teacher.id === id) data = teacher});
        data.password = '';  // omit password because is encrypted
        this.editData = data;
        this.setState({isModalOpen: true, modalEditMode: true});
    };

    handleDelete = id => {
        AdminService.deleteTeacher(id).then(data => {
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
                <h4>Profesores</h4>
                <Button onClick={this.handleAdd}>Agregar nuevo profesor</Button>
                <FilterBar 
                    autoFocus 
                    placeholder='Nombre apellido cuil' 
                    onChange={this.handleFilterChange} 
                    value={this.state.filter}
                    notice='Nota: buscar nombre, apellido o cuil por separado.'
                />
                <ItemList
                    type='students'
                    items={this._filterList()} 
                    filter={this.state.filter}
                    onViewInfo={this.handleViewInfo}
                    onEdit={this.handleEdit}
                    onDelete={this.handleDelete}    
                />
                <ReactModal 
                    isOpen={this.state.isModalOpen} 
                    ariaHideApp={false}
                >
                    <TeachersForm 
                        fields={this.editData}
                        onAddConfirm={(e, fields) => this.handleAddConfirm(e, fields)} 
                        onAddCancel={e => this.handleAddCancel(e)}    
                    />  
                </ReactModal>
            </div>
        );
    };
}

export default Teachers;