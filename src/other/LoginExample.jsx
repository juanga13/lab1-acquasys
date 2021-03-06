import React, { Component } from "react";
import { Button, FormGroup, FormControl} from "react-bootstrap";
// import "./Login.withredux.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  };

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("Hi");
  };

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <span>Email</span>
            <FormControl
              autoFocus
              type="email"
              // value={this.state.email}
              // onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <span>Password</span>
            <FormControl
              // value={this.state.password}
              // onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            // block
            // bsSize="large"
            // disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  };
}