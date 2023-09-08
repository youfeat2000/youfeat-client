import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../redux/redux-slice/AuthSlice";
import { setUser } from "../redux/redux-slice/UsersSlice";

//this keeps the user logedin even after the page is refreshed
function PersistentLogin() {
  const { auth, uri } = useSelector((state) => state.AuthSlice);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
          dispatch(setAuth(data));
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          navigate("/login");
        });
    };

    auth ? setLoading(false) : handleRefresh();
  }, [auth]);

  //this useEffect gets the user from the server and store it back in state
  useEffect(() => {
    fetch(`${uri}/user`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(setUser(data));
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
