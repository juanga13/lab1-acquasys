import React, {Component} from 'react';
import {HashRouter as Router, Route, NavLink} from 'react-router-dom';
import './register.css';
import Pagination from "react-bootstrap/Pagination";
import FirstPage from './FirstPage';
import SecondPage from './SecondPage';
import ThirdPage from './ThirdPage';


export default class Register extends Component {
  constructor(props) {
    super(props);
    this.pages = [FirstPage, SecondPage, ThirdPage];
    console.log(this.pages[0].id);
    // default values so that does not break on first time
    this.state = {
      active: 1,
      validated: false,
      data: {
        username: "juanga13",
        password: "",
        name: "",
        surname: "",
        address: "",
        email: "",
        sex: "",
        phoneNumber: "",
        birthday: "",
        avatarUrl: "",
        dni: "",
        socialPlan: "",
        affiliateNumber: "",
        fatherName: "",
        fatherSurname: "",
        fatherPhoneNumber: "",
        fatherEmail: "",
        motherName: "",
        motherSurname: "",
        motherPhoneNumber: "",
        motherEmail: ""
      }
    };
  }

  postData(url: '', data= {}) {
    return fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {"Content-Type": "application/json"},
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(data),
    })
      .then(response => console.log(response.ok))
  };

  handleSubmit = event => {
    console.log(this.state);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ validated: true });
    // this.postData('http://172.22.41.200:8080/api/user/register', this.state.data);
  };

  /**
   *
   * @param event (Form.Control
   */
  handleChange = event => {
    event.preventDefault();
    console.log(event);
    this.setState({
      [event.target.id]: event.target.value
    });
  };



  /**
   * renders pagination buttons which have an active state
   *
   * @returns {Array} of NavLinks
   */
  renderPaginationItems = () => {
    let items = [];
    for (let number = 1; number <= 3; number++) {
      items.push(
        <NavLink className={"btn btn-outline-info outline-none navlink-pagination"}
                 to={"/" + number}
                 active={number === this.state.active}>
          {number}
        </NavLink>
      );
    }
    return items;
  };

  /**
   *
   * @returns html
   */
  render() {
    return(
      <div className={"register-box"}>
        <Router>
          <h2>Registrarse</h2>
          <Pagination>
            {this.renderPaginationItems()}
          </Pagination>
          <hr className={"separator"}/>
          <div>
            {/*TODO: save info data to state?*/}
            <Route path="/1" component={FirstPage}/>
            <Route path="/2" component={SecondPage}/>
            <Route path="/3" component={ThirdPage}/>
          </div>
        </Router>
      </div>

    );
  };
}