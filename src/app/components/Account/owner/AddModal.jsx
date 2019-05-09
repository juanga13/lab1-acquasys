import React, {Component} from 'react';
import ReactModal from 'react-modal';

import NewStudent from './NewStudent';
import NewTeacher from './NewTeacher';
import NewClass from './NewClass';

class AddModal extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      isOpen: false,
      modalType: ""
    };
  }

  componentWillReceiveProps(newProps) {
    console.log("[AddModal] componentWillReceiveProps which is: ");
    console.log(newProps);
    this.setState({isOpen: newProps.isOpen, modalType: newProps.modalType});
    console.log("ADADADADADDDADA " + this.state.isOpen);
  }

  handleModalType = () => {
    
    if (!this.state.isOpen) return (
      <ReactModal 
        isOpen={true}
      >
        <div>
          <h1>modal should not be open</h1>
          <button onClick={this.props.onRequestClose}>close</button>
        </div>
      </ReactModal>
    );
    const modalType = this.props.modalType;
    if (modalType === "teacher") {
      console.log("modal type is new TEACHER");
      return (<NewTeacher/>);
    } else if (modalType === "student") {
      console.log("modal type is new STUDENT");
      return (<NewStudent/>);
    } else if (modalType === "class") {
      console.log("modal type is new CLASS");
      return (<NewClass/>);
    }
  };

  render() {
    console.log("[AddModal] rendering, state is {isOpen: " + this.state.isOpen + ", modalType: " + this.state.modalType + "}");
    
    return (
      <ReactModal
        isOpen={this.state.isOpen}
        onRequestClose={this.props.onModalClose}
      >
        {this.handleModalType()}
      </ReactModal>
    )
  }
}

export default AddModal;