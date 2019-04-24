/**
 *  Main
 */
import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router} from "react-router-dom";
// import { Provider } from 'react-redux';

import App from './components/app/App';

import 'bootstrap/dist/css/bootstrap.css';


// ReactDOM.render(
//   <Provider>
//     <Router>
//       <App/>
//     </Router>
//   </Provider>,
//   document.getElementById('root'));
ReactDOM.render(
  <Router>
    <App/>
  </Router>,
  document.getElementById('root'));


/**
 *  Test
 */
// import index from './other/redux/js/index';
// import App from "./other/redux/app/index";
// import { Provider } from 'react-redux';
// import store from "./other/redux/js/store";
//
// ReactDOM.render(
//   <Provider store={store}>
//     <App/>
//   </Provider>,
//   document.getElementById('root'));

