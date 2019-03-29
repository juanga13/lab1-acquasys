import React, {Component} from 'react';

export default class MainContact extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: '#182b3c',
          height: '200px',
          color: '#afafb5',
          padding: '10px',
        }}
      >
        <h3>Main Contacts</h3>
        <p>This is were all the info about contact should be, and other things,
        like ie social links, number, address and language.</p>
      </div>
    );
  };
}