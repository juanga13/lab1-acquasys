import React, {Component} from 'react';
import {FormControl, FormGroup, FormLabel} from "react-bootstrap";

export default class RegisterThirdPage extends Component{
  render() {
    return (
      <div>
        <h1>Third Page</h1>
        <form>
          <FormGroup>
            <FormLabel>useless input of third page</FormLabel>
            <FormControl type="name"/>
          </FormGroup>
        </form>
      </div>
    )
  };
}