import {Component} from "react";
import Lesson from "./Lesson";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Util from "../common/Util"
class TeacherLessons extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            index: null,
        };
    };

    handleClose() {
        this.setState({show: false});
    }

    handleShow(i) {
        this.setState({index: i});
        this.setState({show: true});
    }

    render() {
        console.log(this.props.lessons);
        return (
            <div>
                {this.props.lessons.map((item, index) => (
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Fecha de inicio: {Util.getFormattedDate(new Date(item.startDate))}</h6>
                        <Button variant="primary" onClick={() => this.handleShow(index)}>
                            Ver/Editar asistencia
                        </Button>
                    </div>
                ))}


                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.lessons[this.state.index] == null ? "Cargando..." : this.props.lessons[this.state.index].name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Lesson
                            lesson={this.props.lessons[this.state.index]}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleClose}>
                            Salir
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }
}

export default TeacherLessons;
