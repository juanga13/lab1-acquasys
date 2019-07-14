import React from 'react';
import '../css/app.css';

function Input(props) {
    return (
        <div controlid={props.id} className='input-container'>
            <h6>{props.label}</h6>
            <input id={props.id} onChange={props.onChange}/>
            <h6>{props.error}</h6>
        </div>
    )
}

export default Input;
