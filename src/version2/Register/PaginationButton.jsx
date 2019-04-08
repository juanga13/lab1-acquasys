import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

export default class PaginationButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: this.props.isActive
    }
  }

  render() {
    return (
      <NavLink className={"btn btn-light"}
              onClick={this.props.onPageChange}
               to={"/register/" + this.props.number}
      >
        {this.props.number}
      </NavLink>
    );
  }
}