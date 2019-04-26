import React, {Component} from 'react';

class Owner extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>Crear Alumno</li>
          <li>Crear Profesor</li>
          <li>Creat Clase</li>
          <li>--------------</li>
          <li>Lista de alumnos (todos)</li>
          <li>    - Clases</li>
          <li>    - Asistencias</li>
          <li>Lista de profesores</li>
          <li>Lista de clases</li>
          <li>  - Lista de alumnos (parcial)</li>
          <li>---------------</li>
          <li>Calendario</li>
          <li>Mensajeria</li>
        </ul>
      </div>
    );
  }
}

export default Owner;