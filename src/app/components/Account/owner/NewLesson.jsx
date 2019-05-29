import React, {Component} from 'react';
import {Button, Form, Row, Dropdown, Col, Label} from 'react-bootstrap';
import ReactModal from 'react-modal';
import RequestManager from '../../../network/RequestManager.jsx'
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from "react-datepicker";
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
registerLocale('es', es);
setDefaultLocale('es');

class NewClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: localStorage.getItem("token"),
      isModalOpen: false,
      showEditModal: false,
      editDNI: '',
      showDeleteModal: false,
      deleteDNI: '',
      errors: {
        name: false,
        duration: false,
        weekday: false,
        hour: false, 
        minutes: false,
      },
      name: "",
      duration: -1,
      weekday: -1,
      hour: -1,
      minutes: -1,
      date: '',
      startDate : new Date("1970/01/01"),
      endDate: new Date("1970/01/01")
    }
  }

  handleAddStudent = event => {
    event.preventDefault();
    this.setState({ isModalOpen: true });
  };

  handleDateChange = ({ startDate, endDate }) => {
    startDate = startDate || this.state.startDate;
    endDate = endDate || this.state.endDate;

    if (startDate.getMilliseconds() > endDate.getMilliseconds()) {
      endDate = startDate;
    }

    this.setState({ startDate, endDate });
  };

  handleChangeStart = startDate => this.handleDateChange({ startDate });

  handleChangeEnd = endDate => this.handleDateChange({ endDate });

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
    }});
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
      startDate: this.state.startDate.getTime(),
      endDate: this.state.endDate.getTime()
    };

    console.log(data);
    console.log("token: " + this.state.token);

    fetch(RequestManager.baseUrl + "/api/admin/createLesson", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: 
        {
          "Content-Type": "application/json",
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
      return <h6 className="text-success">Nueva clase registrada correctamente</h6>;
    }
  };
  
  handleLessonEdit = (DNI) => {
    // this.setState({showEditModal: true, editDNI: DNI});
  };

  handleLessonDelete = (lesson) => {
    // this.setState({showDeleteModal: true, deleteDNI: DNI});
  };

  renderStudentList = () => {
    const testLesson = [  // test
      ["bebes", "jueves", "11:00"],
      ["nenes 1", "martes", "15:00"],
      ["bebes", "sabado", "9:00"],
      ["embarazadas", "martes", "16:00"],
      ["nenes 2", "lunes", "18:30"],
      ["adultos", "viernes", "19:00"],
    ];
    
    // TODO getAllLessons request
    
    return (
      <div>
        {testLesson.map((item) => (  
          <Row className="p-2">
            <h6 className="p-2 m-auto">{item[0]}</h6>
            <h6 className="p-2 m-auto">{item[1]}</h6>
            <Button 
              className="btn btn-secondary p-2 m-auto" 
              onClick={() => (this.handleLessonEdit(item))} // TODO
            >Editar</Button>
            <Button 
              className="btn btn-danger p-2 m-auto" 
              onClick={() => (this.handleLessonDelete(item))}  // TODO
            >Eliminar</Button>
          </Row>
        ))}
      </div>  
    );
  };

  render() {
    return (
      <div>
        <h3>Clases</h3>
        {this.renderNotification()}
        <Button className="btn btn-info" onClick={this.handleAddStudent}>Agregar una nueva clase</Button>
        {this.renderStudentList()}
        
        <ReactModal
          className="modal-form"
          isOpen={this.state.isModalOpen}
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
            {(this.state.errors.name) && <h6 className="text-danger">Nombre invalido</h6>}
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
            {(this.state.errors.weekday) && <h6 className="text-danger">Dia invalido</h6>}
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
            {(this.state.errors.duration) && <h6 className="text-danger">Duracion invalida</h6>}
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
            {(this.state.errors.hour || this.state.errors.minutes) && <h6 className="text-danger">Horario invalido</h6>}
            <Form.Group as={Row}>
              <DatePicker
                  selected={this.state.startDate}
                  selectsStart
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onChange={this.handleChangeStart}
              />

              <DatePicker
                  selected={this.state.endDate}
                  selectsEnd
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onChange={this.handleChangeEnd}
              />
            </Form.Group>
            <Row className="modal-form-button-container">
              <Button type="submit">Agregar clase</Button>
              <Button
                onClick={this.cancelModal}
                className="btn btn-secondary modal-button"
              >Cancelar</Button>
            </Row>
          </Form>
        </ReactModal>
        {/* edit modal */}
        <ReactModal>
          
        </ReactModal>
        {/* delete modal */}
        <ReactModal>
          <p>Esta seguro que quiere eliminar</p>
        </ReactModal>
      </div>
    );
  }
}

export default NewClass;
