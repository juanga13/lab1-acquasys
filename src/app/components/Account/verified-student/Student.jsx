import React, {Component, Fragment} from 'react';
import {Row, Button} from 'react-bootstrap';
import ReactModal from 'react-modal';
import RequestManager from '../../../network/RequestManager';

class Student extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: localStorage.getItem('token'),
      enrolledLessons: null,
      enrolledLoadedLessons: false,
      unenrolledLessons: null,
      loadedUnenrolledLessons: false,

      isEnrollModalOpen: false,
    };
  };

  comonentWillMount() {
    // fetch lessons
    fetch(RequestManager.baseUrl + '/api/user/ALGO ACA' + this.state.token, {
      method: "GET",  a
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.state.token 
      },
      redirect: "follow",
      referrer: "no-referrer",
    }).then(response => {
      return response.json()
    }).then(lessons => {
      this.setState({enrolledLessons: lessons, loadedEnrolledLessons: true});
    }) // second fetch, unsuscribedLessons
    .then(fetch(RequestManager.baseUrl + '/api/user/OTRO ALGO ACA' + this.state.token, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.state.token 
        },
        redirect: "follow",
        referrer: "no-referrer",
      }).then(response => {
        return response.json()
      }).then(lessons => {
        this.setState({unenrolledLessons: lessons, loadedUnenrolledLessons: true});
      }));
  };

  renderEnrolledLessons = () => {
    return (this.state.loadedEnrolledLessons) 
      ? <div>
        {this.enrolledLessons.map((name, weekday, hour, minute, id) => (
          <Row id={id}>
            <h6>{name}</h6>
            <br/>
            <h6>{weekday}</h6>
            <br/>
            <h6>{hour + ":" + minute}</h6>
          </Row>
        ))}
      </div>
      : null;
  };

  renderUnenrolledLessons = () => {
    return (this.state.loadedUnenrolledLessons)
      ? <div>
        {this.unenrolledLessons.map((name, weekday, hour, minute, id) => (
          <Row id={id}>
            <h6>{name}</h6>
            <br/>
            <h6>{weekday}</h6>
            <br/>
            <h6>{hour + ":" + minute}</h6>
            <Button onClick={() => this.handleEnroll(id)}>Inscribirse</Button>  
          </Row>
        ))}
      </div>
      : null;
  };

  handleEnrollModal = event => {
    event.preventDefault();
    this.setState({isEnrollModalOpen: true});
  };

  handleEnroll = id => {
    fetch(RequestManager.baseUrl + "/api/user/enroll/" + {id}, {

    }).then(

      // on success
      localStorage.setItem("newEnrollNotification", )
    )
      .then();
  }

  render() {
    return (
      <Fragment>
        <Button onClick={this.handleEnrollModal}>Inscribirse a una nueva clase</Button>
        <br/>
        <h5>Clases que estas inscripto</h5>
        {this.renderEnrolledLessons()}

        <ReactModal
          className="modal-form"
          isOpen={this.state.isEnrollModalOpen}
        >
          {this.renderUnenrolledLessons()}
        </ReactModal>
      </Fragment>
    );
  };
}

export default Student;