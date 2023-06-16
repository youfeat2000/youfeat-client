import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Login() {
  const { setAuth, uri } = useContext(AuthContext);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = () => {
    if (!email && !password) {
      alert("email/password required");
    }
    fetch(`${uri}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAuth(data);
        navigate("/dashboard");
      })
      .catch((err) => alert(err.message));
  };

  const navigate = useNavigate();
  return (
    <div className="login" onSubmit={(e) => e.preventDefault()}>
      <form>
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
        <button onClick={handleLogin}>Login</button>
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
