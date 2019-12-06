import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./Components/Layout";
import { Representatives, Companies } from "./Pages";

const Routes = _ => {
  return (
    <Switch>
      <Layout>
        <Route exact path="/" component={Representatives} />
        <Route path="/companies" component={Companies} />
      </Layout>
    </Switch>
  );
};

export default Routes;
