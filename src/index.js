import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router} from "react-router-dom";
import { CookiesProvider } from 'react-cookie';

ReactDOM.render( <CookiesProvider>
    <Router><App/></Router></CookiesProvider>, document.getElementById('root'));

