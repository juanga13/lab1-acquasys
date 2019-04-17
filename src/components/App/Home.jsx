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

  render() {
    return(
      <div className='home'>
        <News cookies={this.props.cookies}/>
        <Hub/>
      </div>
    );
  };
}