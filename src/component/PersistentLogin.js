import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";
import ProfileContext from "../context/ProfileContext";

//this keeps the user logedin even after the page is refreshed
function PersistentLogin() {
  const { auth, setAuth, uri } = useContext(AuthContext);
  const { setUser } = useContext(ProfileContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //this useEffect checks if theres a refreshToken cookie
  useEffect(() => {
    const handleRefresh = () => {
      fetch(`${uri}/refresh`, {
        method: "POST",
        credentials: "include",
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          setAuth(data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          navigate("/login");
        });
    };

    auth ? setLoading(false) : handleRefresh();
  }, []);

  //this useEffect gets the user from the server and store it back in state
  useEffect(() => {
    fetch(`${uri}/user`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => console.log(err));
  }, [auth]);
  return (
    <>
      {loading ? (
        <h1 style={{ textAlign: "center", color: "grey", marginTop: "40px" }}>
          Loading...
        </h1>
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default PersistentLogin;
