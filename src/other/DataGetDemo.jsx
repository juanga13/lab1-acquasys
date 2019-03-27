import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

export default class DataGetDemo extends Component {
  constructor(props) {
    super(props);

    this.state= {
      date: {},
      isLoading: false
    }
  };

  handleGetRequest = event => {
    event.preventDefault();
  };

  componentDidMount() {
    this.setState({isLoading: true});


    // http://172.22.41.200:8080/api/user/gato
    fetch("http://172.22.41.200:8080/api/user/gato",
      {
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              // "Content-Type": "application/x-www-form-urlencoded",
              },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
          })
      .then(results => {return results.json();})
      .then(data => this.setState({name : data}))
  }



  render() {

    return (
      <div>
        <Button onClick={this.handleGetRequest}>GET MORE RANDOM DATA!</Button>

      </div>
    )
  };
}