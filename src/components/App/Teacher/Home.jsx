import React, {Component, Fragment} from 'react';
import News from "../Owner/Home";

export default class Home extends Component {
  render() {
    return(
      <Fragment>
        <News/>
        <h3>Logged in Teacher</h3>
      </Fragment>
    );
  }
};