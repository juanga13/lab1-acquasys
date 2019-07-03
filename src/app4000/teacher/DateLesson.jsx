import {Component} from "react";
import React from "react";
import Util from "../common/Util";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import TeacherService from "../network/TeacherService";

class DateLesson extends Component {
    constructor(props) {//date:long students:List<student> allStudents:List<student>
        //students = presentes
        //allstudents = todos los anotados
        //date = fecha y hora de la clase esta
        super(props);
        this.state = {
            present: null
        }
    }

    render() {
        console.log(this.props.date);
        return (
            <div>
                <h5>Fecha: {Util.getFormattedDate(new Date(this.props.date))}</h5>
                {this.renderStudents()}
            </div>
        );
    }

    renderStudents = () => {
        return this.props.allStudents.map(this.renderStudent);
    };

    updateAttendance = (sid, present) => {
        console.log(
            "hola"
        );
        TeacherService.setAttendance({
            lessonId: this.props.lessonId,
            date: this.props.date,
            studentId: sid,
            present: !present
        });
        this.setState({present: !present});
    };

    renderStudent = (student, index) => {
        let present = false;
        if (this.state.present == null) {
            this.props.students.forEach(stu => {
                if (stu.id === student.id)
                    present = true;
            });
        }else{
            present = this.state.present;
        }

        return (
            <div>
                <Row>
                    <Col><h6>{student.name + " " + student.surname + " "}</h6></Col>
                    <Col><h6>{present ? " Presente" : " Ausente"}</h6></Col>
                    <Col><Button
                        onClick={() => this.updateAttendance(student.id, present)}>{present ? "Marcar como ausente" : "Marcar como Presente"}</Button></Col>
                </Row>
            </div>
        )
    }


}

export default DateLesson;
