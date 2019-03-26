import React, {Component} from 'react';

export default class RequestExample extends Component {
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

    render() {};
}