import React from 'react';
import {Form} from 'react-bootstrap';
import DataVerifier from '../DataVerifier';
import '../form.css';

const Input = props => (
    <Form.Group className='form-group'>
        <Form.Label className='form-label' controlId={props.id}>{props.title}</Form.Label>
        <Form.Control
            className='form-control'
            id={props.id}
            type={props.type}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.title}
            autoFocus={props.autoFocus}
        />
        <Form.Control.Feedback>MUY BIEN</Form.Control.Feedback>
        <Form.Control.Feedback type='invalid'>MAL</Form.Control.Feedback>
        {/* {DataVerifier.verify(props.type, props.value)} */}
    </Form.Group>
);

export default Input;