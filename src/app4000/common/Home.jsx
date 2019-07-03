import React, { Component } from 'react'
import '../css/main.css';

export default class Home extends Component {
    render() {
        return (
            <div>
                <h4>{'Bienvenido ' + this.props.name + ' ' + this.props.surname + '!'}</h4>
            </div>
        )
    }
}
