import React, {Component} from 'react';
import {Pagination} from "react-bootstrap";
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.registerPages = 3;
  }

  renderPagination() {
    let active = 1;
    let items = [];
    for (let number = 1; number <= this.registerPages; number++) {
      items.push(
        <Pagination.Item key={number} active={number === active}>
          <NavLink to={"/" + number}>
          {number}
          </NavLink>
        </Pagination.Item>,
      );
    }
    return items;
  }

  renderFirstPage() {
    return(
      <div>
        <h3>First Register Page</h3>
      </div>
    );
  };

  renderSecondPage() {
    return(
      <div>
        <h3>Second Register Page</h3>
      </div>
    );
  };

  renderThirdPage() {
    return(
      <div>
        <h3>Third Register Page</h3>
      </div>
    );
  };

  /**
   * render method
   */
  render() {
    return(
      <Router>
        <h2>REGISTER PAGE</h2>
        <Pagination>{this.renderPagination()}</Pagination>
        {/*<ul className="header">*/}
          {/*<li><NavLink to="/register/1"></NavLink></li>*/}
          {/*<li><NavLink to="/register/2">{this.renderSecondPage}</NavLink></li>*/}
          {/*<li><NavLink to="/register/3">{this.renderThirdPage}</NavLink></li>*/}
        {/*</ul>*/}
        <div>
          <Route exact path="/" component={this.renderFirstPage()}/>
          <Route path="/something" component={this.renderSecondPage()}/>
          <Route path="/other" component={this.renderThirdPage()}/>
        </div>
      </Router>
    );
  };
}