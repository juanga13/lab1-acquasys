import React, { Component } from 'react'

export default class Home extends Component {
    render() {
        return (
            <div>
                <h4>{'Bienvenido ' + this.props.name + ' ' + this.props.surname + '!'}</h4>
            </div>
        )
    }
}
