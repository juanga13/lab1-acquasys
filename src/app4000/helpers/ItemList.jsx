import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import '../css/list.css'

function ItemList(props) {
  if (props.items === null) return null;
  if (props.items.length === 0) return <h4>La lista esta vacia!</h4>;
  /**
   * types: 
   *   (1) students -> studenti: {name: 'Nombre', surname: 'Apellido', dni: '00000000'}
   *   (2) teachers -> teacheri: {name: 'Nombre', surname: 'Apellido', cuil: '20-12313123-2'}
   *   (3) lessons  -> lessons:  {name: 'Clase', } 
   */
  if (props.type === 'students') {
    const students = props.items;
    return (<div className='list-container'>
      {students.map((student, i) => (
        <Row className='list-item' key={i}>
          <Col className=''>{student.name + ', ' + student.surname}</Col>
          <Col>{student.dni}</Col>
          <Button onClick={() => (props.onViewInfo(student.id))} className='btn btn-primary'>Ver</Button>
          <Button onClick={() => (props.onEdit(student.id))} className='btn btn-secondary'>Editar</Button>
          <Button onClick={() => (props.onDelete(student.id))} className='btn btn-danger'>Eliminar</Button>  
        </Row>
      ))}
    </div>)
  } else if (props.type === 'teachers') {
    const teachers = props.items;
    return (<div className='list-container'> 
      {teachers.map((teacher, i) => (
        <div className='list-item' key={i}>
          <h6>{teacher.name + ', ' + teacher.surname}</h6>
          <h6>{teacher.dni}</h6>
          <Button onClick={() => (props.onViewInfo(teacher.id))} className='btn btn-primary'>Ver</Button>
          <Button onClick={() => (props.onEdit(teacher.id))} className='btn btn-secondary'>Editar</Button>
          <Button onClick={() => (props.onDelete(teacher.id))} className='btn btn-danger'>Eliminar</Button>  
        </div>
      ))}
    </div>)
  } else if (props.type === 'lessons') {
    const lessons = props.items;
    return (<div className='list-container'>
      {lessons.map((lesson, i) => (
        <div className='list-item' key={i}>
          <h6>{lesson.name}</h6>
          <h6>{lesson.weekday}</h6>
          <Button onClick={() => (props.onViewInfo(lesson.id))} className='btn btn-primary'>Ver</Button>
          <Button onClick={() => (props.onEdit(lesson.id))} className='btn btn-secondary'>Editar</Button>
          <Button onClick={() => (props.onDelete(lesson.id))} className='btn btn-danger'>Eliminar</Button>  
        </div>
      ))}
    </div>)
  } else return null;
}

export default ItemList;