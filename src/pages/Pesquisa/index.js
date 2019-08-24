import React, { Component } from 'react';

import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { Row, Col } from 'reactstrap';
import { Card, CardTitle, CardText } from 'reactstrap';

import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import Summary from '../../components/Summary';

export default class Pesquisa extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: {},
            message : this.props.location.state?this.props.location.state.message: ''
        }
    }

    createSelectItems() {
        let items = [];
        if (this.state.product.plans) {
            for (let i = 0; i < this.state.product.plans.length; i++) {
                const slug = this.state.product.plans[i].slug;
                const desc = this.state.product.plans[i].name;
                items.push(<option key={slug} value={slug}>{desc}</option>);   
            }
        }         
        return items;
    }

    getPlanSummary = () => {
        const token = localStorage.getItem('token');
        const data = {originCode: this.originCode, destinationCode: this.destinationCode, planSlug: this.planSlug, totalMinutes: this.totalMinutes};
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }),
        };
        fetch('http://localhost:3000/plan/summary', requestInfo)
        .then(response => {
            if(response.status === 200 || (response.status >= 400 && response.status <= 500)) {
                return response.json();
            }
            throw new Error("Erro Inesperado");
        })
        .then(response => {
            if (!response.message) {
                this.setState({summary : response})
            } else {
                this.setState({message: response.message});
            }
        }).catch(erro => {
            this.setState({message: erro.message});
        })
    };

    componentDidMount() {
        const token = localStorage.getItem('token');
        fetch('http://localhost:3000/product/fale-mais', { headers: new Headers({ 'Authorization': `Bearer ${token}` })})
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error("Oops! Ocorreu um erro. :(");
        })
        .then(product => {
            this.setState({product})
        })
        .catch(e => console.log(e));
    }

    render() {
        return (
            <div>
                <Header title={"Calcular Tarifa Plano " + this.state.product.name} />
                <hr className="my-3" />
                {
                    this.state.message !== '' ? (
                        <Alert color="danger" className="text-center">{this.state.message}</Alert>
                    ) : ''
                }
                <Form>
                    <FormGroup>
                        <Label for="originCode">Código Origem</Label>
                        <Input type="text" name="originCode" onChange={e => this.originCode = e.target.value} id="originCode" placeholder="Ex. 011"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="destinationCode">Código Destino</Label>
                        <Input type="text" name="destinationCode" onChange={e => this.destinationCode = e.target.value} id="destinationCode" placeholder="Ex. 016"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="totalMinutes">Tempo de ligação em Minutos</Label>
                        <Input type="number" name="totalMinutes" onChange={e => this.totalMinutes = e.target.value} id="totalMinutes" placeholder="Informe os minutos"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="planSlug">Selecione um plano</Label>
                        <Input type="select" onChange={e => this.planSlug = e.target.value} name="planSlug" id="planSlug">
                            <option>Selecione um plano</option>
                            {this.createSelectItems()}
                        </Input>
                    </FormGroup>
                </Form>
                <Row>
                    <Col sm={{ size: 'auto', offset: 0 }}><Button color="primary" onClick={this.getPlanSummary} block>Calcular</Button></Col>
                    <Col sm={{ size: 'auto', offset: 0 }}> <Link to="/logout" className="btn btn-outline-primary"> Sair </Link></Col>
                </Row>
                <hr className="my-3" />
                <Summary summary={this.state.summary} />
            </div>
        );
    }
}