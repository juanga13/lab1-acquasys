import React, { Component } from 'react'
import FilterBar from '../helpers/FilterBar';
import ItemList from '../helpers/ItemList';
import { Button } from 'react-bootstrap';
import ReactModal from 'react-modal';
import AdminService from '../network/AdminService';
import LessonsForm from './LessonsForm';
import '../css/main.css'
// ReactModal.setAppElement('root');  to get rid of 'App element is not defined' warning

class Lessons extends Component {
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

    /**
     * filters list by name
     * TODO: filter also by day
     */
    _filterList() {
        const lessons = this.props.lessons;
        let filteredList = [];
        for (var key in lessons) {
            if (lessons[key].name.toLowerCase().includes(this.state.filter.toLowerCase())) {
                filteredList.push(lessons[key]);
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
        console.log('adding lessons');
        console.log(data);
        if (this.state.modalEditMode) {
            AdminService.editLesson(data).then(response => {
                this.setState({isModalOpen: false, editResponse: response});
                this.props.updateList();
            });
        } else {
            AdminService.createLesson(data).then(response => {
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
        this.props.lesson.forEach(lesson => {if (lesson.id === id) data = lesson});
        data.password = '';  // omit password because is encrypted
        this.editData = data;
        this.setState({isModalOpen: true, modalEditMode: true});
    };

    handleDelete = id => {
        AdminService.deleteLesson(id).then(data => {
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
                <h4>Clases</h4>
                <Button onClick={this.handleAdd}>Agregar nueva clase</Button>
                <FilterBar 
                    autoFocus 
                    placeholder='Nombre día horario' 
                    onChange={this.handleFilterChange} 
                    value={this.state.filter}
                    notice='Nota: buscar nombre, día u horario por separado.'
                />
                <ItemList
                    type='lessons'
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
                    <LessonsForm 
                        fields={this.editData}
                        teachers={this.props.teachers}
                        onAddConfirm={(e, fields) => this.handleAddConfirm(e, fields)} 
                        onAddCancel={e => this.handleAddCancel(e)}    
                    />  
                </ReactModal>
            </div>
        );
    };
}

export default Lessons;