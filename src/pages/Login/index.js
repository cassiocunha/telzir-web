import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

import Header from '../../components/Header';

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            message : this.props.location.state?this.props.location.state.message: '',
        };
    }
    signIn = () => {
        const data = {email: this.email, password: this.password};
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        };
        fetch('http://localhost:3000/login', requestInfo)
        .then(response => {
            if(response.status === 200 || (response.status >= 400 && response.status <= 500)) {
                return response.json();
            }
            throw new Error("Erro Inesperado");
        })
        .then(response => {
            if (response.token) {
                localStorage.setItem('token', response.token);
                this.props.history.push('/pesquisa');
            } else {
                this.setState({message: response.message});
            }
        }).catch(erro => {
            this.setState({message: erro.message});
        })
    }

    render() {
        return (
            <div className="col-md-6">
                <Header title="Login" />
                <hr className="my-3" />
                {
                    this.state.message !== '' ? (
                        <Alert color="danger" className="text-center">{this.state.message}</Alert>
                    ) : ''
                }
                <Form>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" id="email" onChange={e => this.email = e.target.value} placeholder="Informe seu e-mail" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Senha</Label>
                        <Input type="password" id="password" onChange={e => this.password = e.target.value} placeholder="Informe a senha" />
                    </FormGroup>
                    <Button color="primary" onClick={this.signIn} block>Entrar</Button>
                </Form>
            </div>
        );
    }
}