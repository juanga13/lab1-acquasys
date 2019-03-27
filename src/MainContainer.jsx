import React, {Component} from 'react';
import InitialPage from "./InitialPage";
import RegisterPage from './RegisterPage';

export default class MainContainer extends Component {
  render() {
    return(
      <div
        style={{
          display: 'flex',
          overflow: 'auto',
          backgroundColor: 'rgba(255,255,255,0.7)',
          padding: '10px',
          paddingLeft: '20px',
          paddingRight: '20px',
          borderRadius: "5px",
          position: 'relative',
          top: '5%',
        }}
      >
        <RegisterPage/>
      </div>
    )
  };
}