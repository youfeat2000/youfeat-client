import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import emailjs from 'emailjs-com'

function Signup() {
  const { uri, email, setEmail} = useContext(AuthContext);
  const [fullName, setFullName] = useState(null);
  const [state, setState] = useState(null);
  const [PhoneNumber, setPoneNumber] = useState(null);
  const [password, setPassword] = useState(null);
  const [verifyPassword, setVerifyPassword] = useState(null);
  const navigate = useNavigate();

  const sendEmail = (code) => {
    console.log(code?.toString())
    const emailParams = {
      to_email: email,
      message: code?.toString(),
      to_name: fullName,
    };
    emailjs
      .send(process.env.REACT_APP_SERVICE_KEY, process.env.REACT_APP_TEMPLATE_KEY, emailParams, process.env.REACT_APP_USER_KEY)
      .then((response) => {
        navigate('../confirmemailcode')
        console.log("Email sent successfully:", response);
      })
      .catch((error) => {
        console.log("Email sending failed:", error);
      });
  };
   
  //send information to server
  const handleRegister = (e) => {
    if (password !== verifyPassword) {
      return alert("your password does not match");
    } else {
      e.target.disabled = true;
        e.target.style.backgroundColor = "grey";
        e.target.innerText = "Loading...";
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
          contestant: true,
          role: 2000,
          code: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
        }),
      })
        .then((res) => {
          if (res.ok) {
           return res.json();
          } else if (res.status === 403) {
            throw "Email already in use";
          } else if (res.status === 500) {
            throw "Server error";
          } else {
            throw "Error please try again";
          }
        })
        .then((data) => {
          console.log(data, data?.code)
          sendEmail(data?.code)
        })
        .catch((err) => alert(err))
        .finally(()=>{
          e.target.disabled = false;
        e.target.style.backgroundColor = "#e03e03";
        e.target.innerText = "Login";
        })
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
            <label>
              Full name<span style={{ color: "orangered" }}>*</span>
            </label>
            <input
              type="text"
              placeholder="full name"
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <br />
            <label>
              Email<span style={{ color: "orangered" }}>*</span>
            </label>
            <input
              type="text"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <label>
              Phone number<span style={{ color: "orangered" }}>*</span>
            </label>
            <input
              type="tel"
              placeholder="phone number"
              onChange={(e) => setPoneNumber(e.target.value)}
              required
            />
            <br />
          </div>
          <div>
            <label>
              Password<span style={{ color: "orangered" }}>*</span>
            </label>
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <label>
              Confirm password<span style={{ color: "orangered" }}>*</span>
            </label>
            <input
              type="password"
              placeholder="confirm password"
              onChange={(e) => setVerifyPassword(e.target.value)}
              required
            />
            <br />
            <label>
              State<span style={{ color: "orangered" }}>*</span>
            </label>
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
        <button onClick={(e)=>handleRegister(e)}>Register</button>
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
