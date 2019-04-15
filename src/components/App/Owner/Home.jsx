import React, {Component, Fragment} from 'react';
import News from "../Home";
import {Row, Button} from 'react-bootstrap';

export default class Home extends Component {
  render() {
    return(
      <Fragment>
        <News/>
        <h3>Logged in Owner</h3>
        <Row>
          <Button>Administrar Profesoras</Button>
          <Button>Administrar Alumnos</Button>
          <Button>Administrar Clases</Button>
        </Row>
      </Fragment>
    );
  }
};