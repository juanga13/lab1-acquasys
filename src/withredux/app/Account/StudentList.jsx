import React, {Component} from 'react';

import {connect} from 'react-redux';

class StudentList extends Component {
  render() {
    return(
      <div>
        {this.props.studentList}
      </div>
    );    
  };
}

const mapStateToProps = state => {
  return ({
    studentList: state.studentList.filter((state.include(state.studentListFilter))
  })
};

StudentList = connect(mapStateToProps)(StudentList);

export default StudentList;