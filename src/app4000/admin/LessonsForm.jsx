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
const emptyFields = {name: '', assigned: [], startDate: new Date(), endDate: new Date(), weekdays: [emptyLessonDay,]};
const emptyErrors = {  // since default value for errors is empty string
    name: '', teachers: '', startDate: '', endDate: '', weekdays: ''
};

class LessonsForm extends Component {
    constructor(props) {
        super(props);
        /** props:
         *  - fields: {name, [assigned], startDate, endDate, [weekdays]}
         *  - teachers: this.props.teachers (all teachers available)
         */
        let fields = emptyFields;
        if (props.fields !== null) {
            fields = props.fields
            fields.startDate = new Date(fields.startDate);
            fields.startDate = new Date(fields.endDate);
        }
        this.state = {
            fields: fields,
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
        } else if (text === 'teachers') {  // event is and array
            const teachers = event;
            this.setState({...this.state, fields: {...this.state.fields, teachers: teachers}});
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
        // LESSON DATA TEMPLATE {name, [teachers], startDate, endDate, [weekdays]}
        console.log('[LessonForm] handleSubmit');
        console.log(this.state);
        event.preventDefault();
        let isValid = true;
        let errors = this.state.errors;
        if (this.state.fields.name.length === 0) {  // check name (the only checkeable field in this component)
            errors = {...errors, name: 'El nombre de la clase no puede estar vacio.'}
            isValid = false;
        }
        if (this.state.fields.teachers.length === 0) {  // teachers check
            errors.teachers = 'Tiene que haber por lo menos 1 profesor asignado a la clase.'
            isValid = false;   
        }
        // TODO: weekdays check
        if (isValid) {
            let fields = Object.assign({}, this.state.fields);
            fields.startDate = fields.startDate.getTime();
            fields.endDate = fields.endDate.getTime();

            // teachers list to just ids.
            let teachersId = [];
            for (var i in fields.teachers) {
                teachersId.push(fields.teachers[i].id);
            }
            fields.teachers = teachersId;

            delete fields.assigned;
            this.props.onAddConfirm(event, fields);  // props call
        } else this.setState({errors: errors});
    };

    handleCancel = event => {
        event.preventDefault();
        this.setState({fields: emptyFields, errors: emptyErrors});
        this.props.onAddCancel(event);
    };

    render() {
        console.log('[LessonForm] render');
        console.log(this.state);
        console.log(this.props);
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
            <span className='horizontal-separator'/>
            <LessonTeacherList
                available={this.props.teachers}
                assigned={(this.props.fields && this.props.fields.assigned) || []}
                onChange={this.handleChange}
                error={this.state.errors.teachers}
            />
            <LessonDayList
                list={this.state.fields.weekdays}
                validate={this.state.validateLessonDayList}
                onChange={(this.handleChange)}
            />
        </Form>);
    };
};

export default LessonsForm;
