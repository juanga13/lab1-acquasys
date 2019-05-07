import React, {Component} from 'react';
import ReactModal from 'react-modal';
import {Form, Row} from 'react-bootstrap';

class AddModal extends Component {
  render() {
    console.log("AddModal render");
    if (this.props.isModalOpen) return (
      <ReactModal 
        isOpen={this.props.isModalOpen}
        onRequestClose={this.props.onModalClose}
        contentLabel="Minimal Modal Example"
      >
        <Form>
          <Form.Group as={Row}>
            <Form.Label>

            </Form.Label>
            <Form.Control/>
          </Form.Group>
        </Form>
      </ReactModal>
   ) 
   else return null;
  }
}

export default AddModal;