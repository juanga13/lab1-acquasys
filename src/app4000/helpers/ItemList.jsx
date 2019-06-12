import React from 'react';
import {Row, Button} from 'react-bootstrap';

function ItemList(props) {
  console.log(props);
  /**
   * types: 
   *   (1) students -> studenti: {name: 'Nombre', surname: 'Apellido', dni: '00000000'}
   *   (2) teachers -> teacheri: {name: 'Nombre', surname: 'Apellido', cuil: '20-12313123-2'}
   *   (3) lessons  -> lessons:  {name: 'Clase', }  // TODO definir como se va a mostrar!
   */
  if (props.type === 'students') {
    const students = props.items;
    return (<div>
      {props.items.map((student) => (
        <Row>
          <h6>{student.name + ', ' + student.surname}</h6>
          <h6>{student.dni}</h6>
          <Button onClick={props.onEdit} className='btn btn-secondary'>Editar</Button>
          <Button onClick={props.onDelete} className='btn btn-'>Eliminar</Button>  
        </Row>
      ))}
    </div>)
  } else if (props.type === 'teachers') {
    const teachers = props.items;
    return (<div>
      {props.items.map((teacher) => (
        <Row>
          <h6>{teacher.name + ', ' + teacher.surname}</h6>
          <h6>{teacher.dni}</h6>
          <Button onClick={props.onEdit} className='btn btn-secondary'>Editar</Button>
          <Button onClick={props.onDelete} className='btn btn-'>Eliminar</Button>  
        </Row>
      ))}
    </div>)
  } else if (props.type === 'lessons') {
    const lessons = props.items;
    return (<div>
      {props.items.map((lesson) => (
        <Row>
          {/* TODO */}
        </Row>
      ))}
    </div>)
  } else return null;
}

export default ItemList;