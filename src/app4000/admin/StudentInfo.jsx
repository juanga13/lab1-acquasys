import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

// 0: "Email" 1: "Nombre"
// ​2: "Apellido"
// ​3: "DNI"
// ​4: "Sexo"
// ​5: "Dirección"
// ​6: "Fecha de nacimiento"
// ​7: "Telefono"
// ​8: "Foto"
// ​9: "Plan Social"
// ​10: "Numero de afiliado"
// ​11: "Nombre"
// ​12: "Apellido"
// ​13: "Email"
// ​14: "Telefono"
// ​15: "Nombre"
// ​16: "Apellido"
// ​17: "Email"
// ​18: "Telefono"
// ​
// 0: 1
// 1: "student@gmail.com"
// 2: ""
// 3: "nombre student"
// 4: "apellido student"
// 5: 123123
// 6: "m"
// 7: ""
// 8: null
// 9: "nombre padre"
// 10: "apellido padre"
// 11: null
// 12: "padre@padre.com"
// 13: "nombre madre"
// 14: "apellido madre"
// 15: null
// 16: "madre@madre.com"
// 17: "plan social 1"
// 18: "123123"
// 19: "direccion 1"
// 20: "12/03/91"
// 21: "STUDENT"
class StudentInfo extends Component {
    constructor(props) {
        super(props);
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
    }

    render() {
        
        return (
            <div>
                <Button onClick={e => this.props.onCloseModal(e)}>Cerrar</Button>
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
            </div>
        );
    };
}

export default StudentInfo;
