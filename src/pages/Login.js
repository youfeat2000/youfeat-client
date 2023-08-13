import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Login() {
  const { setAuth, uri } = useContext(AuthContext);
  const [email, setEmail] = useState(null);
  const [formWidth, setFormWidth] = useState("40%");
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();

  //checks the width to inform the width of the form
  useEffect(() => {
    if (window.innerWidth <= 850) {
      setFormWidth("90%");
    }
  }, []);

  const handleLogin = (e) => {
    if (!email && !password) {
      alert("email/password required");
    }
    e.target.style.backgroundColor = "grey";
    e.target.innerText = "Loading...";
    e.target.disabled = true;
    fetch(`${uri}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (res.ok) {
          res.json();
        } else if (res.status === 401) {
          alert("wrong email/password");
        } else if (res.status === 500) {
          alert("server error");
        }
      })
      .then((data) => {
        e.target.disabled = false;
        e.target.style.backgroundColor = "#e03e03";
        e.target.innerText = "Login";
        setAuth(data);
        navigate("/");
      })
      .catch((err) => {
        e.target.disabled = false;
        e.target.style.backgroundColor = "#e03e03";
        e.target.innerText = "Login";
      });
  };

  return (
    <div className="login">
      <form onSubmit={(e) => e.preventDefault()} style={{ width: formWidth }}>
        <br />
        <h2 style={{ color: "white" }}>Login</h2>
        <br />
        <label>Email</label>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label>password</label>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button onClick={(e) => handleLogin(e)}>Login</button>
        <br />
        <p style={{ fontSize: "larger", color: "white" }}>
          Don't have an account
          <span
            onClick={() => navigate("/signup")}
            style={{
              cursor: "pointer",
              color: "red",
              fontSize: "larger",
            }}>
            {" "}
            Signup
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
