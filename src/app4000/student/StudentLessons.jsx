import {Component} from "react";
import React from "react";
import Lesson from "./Lesson";
class StudentLessons extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    };


    render() {
        return this.props.lessons.map(lesson =>(
            <Lesson
                lesson={lesson}
                student={this.props.student}
            />
        ))
    }
}

export default StudentLessons;
