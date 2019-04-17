import React, {Component, Fragment} from 'react';
import AppNavbar from './AppNavbar';
import './app.css';
import {Route} from "react-router";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Contact from "./Contact";
import { withCookies } from 'react-cookie';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navbar: <AppNavbar isLogged={false}/>,
    }
  }

  renderNavbar = () => {
    console.log("ON LOGGED CLICKED");
    this.setState({navbar: <AppNavbar isLogged={true}/>});
  };

  render() {
    return (
      <Fragment>
        {this.state.navbar}
        <div className='app-container'>
          <Route exact path='/' render={() => (<Home cookies={this.props.cookies}/>)}/>
          <Route path='/login' render={() => (<Login onLogged={this.renderNavbar}
                                                     cookies={this.props.cookies}/>)}/>
          <Route path='/register' render={() => (<Register cookies={this.props.cookies}/>)}/>
        </div>
        <Contact/>
      </Fragment>
    );
  }
}
export default withCookies(App);
