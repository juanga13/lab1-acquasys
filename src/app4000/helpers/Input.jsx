import React from 'react';
import {Form} from 'react-bootstrap';
import '../css/form.css';

const Input = props => (
    <Form.Group className='form-group'>
        <Form.Label className='form-label' controlid={props.id}>{props.title}</Form.Label>
        <Form.Control
            className={
                (props.type === 'number' ? 'form-control-number ' : 'form-control ')}
            id={props.id}
            type={props.type}
            pattern={(props.type === 'number') ? '[0-9]*' : ''}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.title}
            autoFocus={props.autoFocus}
            disabled={props.disabled}
        />
        <h6>{props.unit}</h6>
        <h6 className='text-danger form-error-text'>{props.error}</h6>
    </Form.Group>
);

export default Input;