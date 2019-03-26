import React, {Component} from 'react';
import InitialPage from "./InitialPage";
import RegisterPage from './RegisterPage';

export default class MainContainer extends Component {
  render() {
    return(
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255,255,255,0.5)',
          padding: '10px',
          paddingLeft: '20px',
          paddingRight: '20px',
          borderRadius: "20px",
        }}
      >
        <RegisterPage/>
      </div>
    )
  };
}