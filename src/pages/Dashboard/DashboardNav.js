import React, { useContext } from "react";
import { CgProfile, CgSearch } from "react-icons/cg";
import { FaHamburger } from "react-icons/fa";
import ProfileContext from "../../context/ProfileContext";
import AuthContext from "../../context/AuthContext";
import Searchbart from "./Searchbart";
import { useNavigate } from "react-router-dom";

function DashboardNav() {
  const { setToggle, user, toggle } = useContext(ProfileContext);
  const { uri } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="dash-nav">
      <h1>
        <FaHamburger
          onClick={() => {
            toggle ? setToggle(false) : setToggle(true);
          }}
        />
      </h1>
      <span>
        <Searchbart />
        {user?.profileImage ? (
          <img
            src={`${uri}/image/${user?.profileImage}`}
            onClick={() => navigate("profile")}
          />
        ) : (
          <CgProfile />
        )}
      </span>
    </nav>
  );
}

export default DashboardNav;
