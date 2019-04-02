import React, {Component} from 'react';
// import {Button} from 'react-bootstrap';

export default class LoginPage extends Component {
  handleLogin = () => {

  };

  render() {
    return (
      <React.Fragment>
        <form placeholder="Usuario"/>
        <form placeholder="Contrasenia"/>
        <button onClick={this.handleLogin}>Hi</button>
      </React.Fragment>
    )
  };
}