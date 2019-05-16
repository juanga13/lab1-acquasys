import React, {Component} from 'react';

import {connect} from 'react-redux';

class StudentList extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        {/*{this.props.studentList}*/}
        <h1>Student List</h1>
      </div>
    );
  };
}

const mapStateToProps = state => {
  // return ({studentList: state.studentList.filter((state.include(state.studentListFilter))})
};

StudentList = connect(mapStateToProps)(StudentList);

export default StudentList;