import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import ProfileContext from "../context/ProfileContext";
import AuthContext from "../context/AuthContext";

//this component checks if the user is loged in to prevent them from loging in twice
function PreventLogin() {
  const { auth, setAuth, handleLogout } = useContext(ProfileContext);
  const {uri} = useContext(AuthContext)
  const [loading, setLoading] = useState(true);

  //this useEffect gets back an accessToken if theres a refreshToken
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
  }, []);
  return (
    <>
      {loading ? (
        <h1 style={{ textAlign: "center", color: "grey", marginTop: "40px" }}>
          Loading...
        </h1>
      ) : (
        <>{auth ? <Navigate to="/" /> : <Outlet />}</>
      )}
    </>
  );
}

export default PreventLogin;
