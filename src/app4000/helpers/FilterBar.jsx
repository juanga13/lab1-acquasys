import React from 'react';
import {FormControl} from 'react-bootstrap';
import '../css/filterbar.css';

// [DUMB CCOMPONENT]
const FilterBar = (props) => (
  <div className='filterbar-container'>
    <FormControl
      autoFocus={props.autoFocus}
      id='filter'
      type='name'
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
    <h6 className='text text-warning'>Nota: buscar nombre, apellido o dni por separado.</h6>
  </div>
)

export default FilterBar;