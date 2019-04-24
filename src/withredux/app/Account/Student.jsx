import React, {Component} from 'react';

class Student extends Component {
  render() {
    return (
      <div>
        <p>
          Mis datos
          SIN VERIFICAR:
          "La cuenta no esta verificada"

          VERIFICADA:
          Lista de clases
          -----------------
          Calendario
          Mensajeria
        </p>
      </div>
    );
  }
}

export default Student;