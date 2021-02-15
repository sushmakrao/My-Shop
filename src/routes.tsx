import React from 'react';
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import App from './app/App';
import { OrderDetails } from './order-details/order-details';

export const Routes = () => {
    /* No match (404) will redirect to  identity providers page until we have the home page */
    const noMatchRedirect = () => {
        return (<Redirect to="/home" />);
    };

    return (
        <Router>
            <Switch>
                <Route sensitive={true} exact={true} component={App} path="/home" />
                <Route sensitive={true} exact={true} component={OrderDetails} path="/order-details/:orderId/:itemId" />
                <Route render={noMatchRedirect} />
            </Switch>
        </Router>
    );
}