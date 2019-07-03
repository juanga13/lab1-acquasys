import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

import { registerLocale, setDefaultLocale }  from 'react-datepicker';
import es from 'date-fns/locale/es';

registerLocale('es', es);
setDefaultLocale('es');

class LessonInfo extends Component {
    render() {
        return (
            <div>
                <Button onClick={this.props.onCloseModal}>Cerrar</Button>
                <h5 className='bold mr-2'>{'Datos de la clase: ' + this.props.data.name}</h5>
                <div className='text-row-container'><h6 className='bold mr-2'>Fecha de inicio:</h6>
                    <h6>{new Date(this.props.data.startDate).toString()}</h6></div>
                <div className='text-row-container'><h6 className='bold mr-2'>Fecha de terminación:</h6>
                    <h6>{new Date(this.props.data.endDate).toString()}</h6></div>
                <h5 className='bold mr-2'>Dias de clase</h5>
                {this.props.data.weekdays.map((weekday, i) => (
                    <h6 key={i}>{'Dia: ' + weekday.day + '. Hora: ' + weekday.hour + ':' + 
                        weekday.minutes + '. Duracion: ' + weekday.duration}</h6>
                ))}
                <h5 className='bold mr-2'>Profesores</h5>                
                {this.props.data.teachers.map((teacher, i) => (
                    <h6 key={i}>{'Nombre: ' +  teacher.name + ', ' + teacher.surname + '. CUIL: ' + teacher.cuil}</h6>
                ))}
                <h5 className='bold mr-2'>Alumnos</h5>                
                {this.props.data.students.map((student, i) => (
                    <h6 key={i}>{'Nombre: ' +  student.name + ', ' + student.surname + '. DNI: ' + student.cuil}</h6>
                ))}
            </div>
        );
    };
}

export default LessonInfo;