import React, {Component} from 'react';
import {Button, Form, Row, Dropdown, Col} from 'react-bootstrap';
import ReactModal from 'react-modal';

class NewClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: this.props.token,
      isModalOpen: false,
      errors: {
        name: false,
        duration: false,
        weekday: false,
        hour: false, 
        minutes: false,
      },
      name: "",
      duration: '',
      weekday: "Seleccione un dia",
      hour: '',
      minutes: '',
      date: '',
    }
  }

  handleAddStudent = event => {
    event.preventDefault();
    this.setState({ isModalOpen: true });
  };

  cancelModal = () => {
    this.setState({
      isModalOpen: false,
      name: "",
      // default number value (invalid) is -1
      duration: "",
      weekday: "",
      hour: "",
      minutes: ""
    })
  };

  handleChange = event => {
    console.log(event.target.value);
    console.log(event.target.id === "minutes" && parseInt(event.target.value) > 59);
    event.preventDefault();
    if (event.target.id === "hour" && parseInt(event.target.value) > 23) 
      this.setState({hour: 23});
    else if (event.target.id === "minutes" && parseInt(event.target.value) >59)
      this.setState({minutes: 59});
    else this.setState({ [event.target.id]: event.target.value });
  };

  validateInputs() {
    console.log("current state: " + this.state.email);
    const name = this.state.name;
    const duration = this.state.duration;
    const weekday = this.state.weekday;
    const hour = this.state.hour;
    const minutes = this.state.minutes;
    this.setState({ errors: {
      name: (name.length === 0),
      duration: (duration === ''),  // minutes number input
      weekday: (weekday === 'Seleccione un dia'),  // dropdown of seven days
      hour: (hour === ''),  // starting time, dropdown from 06:00 to 05:00
      minutes: (minutes === '')  // starting time, number input
    }})
    return ( 
      name.length === 0
      || duration.length === 0
      || weekday === 'Seleccione un dia'
      || hour === ''
      || minutes === ''
    )
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.validateInputs()) {
      event.stopPropagation();
      return;
    }

    const data = {
      name: this.state.name,
      duration: this.state.duration,
      weekday: this.state.weekday,
      hour: this.state.hour,
      minutes: this.state.minutes,
    };

    console.log("token: " + this.state.token);
    fetch("http://172.22.44.128:8080/api/admin/createLesson", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: 
        { "Content-Type": "application/json",
          "Authorization": "Bearer " + this.state.token
        },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          // data is valid and could add to db
          console.log(response);
          this.setState({ registerSuccess: true });
          this.cancelModal();
        } else {
          // data is valid but cant add to db
          console.log(response);
        }
      })
      .catch(error => {
        console.log("Error: " + error)
      })
  };
  
  renderNotification = () => {
    if (this.state.registerSuccess) {
      this.setState({ registerSuccess: false });
      return <h6 className="text-success">Nuevo profesor registrado correctamente</h6>;
    }
  };

  renderNameError = () => {
    return (this.state.errors.name) && <h6 className="text-danger">Nombre invalido</h6> };
  renderWeekdayError = () => {
    console.log(this.state.weekday);
    return (this.state.errors.weekday) && <h6 className="text-danger">Dia invalido</h6> };
  renderDurationError = () => {
    return (this.state.errors.duration) && <h6 className="text-danger">Duracion invalida</h6> };
  renderHourMinutesError = () => {
      return (this.state.errors.hour || this.state.errors.minutes) && <h6 className="text-danger">Horario invalido</h6> };

  handleWeekDayChange = event => {
    // event.preventDefault();
    console.log(event);
    this.setState({weekday: event});
  }

  render() {
    return (
      <div>
        <h2>Alumnos</h2>
        {this.renderNotification()}
        <Button onClick={this.handleAddStudent}>Agregar un nuevo alumno</Button>
        {/* name: "",
      duration: -1,
      weekday: -1,
      hour: -1,
      minutes: -1,
      date: '', */}
        <ReactModal
          className="modal-form"
          isOpen={this.state.isModalOpen}
          onRequestClose={this.cancelModal}
          contentLabel="Add teacher modal"
        >
          <Form onSubmit={this.handleSubmit} >
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                id="name"
                type="name"
                autoFocus
                placeholder="Nombre"
                className={(this.state.errors.name) && "border border-danger"}
                onChange={this.handleChange}
              />
            </Form.Group>
            {this.renderNameError()}
            <Form.Group>
              <Dropdown 
                title={this.state.weekday} 
                className={(this.state.errors.weekday) && "border border-danger"}
              >
                {["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"].map(
                  (weekday) => 
                    <Dropdown.Item 
                      className="bg-default border border-dark" 
                      onClick={() => this.handleWeekDayChange(weekday)}
                    >
                      {weekday}
                  </Dropdown.Item>
                )}
                </Dropdown>
            </Form.Group>
            {this.renderWeekdayError()}
            <Form.Group>
              <Form.Label>Duracion (en minutos)</Form.Label>
              <Form.Control
                id="duration"
                type="number"
                placeholder="minutos"
                className={(this.state.errors.duration) && "border border-danger"}
                onChange={this.handleChange}
              />
            </Form.Group>
            {this.renderDurationError()}
            {/* const hourRange = [0, 23];}*/}
            {/*const minutesRange = [0, 59]; */}
            <Form.Group as={Row}>
              <Form.Label column>Hora de inicio</Form.Label>
              <Col><Form.Control
                id="hour"
                type="number"
                placeholder="16"
                value={this.state.hour}
                className={(this.state.errors.hour) && "border border-danger"}
                onChange={this.handleChange}
              /></Col>
              <span className="m-auto">:</span>
              <Col><Form.Control
                id="minutes"
                type="number"
                placeholder="58"
                value={this.state.minutes}
                className={(this.state.errors.minutes) && "border border-danger"}
                onChange={this.handleChange}
              /></Col>
            </Form.Group>
            {this.renderHourMinutesError()}
            <Row className="modal-form-button-container">
              <Button type="submit">Agregar nuevo profesor</Button>
              <Button
                onClick={this.cancelModal}
                className="btn btn-secondary modal-button"
              >Cancelar</Button>
            </Row>
          </Form>
        </ReactModal>
      </div>
    );
  }
}

export default NewClass;