import React from 'react';
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

class First extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFirst: 0,
      title: '',
    }
  }

  handle = () => {
    console.log('clicked "Set first" button.');
    this.setState({isFirst: this.state.isFirst++});
  };

  handleChange = event => {
    event.preventDefault();
    console.log("HANDLING CHANGE");
    this.setState({title: event.target.title});
  };

  handleSubmit = event => {
    // console.log("submited nothing, hurray!!")
    event.preventDefault();
    const { title } = this.state;
    const id = uuidv1();
  };

  render() {
    return (
      <div>
        <h2>SURPRISE ITS A FORM</h2>
        <h6>now complete it</h6>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Article title</Form.Label>
            <Form.Control id='title'
                          type='name'
                          placeholder='not lefo'
                          onChange={this.handleChange}/>
          </Form.Group>
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default First;