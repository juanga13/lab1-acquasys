import React, {Component} from 'react';
import RegisterPage from "./RegisterPage";
import background from "./resources/background.jpg";

export default class MainContainer extends Component {
  render() {
    return(
      <div
        style={{
          backgroundColor: 'rgba(255,255,255,0.5)',
          maxWidth: '50%',
          padding: '10px',
          paddingLeft: '20px',
          paddingRight: '20px',
          borderRadius: "20px",
          position: 'absolute',
          left: '50%'
        }}
      >
        <RegisterPage/>
      </div>
    )
  };
}