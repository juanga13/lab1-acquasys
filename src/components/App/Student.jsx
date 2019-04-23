import React from 'react';

class Student extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      verified: props.verified,
    };
  }

  render() {
    if (this.state.verified) {
      return (
        <div>
          <h2>Clases</h2>
          <h2>Asistencias</h2>
          <h2>etc.</h2>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Usted no esta verificado!</h1>
          <h4>Cuando se validen tus datos podra acceder a las funcionalidades de la pagina.</h4>
        </div>
      )
    }
  }

}

export default Student;