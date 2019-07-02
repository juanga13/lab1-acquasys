import React, {Component} from 'react';
import {Form, Button, Row} from 'react-bootstrap';
import Input from '../helpers/Input';
import DatePicker, { registerLocale, setDefaultLocale }  from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import LessonDayList from './LessonDayList';
import LessonTeacherList from './LessonTeacherList';

registerLocale('es', es);
setDefaultLocale('es');

const emptyLessonDay = {day: 'Lunes', hour: 0, minutes: 0, duration: 0};
const emptyFields = {name: '', teachers: [], startDate: new Date(), endDate: new Date(), weekdays: [emptyLessonDay,]};
const emptyErrors = {  // since default value for errors is empty string
    name: '', teachers: '', startDate: '', endDate: ''
};

class LessonsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: (props.fields === null) ? emptyFields : props.fields,
            validateLessonDayList: false,
            errors: emptyErrors,
        };
    };

    handleChange = (event, text) => {
        if (event instanceof Date) {  
            const time = event.getTime();
            if (text === 'startDate') {
                (time > this.state.fields.endDate) 
                    ? this.setState({errors: {
                        ...this.state.errors, 
                        startDate: 'El dia de comienzo no puede ser mayor a la de terminacion.'
                    }})
                    : this.setState({
                        fields: {...this.state.fields, startDate: new Date(time)},
                        errors: {...this.state.errors, startDate: ''}
                    });
            } 
            if (text === 'endDate') {
                (time < this.state.fields.startDate) 
                    ? this.setState({errors: {
                        ...this.state.errors,
                        endDate: 'El dia de terminacion no puede ser menro a la de comienzo.'
                    }})
                    : this.setState({
                        fields: {...this.state.fields, endDate: new Date(time)},
                        errors: {...this.state.errors, endDate: ''}
                    });
            }
        } else {
            this.setState({...this.state, fields: {...this.state.fields, [event.target.id]: event.target.value}});
        }
    };

    handleLessonDayList = (event, type) => {
        event.preventDefault();
        let weekdays = this.state.fields.weekdays;
        let errorLessonDayList = this.state.errors.weekdays;
        if (type === '+') {
            weekdays.push(emptyLessonDay);   
        } else if (type === '-') {
            weekdays.pop(); 
        }   
        this.setState({...this.state, 
            fields: {...this.state.fields, weekdays: weekdays},
            errors: {...this.state.errors, weekdays: errorLessonDayList}
        });
    };

    handleSubmit = (event) => {
        console.log(this.state);
        event.preventDefault();
        let isValid = true;
        let errors = this.state.errors;
        let fields = this.state.fields;
        fields.startDate = this.state.fields.startDate.getTime();
        fields.endDate = this.state.fields.endDate.getTime();
        if (this.state.fields.name.length === 0) {
            errors = {...this.state.errors, name: 'El nombre de la clase no puede estar vacio.'}
            isValid = false;
        }
        this.setState({errors: errors});
        if (isValid) this.props.onAddConfirm(event, this.state.fields);  // props call
    };

    handleCancel = event => {
        event.preventDefault();
        this.setState({fields: emptyFields, errors: emptyErrors});
        this.props.onAddCancel(event);
    };

    render() {
        console.log('[lesson form] render');
        // console.log(this.props.teachers);
        return (<Form className='form-container'>
            <Row>
                <Button onClick={this.handleSubmit}>Aceptar</Button>
                <Button onClick={this.handleCancel}>Cancelar</Button>
            </Row>
            <Input id='name' type='name' title='Nombre' value={this.state.fields.name} onChange={this.handleChange} error={this.state.errors.name} autoFocus/>
            <Row><h5>Fecha de inicio: </h5>
                <DatePicker
                    selectsStart 
                    selected={this.state.fields.startDate} 
                    startDate={this.state.fields.startDate} 
                    endDate={this.state.fields.endDate} 
                    dateFormat="dd/MM/YYYY" 
                    onChange={e => this.handleChange(e, 'startDate')}
                />
            <h6 className='text text-danger'>{this.state.errors.startDate}</h6></Row>
            <Row><h5>Fecha de terminacion: </h5>
                <DatePicker 
                    selectsEnd 
                    selected={this.state.fields.endDate} 
                    startDate={this.state.fields.startDate} 
                    endDate={this.state.fields.endDate} 
                    dateFormat="dd/MM/YYYY" 
                    onChange={e => this.handleChange(e, 'endDate')}
                />
            <h6 className='text text-danger'>{this.state.errors.endDate}</h6></Row>
            <Row><h5>Dias que se daran las clases:</h5>
            <Button className='btn btn-success' onClick={(e) => this.handleLessonDayList(e, '+')}>Agregar un dia</Button>
            <Button className='btn btn-danger' onClick={(e) => this.handleLessonDayList(e, '-')}>Quitar ultimo dia</Button></Row>
            <LessonTeacherList
               // idLesson={}  // TODO: if in editMode pass id
                available={this.props.teachers}
                assigned={[]}  // TODO: facu back
                onChange={this.handleChange}
            />
            <LessonDayList
                list={this.state.fields.weekdays}
                validate={this.state.validateLessonDayList}
                onChange={this.handleChange}
            />
        </Form>);
    };
};

export default LessonsForm;
