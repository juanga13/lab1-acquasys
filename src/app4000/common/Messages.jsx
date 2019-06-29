import {Component} from "react";
import React from "react";

export default class Messages extends Component {

    state = {
        messages: null,
        mode: false
    };

    componentWillMount() {
        let headers = new Headers();
        headers.append("authorization", "Bearer " + localStorage.getItem("token"));
        return fetch('http://localhost:8080/api/message/all',
            {
                headers: headers,
                method: "GET",
                mode: "cors",
                cache: "no-cache",
            })
            .then(res => res.json())
            .then((data) => {
                this.setState({messages: data})
            })
            .catch(console.log)
    }

    render() {
        return (
            <div>
                <h4>Mensajes</h4>
                {this.renderReceived()}
            </div>
        )
    }

    renderMessages = () => {
        console.log(this.state.messages.received);
        var toDisplay = this.state.mode ? this.state.messages.sent: this.state.messages.received;
        if (toDisplay)
            return (
                <div>
                    <center><h1>Message List</h1></center>
                    {toDisplay.map((message) => (
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">{message.sender}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">{message.subject}</h6>
                                <p class="card-text">{message.contents}</p>
                            </div>
                            <div></div>
                        </div>
                        </div>
                    ))}
                </div>
            )
    };


    renderReceived() {
        if (this.state.messages) {
            console.log(this.state.messages.received);
            if (!this.state.mode) {
                return this.renderMessages(this.state.messages.received);
            } else {
                return this.renderMessages(this.state.messages.sent)
            }
        }
    }
}
