import React, {Component} from 'react';
import logo from './resources/logo.png';

export default class InitialPage extends Component {
  render() {
    return (
      <div>
        <h1>Main Page</h1>
        <img src={logo} alt="" style={{height: 200, width: 200}}/>
        <p>Hi this is a message from span after the logo xd</p>
      </div>
    )
  };
}