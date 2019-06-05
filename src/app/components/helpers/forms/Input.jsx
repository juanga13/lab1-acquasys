import {React} from 'react';
import {Form} from 'react-bootstrap';

const Input = props => {
  return (
    <Form.Group>
      <Form.Label htmlFor={props.id} className='form-label'>{props.title}</Form.Label>
      <Form.Control
        className='form-control'
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.handleChange}
      />
    </Form.Group>
  )
}

export default Input;