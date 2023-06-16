import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function PreventLogin() {
  const { auth } = useContext(AuthContext);
  return <>{auth ? <Navigate to="dashboard" /> : <Outlet />}</>;
}

export default PreventLogin;
