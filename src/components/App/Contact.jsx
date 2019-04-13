import React, {Component} from 'react';
import './contact.css';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

/**
 * Contact Component
 *
 * Description: has all contact info (phone, address, name, email
 * and social links)
 **/
export default class Contact extends Component {
  render() {
    return(
      <div className='contact'>
        <h5 className='contact-title'>Informacion de contacto</h5>
        <Row className='contact-row'>
          <Col>
            <h6>Juanito Juanitez</h6>
            <h6>E-mail</h6>
            <h6>Telefono</h6>
          </Col>
          <Col>
            <br/>
            <h6>juanito.juanitez@gmail.com</h6>
            <h6>+5301596848</h6>
          </Col>
        </Row>
      </div>
    );
  };
}