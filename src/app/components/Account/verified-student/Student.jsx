import React, {Component} from 'react';

class Student extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>Mis datos</li>
          <li>SIN VERIFICAR:</li>
          <li>"La cuenta no esta verificada"</li>
        </ul>
        <ul>
          <li>VERIFICADA:</li>
          <li>Lista de clases</li>
          <li>-----------------</li>
          <li>Calendario</li>
          <li>Mensajeria</li>
        </ul>
      </div>
    );
  }
}

export default Student;