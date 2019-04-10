import React, {Component} from 'react';
import {Form, Col, Row} from 'react-bootstrap';

export default class SecondPage extends Component {
  get id() {
    return this._id;
  }
  constructor(props) {
    super(props);

    super._id = 4;
    this.state = {
      validated: false
    };
  };

  render() {
    return(
      <div className={"register-page-sub"}>
        <h3>Second Register Page</h3>
        <Form.Group as={Row}>
          <Form.Label column>DNI</Form.Label>
          <Col><Form.Control value={this.state.dni}
                             id="dni"
                             type="number"
                             placeholder="DNI"
                             onChange={this.handleChange}/></Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column>Obra Social</Form.Label>
          <Col><Form.Control value={this.state.socialPlan}
                             id="socialPlan"
                             type="name"
                             placeholder="Obra Social"
                             onChange={this.handleChange}/></Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column>Numero de afiliado</Form.Label>
          <Col><Form.Control value={this.state.affiliateNumber}
                             id="affiliateNumber"
                             type="number"
                             placeholder="Numero de afiliado"
                             onChange={this.handleChange}/></Col>
        </Form.Group>

      </div>
    );
  };
}