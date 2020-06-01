import React, { Component, useEffect } from "react";
import Login from "../UserAuth/login";
import AppList from "../Apps";
import Try from "./try";
import TenantLogin from "../UserAuth/tenantLogin";
import Tenants from "../Tenants/tenants";
import Home from "../Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function Layout(props) {
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/" component={Login} />
        <Route
          path="/tenantlogin"
          history={props.history}
          component={TenantLogin}
        />
        <Route path="/tenants" history={props.history} component={Tenants} />
        <Route path="/apps" history={props.history} component={AppList} />
        <Route
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
