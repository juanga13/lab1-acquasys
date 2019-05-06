import React from 'react';
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import uuid from 'uuid/v4';
import { addArticle } from "../js/actions";
import {connect} from "react-redux";

function mapDispatchToProps(dispatch) {
  // now props has redux action (ADD_ARTICLE)
  return { addArticle: article => dispatch(addArticle(article)) };
}

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
    this.setState({title: event.target.value});
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title } = this.state;  // get title from local state
    const id = uuid();  // apparently a library for id's
    console.log("id is: " + id);  // is id working?
    this.props.addArticle({title, id});  // use redux action to save new article title in store
    this.setState({title: '' });  // clear local state
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

const Form2 = connect(null, mapDispatchToProps)(First);  // connect First component to a function

export default Form2;