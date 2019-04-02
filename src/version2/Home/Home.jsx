import React, {Component} from 'react';
import News from "./News";
import Hub from "./Hub";
import Contact from "./Contact";

export default class Home extends Component {
  render() {
    return(
      <div>
        <h2>HOME</h2>
        <News/>
        <Hub/>
        <Contact/>
      </div>
    );
  };
}