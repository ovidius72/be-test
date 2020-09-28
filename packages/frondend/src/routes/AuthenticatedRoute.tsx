import React, {FC} from "react";
import {Redirect, Route, RouteComponentProps, RouteProps} from "react-router";
import {ILoginState} from "src/features/login/login.slice";
import {userAppSelector} from "src/store/store";

type AuthenticatedRouteProps = {
  component?:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  redirectOnMismatch?: string;
  condition?: (props: ILoginState) => boolean;
};

type AllProps = AuthenticatedRouteProps & RouteProps;

const AuthenticatedRoute: FC<AllProps> = ({
  condition,
  component: Component,
  render,
  redirectOnMismatch,
  ...routeProps
}) => {
  const loginState = userAppSelector((s) => s.login);
  const nextCondition = condition
    ? condition(loginState)
    : loginState.successful;
  if (typeof Component === "undefined" && !render) {
    throw Error("render function or component expected");
  }
  return (
    <Route
      {...routeProps}
      render={(componentProps) => {
        if (nextCondition) {
          if (render) {
            return render(componentProps);
          } else if (typeof Component !== "undefined") {
            return <Component {...componentProps} />;
          }
        } else {
          if (redirectOnMismatch) {
            return <Redirect to={redirectOnMismatch} />;
          }
          return <div>You are not authorized to access thie resource.</div>;
        }
      }}
    />
  );
};

export default AuthenticatedRoute;
