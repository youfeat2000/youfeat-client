import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

//this component wraps the protected routes to prevent unauthorised users from access
const ProtectedRoute = () => {
  const { auth } = useContext(AuthContext);

  return <>{auth ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default ProtectedRoute;
