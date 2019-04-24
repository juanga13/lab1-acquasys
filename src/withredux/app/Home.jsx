import React, {Component} from 'react';
import {Button} from "react-bootstrap";

import store from './redux/store';
import { setTokenData } from './redux/actions';

class Home extends Component {
  handleTokenGiver = () => {
    store.dispatch(setTokenData("lefoChanInFormOfToken"));
  };

  render() {
    return (
      <div>
        <h1>Home</h1>
        <Button onClick={this.handleTokenGiver}>DAME TOKEN</Button>
      </div>
    );
  }
}

export default Home;