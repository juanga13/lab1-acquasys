import React, {Component} from 'react';
import News from "./News";
import Hub from "./Hub";
import Contact from "./Contact";

/**
 * Home Component
 *
 * Description: --
 * 
 * TODO: this component may be useless, check App.jsx
 **/
export default class Home extends Component {
  render() {
    return(
      <div>
        <h3>This is homepage div</h3>
        <News/>
        <Hub/>
        <Contact/>
      </div>
    );
  };
}