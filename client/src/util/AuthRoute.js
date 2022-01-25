import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import Home from "../pages/Home";

const AuthRoute = (props) => {
  const { user } = useContext(AuthContext);

  return <>{user ? <Home /> : props.children}</>;
};

export default AuthRoute;
