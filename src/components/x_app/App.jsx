import React, {Component, Fragment} from 'react';
import AppNavbar from './AppNavbar';
import './app.css';
import {Route, Redirect} from "react-router";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Contact from "./Contact";
import { withCookies } from 'react-cookie';
import AccountSettings from "./AccountSettings";

const roles = {
  OWNER: 'owner',
  TEACHER: 'teacher',
  STUDENT: 'student',
  NONE: 'none',
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {  // friendly reminder: never put components in state :)
      navbar: <AppNavbar isLogged={this.props.cookies.cookies.token !== undefined}/>,  // TODO change to boolean
      logged: false,
      role: roles.NONE,
    }
  }

  renderNavbar = () => {
    // return <AppNavbar role={this.state.role} logged={this.state.logged}/>
    this.setState({navbar: <AppNavbar isLogged={true}/>})
  };

  handleLogout = () => {
    this.setState({navbar: <AppNavbar isLogged={false}/>})
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
          <Route path='/my-account' render={() => (<AccountSettings cookies={this.props.cookies}
                                                                    onLogout={this.handleLogout}/>)}/>
          {/*<PrivateRoute path='/my-account' render={() => (<AccountSettings cookies={this.props.cookies}/>)}/>*/}
        </div>
        <Contact/>
      </Fragment>
    );
  }
}
export default withCookies(App);

/*
function PrivateRoute ({ component: Component, ...rest }) {
  const {cookies} = this.props;
  const token = cookies.get('token');
  return (
    <Route
      {...rest}
      render={(props) =>
        //server.authenticateToken(token)  Tudu token server authentication
        token !== ""
          ? <Component {...props} />
          : <Redirect to='/login'/>
      }
    />)
}
*/