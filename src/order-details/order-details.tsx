import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import NavBar from '../navbar/navbar';
import * as orders from '../orders.json';
import { ProgressBar } from '../progress-bar/progressbar';
import './order-details.scss';
import moment from 'moment';

const getOrderDetails = (orderId: string, itemId: string)  => {
    let allOrders: any = JSON.stringify(orders);
    allOrders = JSON.parse(allOrders).default;
   
    let currentOrder = allOrders.find((order: any) => order.orderId.toString() === orderId);
    let items = JSON.parse(JSON.stringify(currentOrder.items));
    delete currentOrder.items;
    console.log(currentOrder);
    let detailed_items=items.map((item: any) =>{
        return{...currentOrder,...item};
    })
    console.log(detailed_items);
    return detailed_items;
    
};  

const delayedItem = (orderDetails: any) =>  {
    const address = orderDetails.shippingAddress;

    return (
        <>
            <h5>Order #{orderDetails.orderId}</h5>
            <hr></hr>
            <p className="font-weight-bold text-dark"> Heads up: The shipped date changed.</p>
            <p>Before we can complete your order, review the new date to confirm if you're OK with it.</p>
            <ProgressBar status={orderDetails.status} />
            <p className="font-weight-bold text-dark"> Items ordered: {orderDetails.quantity}</p>
            <p>
                Don't forget to let us know if you accept the new ship date. We'll cancel order if we don't hear from you soon.
            </p>
            <div>
                <p className="font-weight-bold text-dark">
                    New estimated ship date:
                </p>
                <p>
                    {moment(orderDetails.newEstimatedShipDateRange.fromDate).format("LL")} - {moment(orderDetails.newEstimatedShipDateRange.toDate).format("LL")}
                </p>

            </div>
            <div>
                <p>
                    Original estimated ship date:
                </p>
                <p>
                    {moment(orderDetails.estimatedShipDateRange.fromDate).format("LL")} - {moment(orderDetails.estimatedShipDateRange.toDate).format("LL")}
                </p>
            </div>

            <p>
                <span className="font-weight-bold text-dark">Address: </span>
                <span>
                    {address.street || ''}, {address.city || ''}, {address.state || ''}, {address.zip || ''}
                </span>
            </p>

            <div className="mb-2">
                <Button variant="primary" size="lg" block>Accept new ship date</Button>{' '}
            </div>
            <div className="mb-2">
                <Button variant="outline-secondary" size="lg" block>Cancel your order</Button>{' '}
            </div>
            
        </>
    )
}

const orderedItem = (orderDetails: any) => {
    // No use case of as now.
    return (
        <div>Building...</div>
    )
}

const shippedItem = (orderDetails: any) => {
    const shipments = orderDetails.shipments;
    const shipment = shipments.find((shipment: any) => shipment.items.includes(orderDetails.id));
    const address = orderDetails.shippingAddress;

    return (
        <>
            <h5>Order #{orderDetails.orderId}</h5>
            <hr></hr>
            <p className="font-weight-bold text-dark"> Get excited!</p>
            <p>Fun stuff is heading your way.</p>
            <ProgressBar status={orderDetails.status} />
            <p className="font-weight-bold text-dark"> Items ordered: {orderDetails.quantity}</p>
            <div>
                <p className="font-weight-bold text-dark">
                    {shipment.carrier} tracking:
                </p>
                <p>
                    <a href={shipment.trackingUrl} target="_blank" rel="noreferrer">{shipment.trackingNumber}</a>
                </p>
            </div>
            <div>
                <p className="font-weight-bold text-dark">
                    Estimated deliver date:
                </p>
                <p>
                    {moment(shipment.estimatedDeliveryDate).format("LL")}
                </p>
            </div>

            <p>
                <span className="font-weight-bold text-dark">Address: </span>
                <span>
                    {address.street || ''}, {address.city || ''}, {address.state || ''}, {address.zip || ''}
                </span>
            </p>
        </>
    )
}

const deliveredItem = (orderDetails: any) => {
    const shipments = orderDetails.shipments;
    const shipment = shipments.find((shipment: any) => shipment.items.includes(orderDetails.id));
    const address = orderDetails.shippingAddress;
    return (
        <>
            <h5>Order #{orderDetails.orderId}</h5>
            <hr></hr>
            <p className="font-weight-bold text-dark"> Are you thrilled!</p>
            <p>You fun stuff has been shipped!</p>
            <ProgressBar status={orderDetails.status} />
            <p className="font-weight-bold text-dark"> Items ordered: {orderDetails.quantity}</p>
            <div>
                <p className="font-weight-bold text-dark">
                    {shipment.carrier} tracking:
                </p>
                <p>
                    <a href={shipment.trackingUrl} target="_blank" rel="noreferrer">{shipment.trackingNumber}</a>
                </p>
            </div>
            <div>
                <p className="font-weight-bold text-dark">
                    Shipment date:
                </p>
                <p>
                    {moment(shipment.shipDate).format("LL")}
                </p>
            </div>

            <p>
                <span className="font-weight-bold text-dark">Address: </span>
                <span>
                    {address.street || ''}, {address.city || ''}, {address.state || ''}, {address.zip || ''}
                </span>
            </p>
        </>
    )
}


export const OrderDetails = () => {
    const params: any = useParams();

    const orderDetails: any = getOrderDetails(params.orderId , params.ItemId);
    console.log(orderDetails);
    return (
        <>
            <div className="App">
                <NavBar />
            </div>
            <Container className="order-details-container">
                {orderDetails.map((item:any, index:any) => {

                  return( <Row>
                   <Col xs={12} md={6} lg={6}>
                   {
                       !!item.userAcceptedDelay ? delayedItem(item) : null
                   }
                   {
                       (item.status === 'ordered' && !item.userAcceptedDelay) ? orderedItem(item) : null
                   }
                   {
                       item.status === 'shipped' ? shippedItem(item) : null
                   }
                   {
                       item.status === 'delivered' ? deliveredItem(item) : null
                   }
                   </Col>
                   <Col xs={12} md={6} lg={6}>
                       <Card>
                           <Row>
                               <Col xs={6} md={12} lg={6}>
                                   <Card.Img variant="top" src={item.image} />
                               </Col>
                               <Col xs={6} md={12} lg={6}>
                                   <Card.Body>
                                       <Card.Text>
                                           <div>
                                               <p><span className="font-weight-bold text-dark">{item.name}</span></p>
                                               <p><span>{item.skuAttributes.color}</span></p>
                                               <p><span>{item.skuAttributes.size}</span></p>
                                               <p>Qty: <span>{item.quantity}</span></p>
                                           </div>
                                       </Card.Text>
                                       
                                   </Card.Body>
                               </Col>
                           </Row>
                       </Card>
                   </Col>
               </Row> )
                })}
            </Container>
        </>
    )
}
;
