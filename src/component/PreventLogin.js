import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function PreventLogin() {
  const { auth, uri, setAuth, handleLogout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${uri}/refresh`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 401) {
          handleLogout();
        }
      })
      .then((data) => setAuth(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [auth]);
  return (
    <>
      {loading ? (
        <h1 style={{ textAlign: "center", color: "grey", marginTop: "40px" }}>
          Loading...
        </h1>
      ) : (
        <>{auth ? <Navigate to="dashboard" /> : <Outlet />}</>
      )}
    </>
  );
}

export default PreventLogin;
