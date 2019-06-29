import React from 'react';
import {FormControl} from 'react-bootstrap';
import '../css/filterbar.css';

// [DUMB CCOMPONENT]
const FilterBar = (props) => (
  <div className='filterbar-container'>
    <div className='filterbar-subcontainer'>
      <h6>Filtrar la lista: </h6>
      <FormControl
        autoFocus={props.autoFocus}
        id='filter'
        type='name'
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </div>    
    <h6 className='text text-warning'>{props.notice}</h6>
  </div>
)

export default FilterBar;