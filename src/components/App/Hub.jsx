import React, {Component} from 'react';
import './home.css';
import HubCard from "./HubCard";

export default class Hub extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='hub'>
        <h3>HUB div</h3>
        <HubCard title="Title" description="This is a description" imageURL="https://picsum.photos/200/200/?random"/>
      </div>
    );
  };
}