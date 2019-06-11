import React from 'react';
import {Form} from 'react-bootstrap';

const Input = props => (
    <Form.Group>
        <Form.Label>{props.title}</Form.Label>
        <Form.Control
            id={props.id}
            type={props.type}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.title}
            autoFocus={props.autoFocus}
        />
        {(props.error) && (props.errorMessage)}
    </Form.Group>
);

export default Input;