import React from 'react';
import './home.css';

export default class HubCard extends React.Component {
  constructor(props) {
    super(props);

    console.log(props.title);
    this.title = props.title;
    this.description = props.description;
    this.imageURL = props.imageURL;
  };

  renderItems = () => {
    return (
      <div className="hub-card">
        {/*<img alt='' src={this.imageURL}/>*/}
        <h5>{this.title}</h5>
        <p>{this.description}</p>
      </div>
    );
  };

  render() {
    return (this.renderItems());
  };
}