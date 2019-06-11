import React from 'react';
import {Row, Button} from 'react-bootstrap';

function ItemList(type, items, filter) {
  /**
   * types: 
   *   (1) students -> studenti: {name: 'Nombre', surname: 'Apellido', dni: '00000000'}
   *   (2) teachers -> teacheri: {name: 'Nombre', surname: 'Apellido', cuil: '20-12313123-2'}
   *   (3) lessons  -> lessons:  {name: 'Clase', }  // TODO definir como se va a mostrar!
   */
  if (type === 'students') {
    return(<div>
      <h6>{items.name + ', '}</h6>
      <h6>{items.surname}</h6>
      <h6>{items}</h6>
      <Button className='btn btn-secondary'>Editar</Button>
      <Button className='btn btn-'>Eliminar</Button>
    </div>)
  } else if (type === 'teachers') {
    
  } else if (type === 'lessons') {

  } else return null;
}

export default ItemList;