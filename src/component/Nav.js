import React from "react";
import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  return (
    <nav className="nav">
      <h2>YOUFEAT</h2>
      <ul>
        <li>About</li>
        <li>Contacts</li>
        <li>Services</li>
        <li>Terms</li>
      </ul>
      <button onClick={() => navigate("/login")}>Login</button>
    </nav>
  );
}

export default Nav;
