import React, {Component} from 'react';
import {Button, FormControl, FormGroup, FormLabel, Form} from "react-bootstrap";

export default class RegisterFirstPage extends Component {
  constructor(props) {
    super(props);

    this.areInputsValid = false;
    this.state = {};
  }


  postData(url: '', data= {}) {
    return fetch(url, {
      method: "POST",
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
      .then(response => response.json)
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    this.postData('http://172.22.41.200:8080/api/user/register', this.state);
  };

  handleChange = event => {
    console.log("inputs changed!... Handling like a boss");
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  isDisabled = event => {
    if (event.target.username.value.length > 0 &&
      event.target.username.value.length > 0) {
      return this.areInputsValid;
    }
  };

  render() {
    return (
      <div className='RegisterPage'>
        {/*<h1>First Page</h1>*/}
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <FormLabel>Username</FormLabel>
            <FormControl
              id="username"
              autoFocus
              type="name"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Password</FormLabel>
            <FormControl
              id="password"
              type="password"
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button
            type="submit"
            disables={!this.isDisabled}
          >
            Submit
          </Button>
        </form>
      </div>
    )
  };
}