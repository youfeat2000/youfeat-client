import React, { useContext, useEffect, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { AiFillHome, AiTwotoneSetting } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import AuthContext from "../../context/AuthContext";
import ProfileContext from "../../context/ProfileContext";

function DashbordSideBar() {
  const { handleLogout, uri } = useContext(AuthContext);
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
        <div onClick={() => navigate("./profile")}>
          <span>
            {user?.profileImage ? (
              <img src={`${uri}/image/${user?.profileImage}`} />
            ) : (
              <CgProfile />
            )}
          </span>
          <p>{user?.fullName}</p>
          <p style={{ color: "#374254", overflow: "hidden" }}>{user?.email}</p>
        </div>
        <ul>
          <li onClick={() => handleNavigate("/dashboard")}>
            <AiFillHome style={{ marginRight: "20px", fontSize: "40px" }} />
            Home
          </li>
          <li onClick={() => handleNavigate("./profile")}>
            <ImProfile style={{ marginRight: "20px", fontSize: "40px" }} />
            Profile
          </li>
          <li onClick={() => handleNavigate("./notification")}>
            <IoIosNotifications
              style={{
                marginRight: "20px",
                fontSize: "40px",
              }}
            />
            Notifications
          </li>
          <li onClick={() => handleNavigate("./setting")}>
            <AiTwotoneSetting
              style={{ marginRight: "20px", fontSize: "40px" }}
            />
            Setting
          </li>
          <li onClick={handleLogout} style={{ color: "red" }}>
            <BiLogOutCircle style={{ marginRight: "20px", fontSize: "40px" }} />
            logout
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DashbordSideBar;
