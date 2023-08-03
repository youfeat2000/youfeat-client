import React, { useContext } from "react";
import { CgProfile, CgSearch } from "react-icons/cg";
import { FaHamburger } from "react-icons/fa";
import ProfileContext from "../../context/ProfileContext";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Search from "./Search";

function DashboardNav() {
  const { setToggle, user, toggle } = useContext(ProfileContext);
  const { uri, auth } = useContext(AuthContext);
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
        <Search />
        <CgSearch className="search-icon" />
        {auth && (
          <>
            {user?.profileImage ? (
              <img
                src={`${uri}/image/${user?.profileImage}`}
                onClick={() => navigate(`profile/${user?._id}`)}
              />
            ) : (
              <CgProfile />
            )}
          </>
        )}
        {!auth && (
          <p
            style={{ fontSize: "20px", fontWeight: "bolder" }}
            onClick={() => navigate("/login")}>
            Login
          </p>
        )}
      </span>
    </nav>
  );
}

export default DashboardNav;
