import React from "react";
import { getUser } from "../../services/userServices";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, path, ...rest }) => {
  return (
    <div>
      {getUser() ? (
        <Route
          {...rest}
          path={path}
          render={(props) => <Component {...props} user={getUser()} />}
        />
      ) : (
                  <Redirect to={{
                      pathname: "/auth/login",
                      state: window.location.href
                  }} />
      )}
    </div>
  );
};

export default ProtectedRoute;
