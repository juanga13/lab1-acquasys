import React, {Component} from 'react';
import {HashRouter, NavLink, Route} from 'react-router-dom';
import Form from "react-bootstrap/Form";


export default class RegisterPage extends Component {
  state = {
    currentPage: 1,
    totalPages: 3,
    //registerData: {
      // name,
      // surname,
      //username,
      //password,
      // email,
      // dni,
      // phone,
      // address,
      // socialPlan,
      // affiliateNumber,
      // fatherName,
      // fatherSurname,
      // fatherPhone,
      // fatherEmail,
      // motherName,
      // motherSurname,
      // motherPhone,
      // motherEmail,
      // startDate,
      // birthDate,
      // profileUrl
    // }
  };

  handleFormsData() {};

  firstPage() {
    return (
      <Form>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type="name"/>
        </Form.Group>
      </Form>
    )
  };

  render() {
    return (
      <div>
        <h2>Register Page</h2>
        <Route path="/register/1" component={this.firstPage}/>
        <Route path="/register/3" component={this.secondPage}/>
        <Route path="/register/2" component={this.thirdPage}/>
      </div>
      )
  };
}

// {/*<div*/}
// {/*style={{*/}
// {/*left: ''*/}
// {/*}}*/}
// {/*>*/}
// {/*<HashRouter>*/}
// {/*<div style={{color: "#000000"}}>*/}
// {/*<h1>Register Page</h1>*/}
// {/*<p>this is a register page</p>*/}
// {/*<ul>*/}
// {/*<li><NavLink to="/register/1">this.getFirstPage</NavLink></li>*/}
// {/*<li><NavLink to="/register/2">this.getSecondPage</NavLink></li>*/}
// {/*<li><NavLink to="/register/3">this.getThirdPage</NavLink></li>*/}
// {/*</ul>*/}
// {/*<div>*/}
// {/*<Route path="/register/1" component={FirstPage}/>*/}
// {/*<Route path="/register/2" component={SecondPage}/>*/}
// {/*<Route path="/register/3" component={ThirdPage}/>*/}
// {/*</div>*/}
// {/*</div>*/}
// {/*</HashRouter>*/}
// {/*</div>*/}
// class FirstPage extends Component {
//   render() {
//     return(
//       <div>
//         <h2>first page of register</h2>
//         <Form>
//           <Form.Group as={"Row"}>
//             <Form.Label>Name</Form.Label>
//             <Form.Control type="name"/>
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Surname</Form.Label>
//             <Form.Control type="surname"/>
//           </Form.Group>
//           <Form.Group>
//             <Form.Label></Form.Label>
//             <Form.Control type="email"/>
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Email address</Form.Label>
//             <Form.Control type="phone-number" placeholder="" />
//           </Form.Group>
//         </Form>
//       </div>
//     )
//   };
// }
//
//
// class SecondPage extends Component {
//   render() {
//     return(
//       <div>
//         <span>second page of register</span>
//       </div>
//     )
//   };
// }
//
//
// class ThirdPage extends Component {
//   render() {
//     return(
//       <div>
//         <span>third page of register</span>
//       </div>
//     )
//   };
// }
