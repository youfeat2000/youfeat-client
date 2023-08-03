import React, { useContext, useEffect, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { AiFillHome, AiFillTrophy } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import AuthContext from "../../context/AuthContext";
import ProfileContext from "../../context/ProfileContext";

function DashbordSideBar() {
  const { handleLogout, uri, auth } = useContext(AuthContext);
  const { user, toggle, setToggle } = useContext(ProfileContext);
  const navigate = useNavigate();
  const sidebarRef = useRef();
  useEffect(() => {
    if (window.innerWidth < 850) {
      if (toggle) {
        sidebarRef.current.style.display = "none";
      } else {
        sidebarRef.current.style.display = "block";
      }
    } else {
      sidebarRef.current.style.display = "block";
    }
  }, [toggle]);

  const handleNavigate = (e) => {
    setToggle(true);
    navigate(e);
  };
  return (
    <div className="side-bar" ref={sidebarRef}>
      <div>
        <i className="sidebar-exit" onClick={() => setToggle(true)}>
          &times;
        </i>
        <div onClick={() => navigate(`./profile/${user?._id}`)}>
          <>
            {user?.profileImage ? (
              <span>
                <img src={`${uri}/image/${user?.profileImage}`} alt="ropfile" />
              </span>
            ) : (
              <span style={{ border: "none" }}>
                <CgProfile />
              </span>
            )}
          </>
          <p>{user?.fullName}</p>
          <p style={{ color: "#374254", overflow: "hidden" }}>{user?.email}</p>
        </div>
        <ul>
          <li onClick={() => handleNavigate("/dashboard")}>
            <AiFillHome style={{ marginRight: "20px", fontSize: "30px" }} />
            Home
          </li>
          {auth && (
            <li onClick={() => handleNavigate(`./profile/${user?._id}`)}>
              <ImProfile style={{ marginRight: "20px", fontSize: "30px" }} />
              Profile
            </li>
          )}
          {user?.role === 1999 && (
            <li onClick={() => handleNavigate("./admin")}>
              <ImProfile style={{ marginRight: "20px", fontSize: "30px" }} />
              Admin
            </li>
          )}
          <li onClick={() => handleNavigate("./rank")}>
            <AiFillTrophy style={{ marginRight: "20px", fontSize: "30px" }} />
            Ranking board
          </li>
          {auth && (
            <li onClick={() => handleNavigate("./notification")}>
              <IoIosNotifications
                style={{
                  marginRight: "20px",
                  fontSize: "30px",
                }}
              />
              Notifications
            </li>
          )}
          {auth && (
            <li onClick={handleLogout} style={{ color: "red" }}>
              <BiLogOutCircle
                style={{ marginRight: "20px", fontSize: "30px" }}
              />
              Logout
            </li>
          )}
          {!auth && (
            <li onClick={() => navigate("/login")} style={{ color: "green" }}>
              <BiLogInCircle
                style={{ marginRight: "20px", fontSize: "30px" }}
              />
              Login
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default DashbordSideBar;
