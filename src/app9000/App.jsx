import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import './css/app.css';
import Appbar from './Appbar';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Contacts from './Contacts';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    };

    componentWillMount() {

    };

    render() {
        return (
            <div className='app-container'>
                <Appbar/>
                {/* TODO: change to forms.AnyForm.jsx */}
                <div className='app-route-container'>
                    <Route exact path='/' render={() => <Home/>}/>
                    <Route path='/login' render={() => <LoginForm/>}/>
                    <Route path='/register' render={() => <Register/>}/>
                </div>
                <Contacts/>
            </div>
        );
    };
};

export default App;