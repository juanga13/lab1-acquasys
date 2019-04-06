import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

export default class PageNav extends Component {
  constructor(props, urls) {
    super(props);
    this.urls= urls;
  }

  onPageChange = number => {

  };

  setup() {
    let items = [];
    for (let i=0; i<this.urls.length;i++) {
      items.push(<Button onClick={() => this.onPageChange(i)}>{i}</Button>)
    }
  }

  render() {
    return (
      <div>
        {

        }
      </div>
    );
  };
}