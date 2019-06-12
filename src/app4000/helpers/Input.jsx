import React from 'react';
import {Form, Row} from 'react-bootstrap';
import DataVerifier from '../DataVerifier';

const Input = props => (
    <Form.Group>
        <Row>
            <Form.Label>{props.title}</Form.Label>
            <Form.Control
                id={props.id}
                type={props.type}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.title}
                autoFocus={props.autoFocus}
            />
        </Row>
        {/* {DataVerifier.verify(props.type, props.value)} */}
    </Form.Group>
);

export default Input;