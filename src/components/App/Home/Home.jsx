import React, {Component} from 'react';
import News from "./News";
import Hub from "./Hub";
import Contact from "./Contact";
import './home.css';

/**
 * Home Component
 *
 * Description: Homepage container component
 **/
export default class Home extends Component {
  render() {
    return(
      <div className='home'>
        <News/>
        <Hub/>
        <Contact/>
      </div>
    );
  };
}