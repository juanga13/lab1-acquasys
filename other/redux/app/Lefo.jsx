import React from 'react';
import {Button} from "react-bootstrap";
import store from "../js/store";
import {addArticle} from "../js/actions";

class Lefo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lefo: 'lefo',
    }
  }

  handle = () => {
    console.log('clicked "lefo" button.');
    // this.setState({lefo: this.state.lefo.concat("-chan")});
    store.dispatch(addArticle({title: 'lefo-chan', id: '1'}))
  };

  render() {
    return (
      <div>
        <h2>Lefo</h2>
        <Button onClick={this.handle}>LEFO LEFO LEFO</Button>
        <Button onClick={this.handle}>LEFO LEFO LEFO</Button>
        <Button onClick={this.handle}>LEFO LEFO LEFO</Button>
        <Button onClick={this.handle}>LEFO LEFO LEFO</Button>
        <Button onClick={this.handle}>LEFO LEFO LEFO</Button>
      </div>
    );
  }
}

export default Lefo;