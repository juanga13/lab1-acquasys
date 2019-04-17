import React, {Component} from 'react';
import News from "./News";
import Hub from "./Hub";
import './home.css';

import {Button} from 'react-bootstrap';

/**
 * Home Component
 *
 * Description: Homepage container component
 **/
export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    console.log(sessionStorage.getItem("tokenSss"));
  };

  render() {
    return(
      <div className='home'>
        <Button onClick={this.handleClick}>Click me</Button>
        <News/>
        <Hub/>
      </div>
    );
  };
}