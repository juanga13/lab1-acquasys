import React, {Component, Fragment} from 'react';
import store from '../redux/store/store';
import {Route} from 'react-router-dom';
import Navbar from './';


class App extends Component {
  constructor(props) {
    super(props);

    store.subscibe()
  }

  renderRoutes = () => {

  };

  render() {
    return (
      <Fragment>
        <Navbar/>
        {this.renderRoutes()}
        <Contact/>
      </Fragment>
    );
  }
}

export default App;