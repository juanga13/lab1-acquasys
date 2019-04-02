import React, {Component} from 'react';
import {FormControl, FormGroup, FormLabel} from "react-bootstrap";

export default class RegisterSecondPage extends Component{
  render() {
    return (
      <div>
        <h1>Second Page</h1>
        <form>
          <FormGroup>
            <FormLabel>useless input of second page</FormLabel>
            <FormControl type="name"/>
          </FormGroup>
        </form>
      </div>
    )
  };
}
