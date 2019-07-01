import React, { Component } from 'react'
import '../css/lesson.css'
import { Button } from 'react-bootstrap';
import AdminService from '../network/AdminService';

class LessonTeacherList extends Component {
    constructor(props) {
        super(props);
        let errorAvailable, errorAssigned = '';
        let filteredAvailable = [];
        let dontFilter = false;
        console.log(props.list);
        if (props.available.length === 0) errorAvailable = 'No existen profesores registrados.';
        if (props.assigned.length === 0) {
            errorAssigned = 'Ningun profesor esta asignado a la clase.'
            dontFilter = true; 
        } else {
            for (var currentAssigned in props.assigned) {
                for (var currenteAvailable in props.available) {
                    console.log('currentAssigned:' + currentAssigned + ' // currentAvailable:' + currenteAvailable);
                    if (currentAssigned.id !== currenteAvailable.id) {
                        filteredAvailable.push(currenteAvailable);
                    }
                }
            }
        }
        this.state = {
            teachersAvailable: (dontFilter) ? props.available : filteredAvailable,
            teachersAssigned: props.assigned,
            errorAvailable: errorAvailable,
            errorAssigned: errorAssigned
        }
    }

    handleAddTeacher = (e) => {
        e.preventDefault();
        AdminService.assignTeacher()
    };

    render() {
        return (
            <div className='teachers-container'>
                <div className='m-2 right-border'>
                    <h5>Lista de profesores disponibles:</h5>
                    <h6 className='text text-danger'>{this.state.errorAvailable}</h6>
                    {
                        this.state.teachersAvailable.map((teacher) => (
                            <div className='teachers-list-item'>
                                <h6>{teacher.name + ' ' + teacher.surname}</h6>
                                <Button className='btn btn-success' onClick={this.handleAddTeacher}>Agregar</Button>
                            </div>
                        ))
                    }
                </div>
                <span className='vertical-separator'/>
                <div className='m-2'>
                    <h5>Lista de profesores asignados</h5>
                    <h6 className='text text-danger'>{this.state.errorAssigned}</h6>
                </div>
            </div>
            
        )
    }
};

export default LessonTeacherList;
