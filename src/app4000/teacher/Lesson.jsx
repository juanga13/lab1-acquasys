import {Component} from "react";
import React from "react";
import TeacherService from "../network/TeacherService";
import DateLesson from "./DateLesson";
import {Spinner} from "react-bootstrap";

class Lesson extends Component {

    constructor(props) {
        super(props); //Lesson
        this.state = {
            attendanceResponse: null
        }
    }

    componentWillMount() {
        TeacherService.getAttendances(this.props.lesson.id).then(x => {
            this.setState({attendanceResponse: x})
        })
    }

    render() {
        if(this.state.attendanceResponse == null) {
            return (<div>
                <h4>Cargando...</h4>
                <Spinner animation="border"/>
            </div>)
        }
        console.log(this.state.attendanceResponse.attendance);
        return (<div>
            {this.state.attendanceResponse.possibleDates.map((date,index) => (
                <DateLesson
                    date={date}
                    lessonId={this.props.lesson.id}
                    students={this.state.attendanceResponse.attendance[date]}
                    allStudents={this.state.attendanceResponse.students}
                />
            ))}
        </div>)
    }

}

export default Lesson;
