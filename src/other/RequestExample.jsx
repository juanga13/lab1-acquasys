import React, {Component} from 'react';

export default class RequestExample extends Component {
    // to load some data before render
    componentDidMount() {
        const email = "test@example.com";
        const password = "foobar";

        fetch("theURL/api-token-auth/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw Error(res.statusText);
                }
            })
            .then(json => {
                this.setState({
                    isLoaded: true,
                    token: json
                });
            })
            .catch(error => console.error(error));
    };

    // Example POST method implementation:

    postData('http://example.com/answer', {answer: 42})
    .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
      .catch(error => console.error(error));

    postData(url = '', data = {}) {
        // Default options are marked with *
        return fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
          .then(response => response.json()); // parses JSON response into native Javascript objects
    }
}