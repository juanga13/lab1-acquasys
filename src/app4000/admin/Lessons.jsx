import React, { Component } from 'react'
import FilterBar from '../helpers/FilterBar';
import ItemList from '../helpers/ItemList';
import { Button } from 'react-bootstrap';
import ReactModal from 'react-modal';
import UserService from '../network/AdminService';
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

    _filterList() {
        const lessons = this.props.lessons;
        let filteredList = [];
        for (var key in lessons) {
            if (lessons[key].name.toLowerCase().includes(this.state.filter.toLowerCase()) ||
            lessons[key].surname.toLowerCase().includes(this.state.filter.toLowerCase())
            //  ||students[key].dni.toString().includes(this.state.filter.toLowerCase())
             ) {
                filteredList.push(lessons[key]);
            }
        }
        // console.log('filtered List');
        // console.log(filteredList);
        return filteredList;

        // return students;1
    };

    handleAdd = event => {
        event.preventDefault();
        this.setState({isModalOpen: true});
    };

    handleAddConfirm = (event, data) => {
        event.preventDefault();
        // console.log('Adding new student!');
        // console.log(event.currentTarget);
        if (this.state.modalEditMode) {
            UserService.editLesson(data).then(response => {
                // console.log('adding new student response:')
                // console.log(response);
                this.setState({editResponse: data});
                this.props.onUpdateList();
            });
        } else {
            UserService.createLesson(data).then(response => {
                // console.log('results');
                // console.log(response);
                if (response.success) {
                    this.setState({isModalOpen: false, response: response});
                    this.props.updateList();
                }
            })
        }
    };

    handleAddCancel = event => {
        event.preventDefault();
        // console.log('canceled add student');
        this.editData = null;
        this.setState({isModalOpen: false, modalEditMode: false});
    };

    handleFilterChange = event => {
        event.preventDefault();
        this.setState({[event.target.id]: event.target.value});
    };

    handleEdit = id => {
        // console.log("handle edit event is: " + id);
        let data;
        // get all of student data
        this.props.lesson.forEach(lesson => {if (lesson.id === id) data = lesson});
        data.password = '';  // omit password because is encrypted
        this.editData = data;
        // console.log(data);
        this.setState({isModalOpen: true, modalEditMode: true});
    };

    handleDelete = id => {
        // console.log("handle delete event is: " + id);
        UserService.deleteLesson(id).then(data => {
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
                <h4>Lessons</h4>
                <Button onClick={this.handleAdd}>Agregar nueva clase</Button>
                <FilterBar 
                    autoFocus 
                    placeholder='Nombre dia horario' 
                    onChange={this.handleFilterChange} 
                    value={this.state.filter}
                />
                <ItemList
                    type='lessons'
                    items={this._filterList()} 
                    filter={this.state.filter}
                    onEdit={this.handleEdit}
                    onDelete={this.handleDelete}    
                />
                <ReactModal 
                    isOpen={this.state.isModalOpen} 
                    ariaHideApp={false}
                >
                    <LessonsForm 
                        fields={this.editData}
                        onAddConfirm={(e, fields) => this.handleAddConfirm(e, fields)} 
                        onAddCancel={e => this.handleAddCancel(e)}    
                    />  
                </ReactModal>
            </div>
        );
    };
}

export default Lessons;