// /**
//  *  Main
//  */
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './app/_store'
import App from './app/components/App';
import 'bootstrap/dist/css/bootstrap.css';


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>,
  document.getElementById('root'));

// /**
//  *  Test
//  */
// import App from './other/App.jsx';

// ReactDOM.render(
//   <App/>,
//   document.getElementById('root'));

