import React from 'react';
import {Button} from 'react-bootstrap';
import {instanceOf} from "prop-types";
import {Cookies} from "react-cookie";

export default class AccountSettings extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  handleLogout = () => {
    const {cookies} = this.props;
    cookies.remove('token');  // only sets the token value to empty TODO delete token?
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleLogout}>Deslogear</Button>
      </div>
    );
  };
}