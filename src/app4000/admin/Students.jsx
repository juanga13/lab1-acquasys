import React, { Component } from 'react'
import FilterBar from '../helpers/FilterBar';
import ItemList from '../helpers/ItemList';
import { DropdownButton, Dropdown } from 'react-bootstrap';

class Students extends Component {
    state = {
        filter: '',
    };

    _filterList() {
        let filteredList = [];
        const students = this.props.students;
        // console.log("xd");
        for (var key in students) {  // student={1:{}, 2:{}, ...}
            if (students[key].name.includes(this.state.filter) ||
            students[key].surname.includes(this.state.filter) ||
            students[key].dni.includes(this.state.filter)) {
                filteredList.push(students[key]);
            }
        }
        return filteredList;
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
                <FilterBar 
                    autoFocus 
                    placeholder='Nombre apellido dni' 
                    onChange={this.handleFilterChange} 
                    value={this.state.filter}
                />
                <ItemList type='students' items={this._filterList()} filter={this.state.filter}/>
            </div>
        )
    }
}

export default Students;