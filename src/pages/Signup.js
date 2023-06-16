import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Signup() {
  const { uri } = useContext(AuthContext);
  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [state, setState] = useState(null);
  const [PhoneNumber, setPoneNumber] = useState(null);
  const [password, setPassword] = useState(null);
  const [verifyPassword, setSetVerifyPassword] = useState(null);
  const navigate = useNavigate();
  const handleRegister = () => {
    if (password !== verifyPassword) {
      return alert("your password does not match");
    } else {
      fetch(`${uri}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          PhoneNumber,
          password,
          state,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          navigate("/login");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="login" onSubmit={(e) => e.preventDefault()}>
      <form>
        <h2 style={{ color: "white" }}>Register</h2>
        <br />
        <label>Full name</label>
        <input
          type="text"
          placeholder="full name"
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <br />
        <label>Email</label>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label>Phone number</label>
        <input
          type="tel"
          placeholder="phone number"
          onChange={(e) => setPoneNumber(e.target.value)}
          required
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <label>Confirm password</label>
        <input
          type="password"
          placeholder="confirm password"
          onChange={(e) => setSetVerifyPassword(e.target.value)}
          required
        />
        <br />
        <label>State</label>
        <input
          type="text"
          placeholder="state"
          onChange={(e) => setState(e.target.value)}
          required
        />
        <br />
        <button onClick={handleRegister}>Register</button>
        <br />
      </form>
    </div>
  );
}

export default Signup;
