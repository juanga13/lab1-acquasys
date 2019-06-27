import React, {Component} from 'react';
import {Form, Button, Row} from 'react-bootstrap';
import Input from '../helpers/Input';
import DataVerifier from '../DataVerifier';
import DatePicker, { registerLocale, setDefaultLocale }  from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import DurationInput from '../helpers/DurationInput';
import WeekdayInput from '../helpers/WeekdayInput';

registerLocale('es', es);
setDefaultLocale('es');

const emptyForm = {
    name: '', duration: 0, weekday: ['Lunes'], 
    hour: 0, minutes: 0, startDate: new Date(), endDate: new Date()
};

const emptyErrors = {  // since default value for errors is empty string
    name: '', duration: '', weekday: '', 
    hour: '', minutes: '', startDate: '', endDate: ''
};

class LessonsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: (props.fields === null) ? emptyForm : props.fields,
            errors: emptyErrors,
        };
    };

    handleChange = event => {
        event.preventDefault();
        this.setState({fields: {...this.state.fields, [event.target.id]: event.target.value}});
    };

    handleDateChange = ({ startDate, endDate }) => {
        startDate = startDate || this.state.fields.startDate;
        endDate = endDate || this.state.fields.endDate;

        // if (startDate.getMilliseconds() > endDate.getMilliseconds()) {
        //     endDate = startDate;
        // }

        this.setState({ startDate, endDate });
    };
    
    handleChangeStart = startDate => this.handleDateChange({ startDate });

    handleChangeEnd = endDate => this.handleDateChange({ endDate });

    handleChangeWeekday = (weekday, index) => {
        let newWeekday = this.state.fields.weekday;
        newWeekday[index] = weekday;
        this.setState({fields: {...this.state.fields, weekday: newWeekday}});
    };

    handleAdditionalWeekday = () => {
        let weekday = this.state.fields.weekday;
        weekday.push('Lunes');
        this.setState({
            fields: {...this.state.fields, weekday: weekday},
            errors: {...this.state.errors, weekday: ''}  // clear error if any})
        });
    };

    handleFewerWeekday = () => {
        let weekday = this.state.fields.weekday;
        if (weekday.length !== 1) {
           weekday.pop();
           this.setState({fields: {...this.state.fields, weekday: weekday}});   
        } else this.setState({errors: {...this.state.errors, weekday: 'La clase debe tener por lo menos 1 dia de la semana.'}});
    };

    handleSubmit = (event) => {  
        event.preventDefault();
        let isValid = true;
        let errors = {};
        let fields = this.state.fields;
        fields.startDate = this.state.fields.startDate.getTime();
        fields.endDate = this.state.fields.endDate.getTime();
        const values = Object.values(fields);  // values array
        Object.keys(this.state.fields).forEach((type, index) => {  // keys array
            const value = values[index];
            errors[type] = DataVerifier._verify(type, value);
            if (errors[type] !== '') isValid = false;  // the fields is invalid so !== ''
        });
        this.setState({errors: errors});
        if (isValid) this.props.onAddConfirm(event, this.state.fields);  // props call
    };

    handleCancel = event => {
        event.preventDefault();
        this.setState({fields: emptyForm, errors: emptyForm});
        this.props.onAddCancel(event);
    };

    render() {
        return (<Form>
            <Row>
                <Button onClick={this.handleSubmit}>Aceptar</Button>
                <Button onClick={this.handleCancel}>Cancelar</Button>
            </Row>
            <Input          id='name'    type='name'    title='Nombre'          value={this.state.fields.name}      onChange={this.handleChange} error={this.state.errors.name} placeholder='' autoFocus/>
            <Row className='align-items-center'>  
                <Input          id='hour'    type='number'  title='Hora de inicio'  value={this.state.fields.hour}      onChange={this.handleChange} error={this.state.errors.hour}/>
                <h6>hs</h6>
                <Input          id='minutes' type='number'                          value={this.state.fields.minutes}   onChange={this.handleChange} error={this.state.errors.minutes}/> 
                <h6>m</h6>
            </Row>
            <DurationInput  id='duration' title='Duración' unit='minutos'       value={this.state.fields.duration}  onChange={this.handleChange} error={this.state.errors.duration} placeholder=''/>
            <WeekdayInput   id='weekday'  title='Dia de la semana'              value={this.state.fields.weekday}   onChangeWeekday={this.handleChangeWeekday} 
                onAdditionalWeekday={this.handleAdditionalWeekday} onFewerWeekday={this.handleFewerWeekday} error={this.state.errors.weekday}/>
            <DatePicker selected={this.state.fields.startDate} selectsStart startDate={this.state.fields.startDate} endDate={this.state.fields.endDate} dateFormat="dd/MM/YYYY" onChange={this.handleChangeStart}/>
            <DatePicker selected={this.state.fields.endDate} selectsEnd startDate={this.state.fields.startDate} endDate={this.state.fields.endDate} dateFormat="dd/MM/YYYY" onChange={this.handleChangeEnd}/>
        </Form>);
    };
};

export default LessonsForm;