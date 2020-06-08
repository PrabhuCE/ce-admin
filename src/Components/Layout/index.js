import React, { Component, useEffect } from "react";
import { PrivateRoute, SelectedRoute } from '../../router';
import Login from "../UserAuth/login";
import AppList from "../Apps";
import Try from "./try";
import TenantLogin from "../UserAuth/tenantLogin";
import Tables from "../Tables";
import Home from "../Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function Layout(props) {
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/" component={Login} />
        <Route path="/apps" history={props.history} component={AppList} />
        <PrivateRoute
          path="/tenantlogin"
          history={props.history}
          component={TenantLogin}
        />
        <PrivateRoute
          path="/:tenantId/tables"
          history={props.history}
          component={Tables}
        />
        <PrivateRoute
          path="/:tenantId/home"
          history={props.history}
          component={Home}
        />
        <Route path="/try" history={props.history} component={Try} />
      </Switch>
    </Router>
  );
}

export default Layout;
