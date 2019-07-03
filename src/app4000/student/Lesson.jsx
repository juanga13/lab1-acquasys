import {Component} from "react";
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import StudentService from "../network/StudentService";
import Button from "react-bootstrap/Button";

class Lesson extends Component {
    constructor(props) {
        super(props);
        //  lesson={lesson}
        //                 student={this.props.student}
        this.state ={
            enrolled: null
        }
    }

    isEnrolled = () => {
        let ret = false;
        if(this.state.enrolled == null) {
            this.props.lesson.students.forEach(student => {
                if (student.id === this.props.student.id) {
                    ret = true;
                }
            });
            this.setState({enrolled: ret});
        }else{
            return this.state.enrolled;
        }
        return ret;
    };

    enrolledText = () => {
        if (this.isEnrolled()) {
            return "Estas anotado a esta clase"
        }
        return "No estas anotado a esta clase"
    };
    buttonText = () => {
        if (this.isEnrolled()) {
            return "Desanotarse"
        }
        return "Anotarse"
    };

    swapEnroll = () => {
        if (this.isEnrolled()) {
            StudentService.unroll(this.props.student.id, this.props.lesson.id);
        } else {
            StudentService.enroll(this.props.student.id, this.props.lesson.id);
        }
        this.setState({enrolled: !this.state.enrolled});
    };

    render() {
        return (
            <div class="card">
                <Row>
                    <Col>
                        <div className="card-body">
                            <h5 className="card-title">{this.props.lesson.name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{this.props.lesson.teachers.map(teach => (teach.name + " " + teach.surname))}</h6>
                            <p className="card-text">{this.enrolledText()}</p>
                        </div>
                    </Col>
                    <Col>
                        <Button onClick={this.swapEnroll}>{this.buttonText()}</Button>
                    </Col>
                </Row>
            </div>
        )
    }

}

export default Lesson;
