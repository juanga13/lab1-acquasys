import React from 'react';
import {Form, Dropdown, DropdownButton} from 'react-bootstrap';
import '../css/form.css';

const weeks = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

const WeekdayInput = props => (
    <Form.Group className='form-group'>
        <Form.Label className='form-label' controlId={props.id}>{props.title}</Form.Label>
        <DropdownButton
            title={props.value}
            className={'form-calendar ' + (props.error && 'border border-danger')}
        >
            {weeks.map((weekday) =>
                <Dropdown.Item
                    className="form-calendar-item"
                    key={weekday}
                    onClick={() => props.onChangeWeekday(weekday)}
                >{weekday}</Dropdown.Item>)}
        </DropdownButton>

        <h6 className='text-danger form-error-text'>{props.error}</h6>
    </Form.Group>
);

export default WeekdayInput;