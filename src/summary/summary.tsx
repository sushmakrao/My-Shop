import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { ProgressBar } from '../progress-bar/progressbar';
import './summary.css';

type SummaryProp = {
    orderId: string;
    id: string;
    name: string;
    skuAttributes: any;
    quantity: number;
    status: string;
    image: string;
}

export const Summary = (props: SummaryProp) => {
    const {orderId, image, name, skuAttributes, quantity, status} = props;
    return (
        <Card>
            <Row>
                <Col xs={12} md={12} lg={12}>
                    <Card.Img variant="top" src={image} />
                </Col>
                <Col xs={12} md={12} lg={12}>
                    <Card.Body>
                        <Card.Title>Order #{orderId}</Card.Title>
                        <Card.Text>
                            <ProgressBar status={status} />
                            <div>
                                <p><span className="font-weight-bold text-dark">{name}</span></p>
                                <p><span>{skuAttributes.color}</span></p>
                                <p><span>{skuAttributes.size}</span></p>
                                <p>Qty: <span>{quantity}</span></p>
                            </div>
                        </Card.Text>
                        
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    )
};
