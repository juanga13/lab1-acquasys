import React, {Component} from 'react';

export default class MyForm extends Component {
  handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data);
    fetch('/api/form-submit-url', {
      method: 'POST',
      body: data,
    });
  };

  // ====================================
  // update state of all elements at once
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  // ====================================

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">Enter username</label>
        <input id="username" name="username" type="text" />

        <label htmlFor="email">Enter your email</label>
        <input id="email" name="email" type="text" />

        <label htmlFor="birthdate">Enter your birth date</label>
        <input id="birthdate" name="birthdate" type="text" />

        <button>Send data!</button>
      </form>
    );
  }
}