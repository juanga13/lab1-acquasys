import React from 'react';
import {Button} from "react-bootstrap";
import List from "./List";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      homeName: '',
    }
  }

  handle = () => {
    console.log('clicked "Set first" button.');
    this.setState({homeName: 'SweetHomeAlabama'});
  };

  render() {
    return (
      <div>
        <h2>Home</h2>
        <h2>Articles</h2>
        <div>
          <List/>
        </div>
        <Button onClick={this.handle}>Take me home</Button>
      </div>
    );
  }
}

export default Home;