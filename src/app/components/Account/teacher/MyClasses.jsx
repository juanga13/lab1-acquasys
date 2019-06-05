import RequestManager from "../../../network/RequestManager";
import {Component} from "react";
import {Button, Row} from "react-bootstrap";
import React from "react";

class MyClasses extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lessons: null,
            token: localStorage.getItem("token"),
            loadedStudents: false
        };
    }

    componentDidMount() {
        fetch(RequestManager.baseUrl + "/api/teacher/myLessons", {
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
        })
    }

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
                        <h6 className="p-2 m-auto">{lesson.teachers[0]}</h6>

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
                {this.renderLessonList()}
            </div>
        )
    }
}

export default MyClasses;
