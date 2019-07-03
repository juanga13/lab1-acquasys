import React, { Component } from 'react'
import FilterBar from '../helpers/FilterBar';
import ItemList from '../helpers/ItemList';
import { Button } from 'react-bootstrap';
import ReactModal from 'react-modal';
import AdminService from '../network/AdminService';
import LessonsForm from './LessonsForm';
import LessonInfo from './LessonInfo';
import '../css/main.css'
// ReactModal.setAppElement('root');  to get rid of 'App element is not defined' warning

const emptyWeekday = {day: 'Lunes', hour: 0, minutes: 0, duration: 0};
const emptyData = {name: '', teachers: [], startDate: new Date(), endDate: new Date(), weekdays: [emptyWeekday,]};
// modal state 'enum', easier than 3 booleans...
const modal = {off: 'off', add: 'add', edit: 'edit', view: 'view'};

class Lessons extends Component {
    constructor(props) {
        super(props);
        this.editData = null;
        this.state = {
            filter: '',
            modalState: modal.off,
            response: '',
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
            if (lessons[key].name !== null) {
                if (lessons[key].name.toLowerCase().includes(this.state.filter.toLowerCase())) {
                    filteredList.push(lessons[key]);
                }   
            } 
        }
        return filteredList;
    };

    handleAddConfirm = (event, data) => {
        event.preventDefault();
        const modalState = this.state.modalState;
        if (modalState === modal.add) {
            // ADD DATA TEMPLATE {name, Array<Teacher>, startDate, endDate, Array<Weekday>}
            AdminService.createLesson(data).then(response => {
                if (response.success) {
                    this.setState({modalState: modal.off, response: response});
                    this.props.updateList();
                }
            })
        } else if (modalState === modal.edit) {
            AdminService.editLesson(data).then(response => {
                this.setState({modalState: modal.off, response: response});
                this.props.updateList();
            });
        }
    };

    handleAddCancel = event => {
        event.preventDefault();
        this.editData = emptyData;
        this.setState({modalState: modal.off});
    };

    handleFilterChange = event => {
        event.preventDefault();
        this.setState({[event.target.id]: event.target.value});
    };

    handleAdd = event => {
        event.preventDefault();
        this.setState({modalState: modal.add});
    };
    
    handleViewInfo = (id) => {
        let data;
        this.props.lessons.forEach(lesson => {if (lesson.id === id) data = lesson});
        this.editData = data;
        this.setState({modalState: modal.view})
    };
    
    handleEdit = id => {
        console.log('[Lesson] handle edit with id ' + id);
        let data;
        // get all of student data
        this.props.lessons.forEach(lesson => {if (lesson.id === id) data = lesson});
        delete data.students;  // trash from back
        delete data.teachers;  
        data.assigned = data.teachers;  // set assigned
        
        // FIXME: dates should never be 0
        if (data.startDate === 0) {
            data.startDate = new Date();
            console.warn('[Lesson] received empty startDate.');
        }
        if (data.endDate === 0) {
            data.endDate = new Date();
            console.warn('[Lesson] received empty endDate.');
        }
        // FIXME: weekdays should never have length 0
        if (data.weekdays.length === 0) {
            data.weekdays = [emptyWeekday];
            console.warn('[Lesson] received empty weekday.')
        }
        
        this.editData = data;
        this.setState({modalState: modal.edit});
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
                    isOpen={(this.state.modalState !== modal.off)} 
                    ariaHideApp={false}
                >   
                    {(this.state.modalState === 'view') 
                        ? <LessonInfo
                            data={this.editData}
                            onCloseModal={e => this.handleAddCancel(e)}
                            // onPaymentChange={}
                        />
                        : <LessonsForm 
                            fields={this.editData}  // name, [assigned], startDate, endDate, [weekdays]
                            teachers={this.props.teachers}  // [teachers]
                            onAddConfirm={(e, fields) => this.handleAddConfirm(e, fields)} 
                            onAddCancel={e => this.handleAddCancel(e)}    
                        />
                    }
                      
                </ReactModal>
            </div>
        );
    };
}

export default Lessons;