import React from 'react';
import {Form} from 'react-bootstrap';
import '../css/form.css';

const DurationInput = props => (
    <Form.Group className='form-group'>
        <Form.Label className='form-label' controlId={props.id}>{props.title}</Form.Label>
        <Form.Control
            className={'form-control ' + (props.error && 'border border-danger')}
            id={props.id}
            type='number'
            value={props.value}
            onChange={props.onChange}
            placeholder={props.title}
            autoFocus={props.autoFocus}
        />
        <h6>{props.unit}</h6>
        <h6 className='text-danger form-error-text'>{props.error}</h6>
    </Form.Group>
);

export default DurationInput;