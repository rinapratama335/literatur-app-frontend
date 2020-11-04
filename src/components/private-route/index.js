import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { BlockLoading } from "react-loadingg";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(UserContext);
  console.log("State user:", state.user);

  return (
    <Route
      {...rest}
      render={(props) =>
        state.loading ? (
          <BlockLoading />
        ) : state.isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
