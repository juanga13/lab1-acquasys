import React, { Component } from 'react'
import FilterBar from '../helpers/FilterBar';
import ItemList from '../helpers/ItemList';
import { DropdownButton, Dropdown } from 'react-bootstrap';

class Students extends Component {
    state = {
        filterType: 'Nombre/Apellido',
        filter: '',
    };

    handleFilterChange = event => {
        console.log(event.target.id);
        event.preventDefault();
        this.setState({[event.target.id]: event.target.value});
    };

    handleSelect = value => {
        this.setState({filterType: value});
    };

    render() {
        return (
            <div>
                <h4>Students</h4>
                {/* TODO filter students lists by getting filter value from FilterBar */}
                {/* filterType -> para buscar por dni o por nombre/apellido  */}
                <DropdownButton title={this.state.filterType} onSelect={this.handleSelect}>
                    <Dropdown.Item eventKey='Nombre/Apellido'>Nombre/Apellido</Dropdown.Item>
                    <Dropdown.Item eventKey='DNI'>DNI</Dropdown.Item>
                </DropdownButton>
                <FilterBar 
                    autoFocus 
                    placeholder='Nombre apellido dni' 
                    onChange={this.handleFilterChange} 
                    value={this.state.filter}
                />
                <ItemList type='student' items={this.props.students} filterType={this.state.filterType} filter={this.state.filter}/>
                <h1>{this.state.filter}</h1>
            </div>
        )
    }
}

export default Students;