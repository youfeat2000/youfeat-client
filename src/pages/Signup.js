import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Signup() {
  const { uri } = useContext(AuthContext);
  const [contestant, setContestant] = useState(false);
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
          contestant,
          role: 2000,
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
      <br />
      <form>
        <h2 style={{ color: "white" }}>Register</h2>
        <br />
        <div className="input-con">
          <div>
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
          </div>
          <div>
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
          </div>
        </div>
        <br />
        <span>
          <label>Register as a contestant</label>
          <input
            type="checkbox"
            checked={contestant}
            onChange={() => setContestant(!contestant)}
            style={{
              padding: "10px",
              height: "20px",
              width: "40px",
              borderRadius: "0",
            }}
          />
        </span>
        <br />
        <button onClick={handleRegister}>Register</button>
        <br />
        <p style={{ fontSize: "larger", color: "white" }}>
          Have an account{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer", color: "red", fontSize: "larger" }}>
            Login
          </span>
        </p>
      </form>
      <br />
    </div>
  );
}

export default Signup;
