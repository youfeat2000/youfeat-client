import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

//this component wraps the protected routes to prevent unauthorised users from access
const ProtectedRoute = () => {
  const { auth } = useSelector((state) => state.AuthSlice);

  return <>{auth ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default ProtectedRoute;
