import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import AdminService from '../network/AdminService';

// TODO: show classes and payments
class StudentInfo extends Component {
    constructor(props) {
        super(props);
        // console.log(props.data);
        this.dataValues = props.data;
        this.personalVariables = [
            'Email', 'DNI', 'Sexo', 'Dirección', 'Fecha de nacimiento',
            'Telefono', 'Foto', 'Plan Social', 'Numero de afiliado',
        ];
        this.fatherMotherVariables = ['Nombre', 'Apellido', 'Email', 'Telefono',]; 
        this.personalValues = [
            this.dataValues['email'],
            this.dataValues['dni'],
            this.dataValues['sex'],
            this.dataValues['address'],
            this.dataValues['birthday'],
            this.dataValues['phoneNumber'],
            this.dataValues['avatarUrl'],
            this.dataValues['socialPlan'],
            this.dataValues['affiliateNumber'],
        ];
        this.fatherValues = [
            this.dataValues['fatherName'],
            this.dataValues['fatherSurname'],
            this.dataValues['fatherEmail'],
            this.dataValues['fatherPhoneNumber'],
        ];
        this.motherValues = [
            this.dataValues['motherName'],
            this.dataValues['motherSurname'],
            this.dataValues['motherEmail'],
            this.dataValues['motherPhoneNumber'],
        ];
        console.log(this.dataKeys);
        console.log(this.dataValues);
    };

    handleVerify = (e) => {
        e.preventDefault();
        AdminService.verifyStudent(this.dataValues.id);  //TODO: then response handling
        // this.props.onVerifyStudent(e, this.dataValues.id);
    };

    render() { 
        return (
            <div>
                <Button onClick={e => this.props.onCloseModal(e)}>Cerrar</Button>
                {(this.dataValues.verified) ? 
                    <div>
                        <h6 className='text text-success'>El alumno esta verificado!</h6>
                    </div>
                    : <div>
                        <h6 className='text text-danger'>El alumno no esta verificado.</h6>
                        <Button onClick={this.handleVerify}>Verificar alumno</Button>
                    </div>
                }
                <h4>{'Datos sobre ' + this.dataValues['name'] + ' ' + this.dataValues['surname']}</h4>
                {this.personalValues.map((name, index) => (
                    <div className='text-row-container'>
                        <h6 className='bold mr-2'>{this.personalVariables[index] + ': '}</h6>
                        <h6>{' ' + name}</h6>
                    </div>
                ))}
                <h5>Padre</h5>
                {this.fatherValues.map((name, index) => (
                    <div className='text-row-container'>
                        <h6 className='bold mr-2'>{this.fatherMotherVariables[index] + ': '}</h6>
                        <h6>{' ' + name}</h6>
                    </div>
                ))}
                <h5>Madre</h5>
                {this.motherValues.map((name, index) => (
                    <div className='text-row-container'>
                        <h6 className='bold mr-2'>{this.fatherMotherVariables[index] + ': '}</h6>
                        <h6>{' ' + name}</h6>
                    </div>
                ))}
                <span className='horizontal-separator'/>
            </div>
        );
    };
}

export default StudentInfo;
