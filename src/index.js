import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom';
// import App from './components/App/App';
// import {BrowserRouter as Router} from "react-router-dom";
// import { CookiesProvider } from 'react-cookie';

// ReactDOM.render(
//   <CookiesProvider><Router><App/></Router></CookiesProvider>,
//   document.getElementById('root')
// );

import index from './other/redux/js/index';
import App from "./other/redux/app/index";
import { Provider } from 'react-redux';
import store from "./other/redux/js/store";

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'));

