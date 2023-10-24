import React, { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import emailjs from 'emailjs-com'
import Popup from "../component/Popup";

function Signup() {
  const { uri, email, setEmail} = useContext(AuthContext);
  const [fullName, setFullName] = useState(null);
  const [state, setState] = useState(null);
  const [password, setPassword] = useState(null);
  const [verifyPassword, setVerifyPassword] = useState(null);
  const [catigory, setCatigory] = useState(null)
  const [message, setMessage] = useState(null)
  const navigate = useNavigate();
  const btnRef = useRef()

  const sendEmail = (code) => {
    const emailParams = {
      to_email: email,
      message: code?.toString(),
      to_name: fullName,
    };
    emailjs
      .send(process.env.REACT_APP_SERVICE_KEY, process.env.REACT_APP_TEMPLATE_KEY, emailParams, process.env.REACT_APP_USER_KEY)
      .then((response) => {
        navigate('../confirmemailcode')
      })
      .catch((error) => {
        setMessage("Email sending failed:");
      })
      .finally(()=>{
        btnRef.current.disabled = false;
        btnRef.current.style.backgroundColor = "#e03e03";
        btnRef.current.innerText = "Register";
      })
  };
   
  //send information to server
  const handleRegister = (e) => {
    if (password !== verifyPassword) {
      return alert("your password does not match");
    } else {
    btnRef.current.disabled = true;
    btnRef.current.style.backgroundColor = "grey";
    btnRef.current.innerText = "Loading...";
      fetch(`${uri}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          state,
          contestant: true,
          role: 2000,
          catigory,
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
          sendEmail(data?.code)
        })
        .catch((err) => {
          setMessage(err)
          btnRef.current.disabled = false;
          btnRef.current.style.backgroundColor = "#e03e03";
          btnRef.current.innerText = "Register";
        })
    }
  };
  

  return (
    <div className="login" onSubmit={(e) => e.preventDefault()}>
      <br />
      <form>
        <Popup message={message} setMessage={setMessage}/>
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
            Category<span style={{ color: "orangered" }}>*</span>
            </label>
            <select
              placeholder="catigory"
              required
              onChange={(e) => setCatigory(e.target.value)}>
              <option value={null}>select a catigory</option>
              <option value="Dance">Dance</option>
              <option value="Music">Music</option>
              <option value="Commedy">Comedy</option>
              <option value="Sport">Sport</option>
              <option value="Poetry/Speach">Poetry/Speach</option>
            </select>
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
        <button onClick={(e)=>handleRegister(e) } ref={btnRef}>Register</button>
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
