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
    name: '', duration: 0, weekday: 'Lunes', 
    hour: 0, minutes: 0, startDate: new Date(), endDate: new Date()
};

class LessonsForm extends Component {
    constructor(props) {
        console.log('constructor of students form')
        super(props);
        this.state = {
            fields: (props.fields === null) ? emptyForm : props.fields,
            errors: emptyForm,
        };
        // console.log()
    };

    handleChange = event => {
        event.preventDefault();
        this.setState({fields: {...this.state.fields, [event.target.id]: event.target.value}});
    };

    handleDateChange = ({ startDate, endDate }) => {
        startDate = startDate || this.state.startDate;
        endDate = endDate || this.state.endDate;

        if (startDate.getMilliseconds() > endDate.getMilliseconds()) {
            endDate = startDate;
        }

        this.setState({ startDate, endDate });
    };
    
    handleChangeStart = startDate => this.handleDateChange({ startDate });

    handleChangeEnd = endDate => this.handleDateChange({ endDate });

    handleChangeWeekday = weekday => {
        console.log(weekday);
        this.setState({fields: {...this.state.fields, weekday: weekday}});
    };

    handleSubmit = (event) => {  
        event.preventDefault();
        let isValid = true;
        let errors = {};
        const values = Object.values(this.state.fields);
        Object.keys(this.state.fields).forEach((type, index) => {
            const value = values[index];
            errors[type] = DataVerifier._verify(type, value);
            if (errors[type] !== '') isValid = false; 
        });
        this.setState({...this.state, errors: errors});
        if (isValid) this.props.onAddConfirm(event, this.state.fields);  // props call
    };

    handleCancel = event => {
        event.preventDefault();
        this.setState({fields: emptyForm, errors: emptyForm});
        this.props.onAddCancel(event);
    };

    render() {
        console.log('render from lessons form')
        console.log(this.state.fields);
        return (<Form>
            <Row>
                <Button onClick={this.handleSubmit}>Aceptar</Button>
                <Button onClick={this.handleCancel}>Cancelar</Button>
            </Row>
            <Input id='name' title='Nombre' value={this.state.fields.name} onChange={this.handleChange} error={this.state.errors.name} placeholder='' autoFocus/>
            <DurationInput id='duration' title='Duración' unit='minutos' value={this.state.fields.duration} onChange={this.handleChange} error={this.state.errors.duration} placeholder=''/>
            <WeekdayInput id='weekday' title='Dia de la semana' value={this.state.fields.weekday} onChangeWeekday={this.handleChangeWeekday}/>
            <DatePicker selected={this.state.startDate} selectsStart startDate={this.state.startDate} endDate={this.state.endDate} dateFormat="dd/MM/YYYY" onChange={this.handleChangeStart}/>
            <DatePicker selected={this.state.endDate} selectsEnd startDate={this.state.startDate} endDate={this.state.endDate} dateFormat="dd/MM/YYYY" onChange={this.handleChangeEnd}/>
        </Form>);
    };
};

export default LessonsForm;