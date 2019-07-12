import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import './css/app.css';

export default class Appbar extends Component {
    render() {
        return (
            <div className='appbar-container'>
                <NavLink exact to='/'>Home</NavLink>
                <NavLink to='/login'>Ingresar</NavLink>
                <NavLink to='/register'>Registrarse</NavLink>
            </div>
        )
    }
}
