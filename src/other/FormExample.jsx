import React, {Component} from 'react';

export default class FormExample extends Component {
  handleSubmit = event => {
    event.preventDefault();
    console.log(event.target.username.value);
    var data = new FormData(event.target);
    data.append('clock', 'is ticking');
    console.log(event.target);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>HI</label>
          <input id='username'/>
          <button type='submit'>Button</button>
        </form>
      </div>
    );
  };
}