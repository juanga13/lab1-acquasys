import React, { Component } from 'react'
import AdminService from "../network/AdminService";
import Home from "../common/Home";
import Spinner from "react-bootstrap/Spinner";
import StudentService from "../network/StudentService";
import StudentLessons from "./StudentLessons";

export default class extends Component {
    state = {
        data: null,
        lessons: null,
        myself: null
    };

    // gets students, teachers and lessons
    componentWillMount() {
        AdminService.getUserInfo().then(x => {
            this.setState({data: x})
        });
        this.getLessonsList();
    };

    getLessonsList = () => {
        StudentService.getLessons().then(x => {
            this.setState({lessons: x})
        });
        StudentService.getMyself().then(x => {
            this.setState({myself: x})
        })
    };

    render() {
        return (
            <div className='teacher-container'>
                <Home name={this.state.data && this.state.data.name ? this.state.data.name : ""}
                      surname={this.state.data && this.state.data.surname ? this.state.data.surname : ""}/>
                {this.renderStudentLessons()}
            </div>
        )
    };

    renderStudentLessons() {
        return this.state.lessons != null ? (
                <StudentLessons
                    lessons={this.state.lessons}
                    student={this.state.myself}
                />)
            : <Spinner animation="border"/>;

    }

    componentDidMount() {
        this.setState({redirect: false});
    };

}
