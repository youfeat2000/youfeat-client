import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";

function PersistentLogin() {
  const { auth, setAuth, uri } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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
