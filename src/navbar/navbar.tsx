import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import * as orders from '../orders.json';
import { Summary } from '../summary/summary';


// Get list of all item with their orderId attached to them.
const createOrdersData = () => {
  let allOrders: any = JSON.stringify(orders);
  allOrders = JSON.parse(allOrders).default;
  return allOrders.map((order: any) => {
    const orderId = order.orderId;
    const items = order.items.map((item: any) => {
      return {...item, orderId};
    })
    return items;
  }).flat();
};

function NavBar() {
  const orders = createOrdersData();
  const history = useHistory();

  const navigateToOrderDetails = (orderId: string, itemId: string) => {
    history.push(`/order-details/${orderId}/${itemId}`);
  }

  const navigateToHome = (e: any) => {
    e.preventDefault();
    history.push("/home");
  }

  return (
    <Navbar className="sticky-top" collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand onClick={navigateToHome} href='#/home'>My Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Products" id="collasible-nav-dropdown1" disabled/>
            <NavDropdown title="Brands" id="collasible-nav-dropdown2" disabled/>
            <NavDropdown title="Deals" id="collasible-nav-dropdown3" disabled/>
            <NavDropdown title="Services" id="collasible-nav-dropdown4" disabled/>
          </Nav>
          <Nav>
            <NavDropdown title="Account" id="collasible-nav-dropdown5" disabled/>
            <NavDropdown title="Order Status" id="collasible-nav-dropdown6">
              {
                orders.map((order: any, index: number) => {
                  return (
                    <React.Fragment key={`${order.orderId}-${order.id}`}>
                      <NavDropdown.Item onClick={navigateToOrderDetails.bind(null, order.orderId, order.id)}>
                        <Summary {...order}></Summary>
                      </NavDropdown.Item>
                      {index < orders.length-1 ? <NavDropdown.Divider /> : null}
                    </React.Fragment>
                  );
                })
              }
            </NavDropdown>
            <NavDropdown title="Recently Viewed" id="collasible-nav-dropdown7" disabled/>
            <NavDropdown title="Saved Items" id="collasible-nav-dropdown8" disabled/>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
  );
}

export default NavBar;
