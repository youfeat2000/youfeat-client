import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaHamburger } from "react-icons/fa";

function DashboardNav() {
  const [toggle, setToggle] = useState(true);
  return (
    <nav className="dash-nav">
      <>
        {toggle ? (
          <h1 onClick={() => setToggle(false)}>
            <FaHamburger />
          </h1>
        ) : (
          <h1 onClick={() => setToggle(true)}>&times;</h1>
        )}
      </>
      <span>
        <CgProfile />
      </span>
      {!toggle && (
        <ul>
          <li>Home</li>
          <li>Profile</li>
          <li>Notification</li>
          <li>Setting</li>
        </ul>
      )}
    </nav>
  );
}

export default DashboardNav;
