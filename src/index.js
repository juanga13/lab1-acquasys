import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router} from "react-router-dom";
// import './version1/index.css';

ReactDOM.render(<Router><App/></Router>,
  document.getElementById('root'));

