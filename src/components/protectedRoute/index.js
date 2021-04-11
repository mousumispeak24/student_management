import React from "react";
import { Route, } from "react-router-dom";

const ProtectedRoute = ({
  isLoggedIn,
  component: Component,
  render,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};


export default ProtectedRoute;
