import React, {Component} from 'react';
import {Button, Form, Row, Dropdown, Col, Label} from 'react-bootstrap';
import ReactModal from 'react-modal';
import RequestManager from '../../../network/RequestManager.jsx'
import DatePicker from 'react-datepicker';
import {registerLocale, setDefaultLocale} from "react-datepicker";
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import DropdownButton from "react-bootstrap/DropdownButton";

registerLocale('es', es);
setDefaultLocale('es');

class NewClass extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lessons: null,
            teachers: null,
            loadedStudents: false,
            registerSuccess: false,
            editSuccess: false,
            deleteSuccess: false,
            token: localStorage.getItem("token"),
            isAddModalOpen: false,
            showEditModal: false,
            editDNI: '',
            showDeleteModal: false,
            deleteDNI: '',
            teacher: null,
            errors: {
                name: false,
                duration: false,
                weekday: false,
                hour: false,
                minutes: false,
            },
            id: null,
            name: "",
            duration: 30,
            weekday: "Lunes",
            hour: 0,
            minutes: 0,
            date: '',
            startDate: new Date(),
            endDate: new Date(),
        };

    }

    componentDidMount() {
        fetch(RequestManager.baseUrl + "/api/lesson/all", {
            method: "GET",
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
        })
            .then(response => {
                return response.json()
            }).then(lessons => {
            this.setState({lessons: lessons, loadedStudents: true});
        });
        fetch(RequestManager.baseUrl + "/api/teacher/all", {
            method: "GET",
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
        })
            .then(response => {
                return response.json()
            }).then(teachers => {
            this.setState({teachers: teachers, loadedTeachers: true});
        })
    }

    handleDateChange = ({startDate, endDate}) => {
        startDate = startDate || this.state.startDate;
        endDate = endDate || this.state.endDate;

        if (startDate.getMilliseconds() > endDate.getMilliseconds()) {
            endDate = startDate;
        }

        this.setState({startDate, endDate});
    };

    handleChangeStart = startDate => this.handleDateChange({startDate});

    handleChangeEnd = endDate => this.handleDateChange({endDate});

    handleWeekDayChange = wd => this.setState({weekday: wd});

    cancelAddModal = () => {
        this.setState({
            isAddModalOpen: false,
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
        else if (event.target.id === "minutes" && parseInt(event.target.value) > 59)
            this.setState({minutes: 59});
        else this.setState({[event.target.id]: event.target.value});
    };

    validateInputs() {
        console.log("current state: " + this.state.email);
        const name = this.state.name;
        const duration = this.state.duration;
        const weekday = this.state.weekday;
        const hour = this.state.hour;
        const minutes = this.state.minutes;
        this.setState({
            errors: {
                name: (name.length === 0),
                duration: (duration === ''),  // minutes number input
                weekday: (weekday === 'Seleccione un dia'),  // dropdown of seven days
                hour: (hour === ''),  // starting time, dropdown from 06:00 to 05:00
                minutes: (minutes === '')  // starting time, number input
            }
        });
        return (
            name.length === 0
            || duration.length === 0
            || weekday === 'Seleccione un dia'
            || hour === ''
            || minutes === ''
        )
    }


    handleAddSubmit = event => {
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
            endDate: this.state.endDate.getTime(),
            teachers: [this.state.teacher],
        };
        if (this.state.id) {
            data.id = this.state.id;
            this.setState({editLesson: null});
            fetch(RequestManager.baseUrl + "/api/lesson/update", {
                method: "PUT",
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
                        this.setState({registerSuccess: true});
                        this.cancelAddModal();
                        this.componentDidMount(); // Geteame la lista denuevo jajajajajaja
                        // TODO: no seas negro facundo metelo a manopla de la lista en vez de traer todo de nuevo JAJAJAJAJA
                    } else {
                        // data is valid but cant add to db
                        console.log(response);
                    }
                })
                .catch(error => {
                    console.log("Error: " + error)
                })
        } else {

            fetch(RequestManager.baseUrl + "/api/lesson/create", {
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
                        this.setState({registerSuccess: true});
                        this.cancelAddModal();
                        this.componentDidMount(); // Geteame la lista denuevo jajajajajaja
                        // TODO: no seas negro facundo metelo a manopla de la lista en vez de traer todo de nuevo JAJAJAJAJA
                    } else {
                        // data is valid but cant add to db
                        console.log(response);
                    }
                })
                .catch(error => {
                    console.log("Error: " + error)
                })
        }
    };

    renderNotification = () => {
        if (this.state.registerSuccess) {
            //NOTA MENTAL: SI PONES EL FALSE ACA SE RENDEREA POR 1 SOLO FRAME LA NOTIFICACION
            return <h6 className="text-success">Nueva clase registrada correctamente</h6>;
        }
    };

    handleLessonEdit = (lesson) => {
        this.setState({
            name: lesson.name,
            // default number value (invalid) is -1
            duration: lesson.duration,
            weekday: lesson.weekday,
            hour: lesson.hour,
            minutes: lesson.minutes,
            editLesson: lesson,
            startDate: new Date(lesson.startDate),
            endDate: new Date(lesson.endDate),
            id: lesson.id,
            isAddModalOpen: true
        });
    };

    handleLessonDelete = (lesson) => {
        fetch(RequestManager.baseUrl + "/api/lesson/delete/" + lesson.id, {
            method: "DELETE",
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
        })
            .then(response => {
                if (response.status === 200) {
                    this.setState({deleteSuccess: true})
                }
            }).then(x => {
            this.componentDidMount(); // Geteame la lista denuevo jajajajajaja
            // TODO: no seas negro facundo sacalo a manopla de la lista en vez de traer todo de nuevo JAJAJAJAJA
            //PD: BiCONeee!
        })
    };
    handleAddLesson = event => {
        event.preventDefault();
        this.setState({isAddModalOpen: true, registerSuccess: false});
    };

    renderLessonList = () => {
        if (!this.state.loadedStudents)
            return "Cargando";
        console.log(this.state.lessons);
        return (
            <div>
                <Row className="p-2">
                    <h6 className="p-2 m-auto">Nombre</h6>
                    <h6 className="p-2 m-auto">Dia</h6>
                    <h6 className="p-2 m-auto">Maestro</h6>
                </Row>

                {this.state.lessons.map((lesson) => (
                    <Row className="p-2">
                        <h6 className="p-2 m-auto">{lesson.name}</h6>
                        <h6 className="p-2 m-auto">{lesson.weekday}</h6>
                        <h6 className="p-2 m-auto">{lesson.teachers[0] && lesson.teachers[0].name}</h6>

                        <Button
                            className="btn btn-secondary p-2 m-auto"
                            onClick={() => (this.handleLessonEdit(lesson))}
                        >Editar</Button>
                        <Button
                            className="btn btn-danger p-2 m-auto"
                            onClick={() => (this.handleLessonDelete(lesson))}
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
                <Button className="btn btn-info" onClick={this.handleAddLesson}>Agregar una nueva clase</Button>
                {this.renderLessonList()}
                <ReactModal // ADD MODAL
                    className="modal-form-2"
                    isOpen={this.state.isAddModalOpen}
                    contentLabel="Add teacher modal"
                >
                    <Form onSubmit={this.handleAddSubmit}>
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                id="name"
                                type="name"
                                autoFocus
                                value={this.state.name}
                                placeholder="Nombre"
                                className={(this.state.errors.name) && "border border-danger"}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        {(this.state.errors.name) && <h6 className="text-danger">Nombre invalido</h6>}
                        <Form.Group>
                            <DropdownButton
                                title={this.state.weekday}
                                className={(this.state.errors.weekday) && "border border-danger"}
                            >
                                {["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"].map(
                                    (weekday) =>
                                        <Dropdown.Item
                                            className="bg-default border border-dark"
                                            key={weekday}
                                            onClick={() => this.handleWeekDayChange(weekday)}
                                        >
                                            {weekday}
                                        </Dropdown.Item>
                                )}
                            </DropdownButton>
                        </Form.Group>
                        {(this.state.errors.weekday) && <h6 className="text-danger">Dia invalido</h6>}
                        <Form.Group>
                            <Form.Label>Duracion (en minutos)</Form.Label>
                            <Form.Control
                                id="duration"
                                type="number"
                                value={this.state.duration}
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
                        {(this.state.errors.hour || this.state.errors.minutes) &&
                        <h6 className="text-danger">Horario invalido</h6>}
                        <Form.Group as={Row}>
                            <DatePicker
                                selected={this.state.startDate}
                                selectsStart
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                dateFormat="dd/MM/YYYY"
                                onChange={this.handleChangeStart}
                            />

                            <DatePicker
                                selected={this.state.endDate}
                                selectsEnd
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                dateFormat="dd/MM/YYYY"
                                onChange={this.handleChangeEnd}
                            />
                        </Form.Group>
                        <h2>Profesor</h2>
                        <DropdownButton
                            title={this.state.teacher ? this.state.teacher.name : "Elegir profesor"}
                        >
                            {(this.state.loadedTeachers) && this.state.teachers.map(
                                (teacher) =>
                                    <Dropdown.Item
                                        className="bg-default border border-dark"
                                        key={teacher.name}
                                        onClick={() => this.handleTeacherChange(teacher)}
                                    >
                                        {teacher.name}
                                    </Dropdown.Item>
                            )}
                        </DropdownButton>
                        <Form.Group>

                        </Form.Group>
                        <Row className="modal-form-button-container">
                            <Button type="submit">Agregar clase</Button>
                            <Button
                                onClick={this.cancelAddModal}
                                className="btn btn-secondary modal-button"
                            >Cancelar</Button>
                        </Row>
                    </Form>
                </ReactModal>

            </div>
        );
    }

    handleTeacherChange(t) {
        this.setState({teacher: t})
    }
}

export default NewClass;
