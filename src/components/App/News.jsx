import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import './home.css';

export default class News extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='news'>
        <h3>NEWS div</h3>
        <Button>Check if im logged</Button>
      </div>
    );
  };
}