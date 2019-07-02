import React, { Component } from 'react'
import AdminService from "../network/AdminService";
import StudentsForm from "./StudentsForm";

export default class extends Component {
    state = {
        myself: null
    };

    // gets my data
    componentWillMount() {
        AdminService.getMyselfStudent().then(x => {this.setState({myself: x}); this.check(x)});

    };

    check() {
        if(this.state.myself == null)
            return false;
        return this.state.myself.name != null && this.state.myself.address != null && this.state.myself.name != null;

    }
    handleChange = event => {
        console.log(event.target.id);
        event.preventDefault();
        this.setState({myself: {...this.state.myself, [event.target.id]: event.target.value}});
    };

    render() {
        console.log(this.state.myself);
        if(this.check()){
            return (
                <div>
                    <h4>Tus datos estan completos, ahora debes esperar a que un administrador los verifique para poder ingresar</h4>
                </div>
            )
        }
        return (
            <div>
                <h4>Tus datos todavia no estan verificados, debes completar al menos nombre, apellido y direccion para poder ser verificado</h4>
                <StudentsForm
                    fields={this.state.myself}
                    handleChange={this.handleChange}
                    onAddConfirm={(e, fields) => this.handleAddConfirm(e, fields)}
                    onAddCancel={e => this.handleCloseModal(e)}
                />
            </div>
        )
    }

    handleAddConfirm = (event, data) => {
        event.preventDefault();
            AdminService.editStudent(this.state.myself).then(response => {
                console.log(response);
            });
    };
}
