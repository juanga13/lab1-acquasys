import React from 'react';
import {Button} from 'react-bootstrap';
import {instanceOf} from "prop-types";
import {Cookies} from "react-cookie";
import {NavLink} from "react-router-dom";
import './my-account.css';

export default class AccountSettings extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  handleLogout = () => {
    const {cookies} = this.props;
    cookies.remove('token');  // only sets the token value to empty TODO delete token?
    this.props.onLogout();
  };

  handleRefresh = () => {
    // console.log(this.props.cookies);
    this.forceUpdate();
  };

  render() {
    return (
      <div className='my-account'>
        <h2>Mi cuenta</h2>
        <h4>{"Token is: " + this.props.cookies.cookies.token}</h4>
        <Button className='btn-info'
                onClick={this.handleRefresh}>Refresh token</Button>
        <Button className='btn-info'
                onClick={this.handleLogout}>
          <NavLink className='logout-text' exact to='/'>Deslogear</NavLink>
        </Button>
      </div>
    );
  };
}