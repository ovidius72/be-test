import loadable, {LoadableComponent} from "@loadable/component";
import * as React from "react";
import {Route, Switch} from "react-router-dom";
import Root from "../components/layout/Root";
import AuthenticatedRoute from "./AuthenticatedRoute";

export type AsyncPageProps = {
  page: string;
};

const AsyncPage: LoadableComponent<AsyncPageProps> = loadable(
  (props) => {
    return import(/* webpackPrefetch: true */ `../pages/${props.page}`);
  },
  {
    cacheKey: (props) => props.page,
    fallback: <div>Page is loading...</div>,
  }
);

const Routes: React.FC = () => (
  <Root>
    <Switch>
      <AuthenticatedRoute
        condition={(p) => !p.successful}
        exact
        path="/"
        render={() => <AsyncPage page="LoginPage" />}
        redirectOnMismatch="/dashboard"
      />
      <AuthenticatedRoute
        path="/dashboard"
        render={() => <AsyncPage page="DashboardPage" />}
        redirectOnMismatch="/"
      />
      <AuthenticatedRoute
        path="/orders"
        render={() => <AsyncPage page="OrdersPage" />}
        redirectOnMismatch="/"
      />
      <AuthenticatedRoute
        path="/order-details/:id"
        render={() => <AsyncPage page="OrderDetailsPage" />}
        redirectOnMismatch="/"
      />
      <Route component={() => <div>Not Found</div>} />
    </Switch>
  </Root>
);

export default Routes;
