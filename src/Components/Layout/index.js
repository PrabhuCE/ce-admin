import React, { Component, useEffect } from "react";
import { PrivateRoute, BlogPrivateRoute } from '../../router';
import Login from "../UserAuth/login";
import AppList from "../Apps";
import Try from "./try";
import TenantLogin from "../UserAuth/tenantLogin";
import Tables from "../Tables";
import Home from "../Home";
import BlogLogin from "../UserAuth/blogLogin";
import Blog from "../Blog";
import BlogCreate from '../Blog/createNew';
import BlogConfig from '../Blog/blogConfig';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function Layout(props) {
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/" component={Login} />
        <Route path="/bloglogin" history={props.history} component={BlogLogin} />
        <Route path="/createblog" history={props.history} component={BlogCreate} />
        <Route path="/blogconfig" history={props.history} component={BlogConfig} />
        <Route path="/apps" history={props.history} component={AppList} />
        <PrivateRoute
          path="/tenantlogin"
          history={props.history}
          component={TenantLogin}
        />
        <Route path="/blog" history={props.history} component={Blog} />
        {/* <BlogPrivateRoute
          path="/blog"
          history={props.history}
          component={Blog}
        /> */}
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
