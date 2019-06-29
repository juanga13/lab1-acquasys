import React from 'react';
import {Form, Dropdown, DropdownButton, Button} from 'react-bootstrap';
import '../css/form.css';

const weeks = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

const WeekdayInput = props => (
    <Form.Group className='form-group'>
        <Form.Label className='form-label' controlId={props.id}>{props.title}</Form.Label>
        {
            props.value.map((currentWeekday, index) => (<DropdownButton
                title={currentWeekday}
                className={'form-calendar'}
            >
                {weeks.map((weekday) =>
                    <Dropdown.Item
                        className="form-calendar-item"
                        key={weekday}
                        onClick={() => props.onChangeWeekday(weekday, index)}
                    >{weekday}</Dropdown.Item>)}
            </DropdownButton>
            ))
        }
        <Button className='btn btn-success' onClick={props.onAdditionalWeekday}>+</Button>
        <Button className='btn btn-danger' onClick={props.onFewerWeekday}>-</Button>
        <h6 className='text-danger form-error-text'>{props.error}</h6>
    </Form.Group>
);

export default WeekdayInput;