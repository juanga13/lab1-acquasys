import React, { Component } from 'react'
import FilterBar from '../helpers/FilterBar';
import ItemList from '../helpers/ItemList';
import AdminService from '../network/AdminService';
import Input from '../helpers/Input';
import { Row, Button } from 'react-bootstrap';
import '../css/main.css';

class Payments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: '',
            amount: (props.amount || 0),
            amountError: '',
        };
    };
    /** 
     * pago -> {
     *      alumno: {name, surname, dni},
     *      amount: 0,
     *      date: Date,
     *      payed: true,
     * }
     * 
     * 10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
     * 0: {student: {…}, amount: 100, date: "2019-07-01T03:00:00.000+0000"}
     * 1: {student: {…}, amount: 100, date: "2019-07-01T03:00:00.000+0000"}
     * 2: {student: {…}, amount: 100, date: "2019-07-01T03:00:00.000+0000"}
     * 3: {student: {…}, amount: 100, date: "2019-07-01T03:00:00.000+0000"}
     */ 

    _filterList() {
        const payments = this.props.payments;
        let filteredList = [];
        for (var key in payments) {
            const date = new Date(payments[key].date);
            if(payments[key].student.name != null) {
                if (payments[key].student.name.toLowerCase().includes(this.state.filter.toLowerCase())
                    || payments[key].student.surname.toLowerCase().includes(this.state.filter.toLowerCase())
                    || payments[key].student.dni.toString().includes(this.state.filter.toLowerCase())  // TODO: filter by dni
                    || (date.getDay()+"-"+payments[key].date.getMonth()).includes(this.state.filter.toLowerCase())
                    || date.getDay().toString().includes(this.state.filter.toLowerCase())
                    || date.getFullYear().toString().includes(this.state.filter.toLowerCase())
                ) {
                    filteredList.push(payments[key]);
                }
            }else{
                if(this.state.filter == null || this.state.filter === ""){
                    filteredList.pop(payments[key]);
                }
            }
        }
        return filteredList;
    };

    handleCloseModal = event => {
        event.preventDefault();
        this.editData = null;
        this.setState({isModalOpen: false, modalEditMode: false, modalViewInfoMode: false});
    };

    handleChange = event => {
        event.preventDefault();
        this.setState({[event.target.id]: event.target.value});
    };

    _getPaymentData(id) {
        let data;
        this.props.payments.forEach(payment => {if (payment.id === id) data = payment});
        return data;
    };

    handleSetPayed = (paymentData) => {
        // console.log('[Payments] handleSetPayed');
        // console.log(paymentData);
        AdminService.setPayed(paymentData).then((response) => {
            // console.log(response)
            if (response.success) this.props.updateList()
        });
    };

    handleSetPaymentAmount = event => {
        event.preventDefault();
        // first verify
        const amount = this.state.amount
        if (!isNaN(amount)) {  // isNaN checks if var is not a number
            // false so amount is a number
            if (amount < 0) this.setState({amountError: 'El valor del abono no puede ser negativo.'})
            else if (amount === this.props.amount) this.setState({amountError: ''})
            AdminService.setPaymentAmount(amount).then((response) => {
                console.log('?');
                console.log(this);
                (response.success) && this.props.updateList()});
        } else this.setState({amountError: 'El valor del abono es invalido.'})
    };

    render() {
        // console.log(this.props.payments);
        // console.log('amount is: ' + this.state.amount);
        return (
            <div className='menu-container'>
                <h6 className='text text-danger'>{this.state.amountError}</h6>
                <div className='payment-amount-container'>
                    <h6>Actual valor del abono: </h6>
                    <h5 className='bold'>{this.props.amount}</h5>
                    <h6>, cambiarlo a: </h6>
                    <Input id='amount' value={this.state.amount} onChange={this.handleChange}/>
                    <Button onClick={this.handleSetPaymentAmount}>Cambiar</Button>
                </div>
                <FilterBar
                    autoFocus 
                    placeholder='Nombre apellido dni o fecha' 
                    onChange={this.handleChange} 
                    value={this.state.filter}
                    notice='Nota: buscar nombre, apellido, dni o fecha por separado.'
                />
                <ItemList
                    type='payments'
                    items={this._filterList()}
                    onSetPayed={(paymentData) => this.handleSetPayed(paymentData)}        
                />

            </div>
        );
    }
};

export default Payments;