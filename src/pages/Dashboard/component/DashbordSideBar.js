import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import ProfileContext from "../../../context/ProfileContext";

function DashbordSideBar() {
  const { handleLogout, uri } = useContext(AuthContext);
  const { user } = useContext(ProfileContext);
  const navigate = useNavigate();
  return (
    <div className="side-bar">
      <div>
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
          <li onClick={() => navigate("/dashboard")}>Home</li>
          <li onClick={() => navigate("./profile")}>profile</li>
          <li onClick={() => navigate("./notification")}>Notifications</li>
          <li onClick={() => navigate("./setting")}>Setting</li>
          <li onClick={handleLogout} style={{ color: "red" }}>
            logout
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DashbordSideBar;
