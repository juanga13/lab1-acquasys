import React from 'react';
import {FormControl, DropdownButton, Dropdown} from 'react-bootstrap';

// [DUMB CCOMPONENT]
const FilterBar = (props) => (
  <div>
    <h5>Filterbar!</h5>
    <FormControl
      autoFocus={props.autoFocus}
      id='filter'
      type='name'
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  </div>
)

export default FilterBar;