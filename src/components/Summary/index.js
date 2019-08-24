import React from 'react';
import { Card, CardTitle, CardText, Button, Row, Col } from 'reactstrap';
import { tsModuleBlock } from '@babel/types';

function formatCurrency(value) {
    if (value != undefined) {
        return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    }
    return '';
}

const Summary = ({ summary }) => {
    if (summary) {
        return (<Row>
            <Col>
                <Card body>
                    <CardTitle><h5>Com Plano {summary.planName}</h5></CardTitle>
                    <CardText>Origem: {summary.originCode}</CardText>
                    <CardText>Destino: {summary.destinationCode}</CardText>
                    <CardText>Tempo: {summary.totalMinutes} minutos</CardText>
                    <CardText><h4>Valor: {summary.planPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h4></CardText>
                </Card>
            </Col>
            <Col>
                <Card body>
                    <CardTitle><h5>Sem Plano {summary.planName}</h5></CardTitle>
                    <CardText>Origem: {summary.originCode}</CardText>
                    <CardText>Destino: {summary.destinationCode}</CardText>
                    <CardText>Tempo: {summary.totalMinutes} minutos</CardText>
                    <CardText><h4>Valor: {summary.regularPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h4></CardText>
                </Card>
            </Col>
        </Row>);
    }
    return (<div></div>);
};

export default Summary;