import React, {Component} from 'react';
import Input from '../helpers/Input';
import { Row, Dropdown, DropdownButton } from 'react-bootstrap';
import '../css/lesson.css'

const weekdays = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

class LessonDayList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: props.list,
        }
    };

    handleChange = (event, index) => {
        const id = event.target.id;
        let value = event.target.value;
        if (id === 'day') value = event.target.text;
        else {
            console.log(event.target);
            if (!event.target.validity.valid) return;  // prevents not numbers inputted. 
            console.log(id + ', ' + value);
            if (id === 'hour') {
                if (parseInt(value) < 0) value = 0; 
                if (parseInt(value) > 23) value = 23; 
            } else if (id === 'minutes') {
                if (parseInt(value) < 0) value = 0;
                if (parseInt(value) > 59) value = 59; 
            } else if (id === 'duration') { 
                if (parseInt(value) < 0) value = 0;
            }
        }
        const list = this.state.list;
        list[index] = {...this.state.list[index], [id]: value};
        this.setState({...this.state, list: list});
    };

    render() {
        return (<div className='weekdays-container'>{
            this.state.list.map((lessonDay, i) => (
                <div className='weekday-card-container'>
                    <DropdownButton
                            title={lessonDay.day}
                        >{weekdays.map(day => (
                            <Dropdown.Item
                                id='day'
                                title={i}  // used to pass index. 
                                className="weekdays-dropdown"
                                onClick={(e) => this.handleChange(e, i)}
                            >{day}</Dropdown.Item>
                        ))}</DropdownButton>
                    <Input id='duration' type='number' title='Duración'       unit='minutos' value={lessonDay.duration} onChange={(e) => this.handleChange(e, i)}/>               
                    <Row>
                        <Input id='hour'    type='number' title='Hora de inicio' unit='hs'   value={lessonDay.hour}     onChange={(e) => this.handleChange(e, i)} />
                        <Input id='minutes' type='number'                        unit='m'    value={lessonDay.minutes}  onChange={(e) => this.handleChange(e, i)}/> 
                    </Row>
                </div>
            ))
        }</div>)
    }
};

export default LessonDayList;