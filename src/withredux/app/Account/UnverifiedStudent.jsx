import React, {Component} from 'react';
import {Button} from "react-bootstrap";

class UnverifiedStudent extends Component {
  render() {
    return (
      <div>
        <h3>Mi cuenta</h3>
        <h5>rol: Alumno</h5>
        <h5>verificado: No verificado!</h5>
        <div className="border border-secondary m-1 p-1">
          <span>Test</span>
          <Button>Verificar</Button>
        </div>
      </div>
    );
  }
}

export default UnverifiedStudent;