import React, { Component } from 'react'
import FilterBar from '../helpers/FilterBar';
import ItemList from '../helpers/ItemList';
import { Button } from 'react-bootstrap';
import ReactModal from 'react-modal';
import AdminService from '../network/AdminService';
import StudentsForm from './StudentsForm';
import StudentInfo from './StudentInfo';
import '../css/main.css'
// ReactModal.setAppElement('root');  to get rid of 'App element is not defined' warning

class Students extends Component {
    constructor(props) {
        super(props);
        this.studentData = null;
        this.state = {
            filter: '',
            isModalOpen: false,
            modalEditMode: false, 
            modalViewInfoMode: false,
            addResponse: null,
            editResponse: null,
            deleteResponse: null,
        };
    };

    _filterList() {
        const students = this.props.students;
        let filteredList = [];
        for (var key in students) {
            if (students[key].name.toLowerCase().includes(this.state.filter.toLowerCase()) ||
            students[key].surname.toLowerCase().includes(this.state.filter.toLowerCase())
            //  ||students[key].dni.toString().includes(this.state.filter.toLowerCase())  TODO: filter by dni
             ) {
                filteredList.push(students[key]);
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
            AdminService.editStudent(data).then(response => {
                this.setState({isModalOpen: false, editResponse: response});
                this.props.updateList();
            });
        } else {
            AdminService.createStudent(data).then(response => {
                if (response.success) {
                    this.setState({isModalOpen: false, response: response});
                    this.props.updateList();
                }
            })
        }
    };

    handleCloseModal = event => {
        event.preventDefault();
        this.editData = null;
        this.setState({isModalOpen: false, modalEditMode: false, modalViewInfoMode: false});
    };

    handleFilterChange = event => {
        event.preventDefault();
        this.setState({[event.target.id]: event.target.value});
    };

    _getStudentInfo(id) {
        let data;
        // get all of student data
        this.props.verified.forEach(student => {if (student.id === id) data = student});
        this.props.unverified.forEach(student => {if (student.id === id) data = student});
        data.password = '';  // omit password because is encrypted
        this.studentData = data;
    };

    /**
     * See student information:
     * - Personal data.
     * - Lessons (payed and not payed info).
     */
    handleViewInfo = (id) => {
        this._getStudentInfo(id);
        this.setState({isModalOpen: true, modalEditMode: false, modalViewInfoMode: true})
    };

    handleEdit = id => {
        this._getStudentInfo(id);
        this.setState({isModalOpen: true, modalEditMode: true, modalViewInfoMode: false});
    };

    handleDelete = id => {
        AdminService.deleteStudent(id).then(data => {
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
                <h4>Alumnos</h4>
                <Button onClick={this.handleAdd}>Agregar nuevo alumno</Button>
                <FilterBar 
                    autoFocus 
                    placeholder='Nombre apellido dni' 
                    onChange={this.handleFilterChange} 
                    value={this.state.filter}
                    notice='Nota: buscar nombre, apellido o dni por separado.'
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
                    {(this.state.modalViewInfoMode) 
                        ? (<StudentInfo
                            data={this.studentData}
                            onCloseModal={e => this.handleCloseModal(e)}
                        />)
                        : (<StudentsForm 
                            fields={this.studentData}
                            onAddConfirm={(e, fields) => this.handleAddConfirm(e, fields)} 
                            onAddCancel={e => this.handleCloseModal(e)}
                        />)
                    }  
                </ReactModal>
            </div>
        );
    };
}

export default Students;