import React, {Component} from 'react'
import AdminService from "../network/AdminService";
import TeacherService from "../network/TeacherService";
import TeacherLessons from "./TeacherLessons";
import Home from "../common/Home";

export default class TeacherMenu extends Component {
    state = {
        data: null,
        lessons: null,
    };

    // gets students, teachers and lessons
    componentWillMount() {
        AdminService.getUserInfo().then(x => {
            this.setState({data: x})
        });
        this.getLessonsList();
    };

    getLessonsList = () => {
        TeacherService.getLessons().then(x => {
            this.setState({lessons: x})
        })
    };

    render() {
        return (
            <div className='teacher-container'>
                <Home name={this.state.data && this.state.data.name ? this.state.data.name : ""}
                      surname={this.state.data && this.state.data.surname ? this.state.data.surname : ""}/>
                {this.renderTeacherLessons()}
            </div>
        )
    };

    renderTeacherLessons() {
        return this.state.lessons != null ? (
            <TeacherLessons
                lessons={this.state.lessons}
            />)
            : null;
    }

    componentDidMount() {
        this.setState({redirect: false});
    };


}
