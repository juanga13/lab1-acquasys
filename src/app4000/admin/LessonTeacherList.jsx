import React, { Component } from 'react'
import '../css/lesson.css'
import { Button } from 'react-bootstrap';

class LessonTeacherList extends Component {
    constructor(props) {
        super(props);
        let filteredAvailable = [];
        let dontFilter = false;
        console.log(props);
        let errorAvailable = (props.available.length === 0) ? 'No existen profesores registrados.' : '';
        let errorAssigned = '';
        if (props.assigned.length === 0) {
            errorAssigned = 'Ningun profesor esta asignado a la clase.';
            dontFilter = true; 
        } else {
            for (var currentAssigned in props.assigned) {
                for (var currenteAvailable in props.available) {
                    // console.log('currentAssigned:' + currentAssigned + ' // currentAvailable:' + currenteAvailable);
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
    };

    handleModifyTeacherList = (e, i, type) => {
        e.preventDefault();
        let teachersAvailable = this.state.teachersAvailable;
        let teachersAssigned = this.state.teachersAssigned;
        if (type === '+') {
            teachersAssigned.push(teachersAvailable[i]);
            teachersAvailable.splice(i, 1);
        } else if (type === '-') {
            teachersAvailable.push(teachersAssigned[i]);
            teachersAssigned.splice(i, 1);
        } else console.log('[LessonTeacherList] invalid modification type');
        const errorAvailable = (teachersAvailable.length === 0) ? 'No existen profesores registrados.' : '';
        const errorAssigned = (teachersAssigned === 0) ? 'Ningun profesor esta asignado a la clase.' : '';
        // console.log(this.state.teachersAssigned);
        this.props.onChange(this.state.teachersAssigned, 'teachers');
        this.setState({
            teachersAvailable: teachersAvailable, 
            teachersAssigned: teachersAssigned,
            errorAvailable: errorAvailable,
            errorAssigned: errorAssigned,
        });
    };

    render() {
        // console.log('[LessonTeacherList] render');
        // console.log(this.state);
        return (
            <div><h6 className={this.props.error && 'text text-danger'}>{this.props.error}</h6>
                <div className={'teachers-container ' + (this.props.error && 'border border-danger')}>
                    <div className='m-2 right-border'>
                        <h5>Lista de profesores disponibles:</h5>
                        <h6 className='text text-danger'>{this.state.errorAvailable}</h6>
                        {
                            this.state.teachersAvailable.map((teacher, i) => (
                                <div className='teachers-list-item' key={i}>
                                    <h6>{teacher.name + ' ' + teacher.surname}</h6>
                                    <Button className='btn btn-success' onClick={e => this.handleModifyTeacherList(e, i, '+')}>Agregar</Button>
                                </div>
                            ))
                        }
                    </div>
                    <span className='vertical-separator'/>
                    <div className='m-2'>
                        <h5>Lista de profesores asignados</h5>
                        <h6 className='text text-danger'>{this.state.errorAssigned}</h6>
                        {
                            this.state.teachersAssigned.map((teacher, i) => (
                                <div className='teachers-list-item' key={i}>
                                    <h6>{teacher.name + ' ' + teacher.surname}</h6>
                                    <Button className='btn btn-danger' onClick={e => this.handleModifyTeacherList(e, i, '-')}>Quitar</Button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
};

export default LessonTeacherList;
