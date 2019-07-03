import {Component} from "react";
import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";

class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: null,
            mode: false,
            show: false,
            to: "",
            subject: "",
            contents: "",
        };

    }


    componentWillMount() {
        let headers = new Headers();
        headers.append("authorization", "Bearer " + localStorage.getItem("token"));
        console.log(this.state.data);
        return fetch('http://ec2-3-82-218-146.compute-1.amazonaws.com:8080/api/message/all',
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
            .catch(console.log);

    }
    handleChange = event => {
        this.setState({[event.target.id]: event.target.value});
    };

    render(){
        return (
            <div>
                {this.renderReceived()}
            </div>
        )
    }

    renderMessages = () => {
        let toDisplay = this.state.mode ? this.state.messages.sent : this.state.messages.received;
        if (toDisplay)
            return (
                <div>
                    <Row>
                        <ButtonGroup size="lg">
                            <Button variant={ this.state.mode ? "secondary" : "primary"} onClick={() => this.swapMessages()}>Recibidos</Button>
                            <Button variant={ !this.state.mode ? "secondary" : "primary"} onClick={() => this.swapMessages()}>Enviados</Button>
                            <Button variant="secondary" onClick={() => this.sendMessage("")}>Nuevo mensaje</Button>
                        </ButtonGroup>
                    </Row>
                    {toDisplay.map((message) => (
                        <div class="card">
                            <Row>
                                <div class="card-body">
                                    <h5 class="card-title">{this.state.mode ? "Para: " + message.receiver : "De: " + message.sender}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">{message.subject}</h6>
                                    <p class="card-text">{message.contents}</p>
                                </div>
                                <Button variant="primary" onClick={() => this.sendMessage(message.sender)}>
                                    Responder
                                </Button>
                            </Row>
                        </div>
                    ))}
                    <Modal show={this.state.show} onHide={() => this.handleClose()}>
                        <Modal.Header closeButton>
                            <Modal.Title>Redactar mensaje</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form
                                noValidate
                                validated={false}
                                onSubmit={e => this.handleSubmit(e)}
                            >
                                <Form.Group as={Row} controlId="to">
                                    <Form.Label column sm="2">
                                        Para
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control onChange={this.handleChange} defaultValue={this.state.to}/>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="subject">
                                    <Form.Label column sm="2">
                                        Asunto
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control  onChange={this.handleChange} placeholder=""/>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="contents">
                                    <Form.Label column sm="2">
                                        Contenido
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control onChange={this.handleChange} placeholder=""/>
                                    </Col>
                                </Form.Group>
                                <Button variant="secondary" onClick={() => this.handleClose}>
                                    Cancelar
                                </Button>
                                <Button variant="primary" type="submit" form="form1" onClick={event => this.handleSubmit(event)}>
                                    Enviar
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>

                </div>
            )
    };

    handleSubmit(event) {
        console.log(this.state.data);
        event.preventDefault();
        let data = this.state;
        console.log(this.state);
        let headers = new Headers();
        headers.append("authorization", "Bearer " + localStorage.getItem("token"));
        headers.append("Content-Type", "application/json");
        fetch('http://ec2-3-82-218-146.compute-1.amazonaws.com:8080/api/message/send',
            {
                headers: headers,
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                body: JSON.stringify(data)

            })
            .then(res => res.json())
            .then((data) => {
                this.setState({messages: data})
            })
            .catch(console.log);
        this.setState({show: false})
        this.componentWillMount();
    }


    swapMessages() {
        this.setState({mode: !this.state.mode});
    }


    renderReceived() {
        if (this.state.messages) {
            if (!this.state.mode) {
                return this.renderMessages(this.state.messages.received);
            } else {
                return this.renderMessages(this.state.messages.sent)
            }
        }
    }

    handleClose() {
        this.setState({show: false})
    }

    sendMessage(to) {
        this.setState({to: to});
        this.setState({show: true});
    }
}
export default Messages;
