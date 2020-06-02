import React from 'react';
import {
    Route,
    Redirect
} from "react-router-dom";
import { getLoggedInStatus, getProductSelectionStatus } from '../src/Helpers/basics';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        getLoggedInStatus() === true
            ? <Component {...props} />
            : <Redirect to='/tenantLogin' />
    )} />
)

export const SelectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        getProductSelectionStatus() === true
            ? <Component {...props} />
            : <Redirect to='/apps' />
    )} />
)