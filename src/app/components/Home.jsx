import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

class Home extends Component {
  constructor(props) {
    super(props);


    this.state = {input: ''};
  }

  handleInputChange = event => {
    event.preventDefault();
    this.setState({[event.target.id]: event.target.value})
  };

  handleLocalStorageUpload = event => {
    event.preventDefault();
    localStorage.setItem("demo", this.state.input);
  };

  componentWillMount() {
    const localStorageTitle = localStorage.getItem("demo");
    (localStorageTitle !== "")
      ? this.setState({input: localStorageTitle})
      : this.setState({input: "NOT TITLE GIVEN"});
  }

  render() {
    return (
      <div>
        <h1>{this.state.input}</h1>
        <input
          id='input'
          autoFocus
          placeholder="write something"
          onChange={this.handleInputChange}
        />
        <Button onClick={this.handleLocalStorageUpload}>upload to localStorage</Button>
      </div>
    );
  }
}

export default Home;