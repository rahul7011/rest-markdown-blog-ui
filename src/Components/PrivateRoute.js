import React from "react";
import { Redirect, Route } from "react-router";
import { AuthenticationService } from "../Services/AuthenticationServices";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (AuthenticationService.isAuthenticated) {
        return <Component {...props} />;
      }
      return <Redirect to="/login" />;
    }}
  />
);

export default PrivateRoute;
