import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import AuthContext from "../context/AuthContext";
import img from '../public/logo2.png'
import Popup from "../component/Popup";

function Login() {
  const { uri, setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState(null);
  const [formWidth, setFormWidth] = useState("40%");
  const [password, setPassword] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [message, setMessage] = useState(null)
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
          throw "wrong email/password";
        } else if (res.status === 500) {
          throw "server error";
        }
      })
      .then((data) => {
        setAuth(data);
        navigate("/");
      })
      .catch((err) => {
        setMessage(err);
      })
      .finally(()=>{
        e.target.disabled = false;
        e.target.style.backgroundColor = "#e03e03";
        e.target.innerText = "Login";
      })
  };

  return (
    <div className="login">
      <form onSubmit={(e) => e.preventDefault()} style={{ width: formWidth  }}>
        <Popup message={message} setMessage={setMessage}/>
        <img src={img} alt='logo' width='200px' />
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
          type={!toggle ? "password" : "text"}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span
          style={{
            position: "absolute",
            top: "360px",
            right: "40px",
            fontSize: "1.5rem",
            color: "#0e1424",
            cursor: 'pointer'
          }}>
          {!toggle ? (
            <AiOutlineEye onClick={() => setToggle(true)} />
          ) : (
            <AiOutlineEyeInvisible onClick={() => setToggle(false)} />
          )}
        </span>
        <br />
        <p style={{ fontSize: "larger", color: "white" }}>Forgot Password: <span style={{color:'green', cursor:'pointer', fontWeight: 600}} onClick={()=>navigate('../resetpassword')}>Reset</span></p>
        <br/>
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
