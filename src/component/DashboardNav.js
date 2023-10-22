import React, { useState, useContext } from "react";
import { CgProfile, CgSearch } from "react-icons/cg";
import { FaHamburger } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import logo from "../public/youfeatlogo.png";
import ProfileContext from "../context/ProfileContext";
import AuthContext from "../context/AuthContext";

//this is the navigation bar
function DashboardNav() {
  const { user, toggle, users, setSearch, setToggle } =
    useContext(ProfileContext);
  const { uri, auth } = useContext(AuthContext);
  const [searchToggle, setSearchToggle] = useState(false);
  const navigate = useNavigate();

  //this is the logic for the searchbar
  const handleChange = (e) => {
    navigate("/");
    const i = users?.filter((value) => {
      return (
        (value?.fullName.toLowerCase().includes(e.target.value.toLowerCase()) &&
          value?.video) ||
        (value?.video?.title
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) &&
          value?.video) ||
        (value?.video?.description
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) &&
          value?.video)
      );
    });
    setSearch(i);
  };

  //this helps the user toggle the searchbar in smaller screen
  const handleSearchToggle = () => {
    setSearchToggle(true);
  };
  return (
    <nav className="nav">
      {window.innerWidth >= 850 && (
        <img
          src={logo}
          alt="logo"
          style={{
            fontSize: "3rem",
            borderRadius: 0,
            position: "relative",
            border: "none",
          }}
        />
      )}
      <div className="search-con">
        {/*this is the searchbar for small screen */}
        {searchToggle ? (
          <div className="search-toggle">
            <p onClick={() => setSearchToggle(false)}>&times;</p>
            <input
              type="text"
              placeholder="search..."
              onChange={(e) => handleChange(e)}
            />
          </div>
        ) : (
          <>
            {window.innerWidth <= 850 && (
              <h1>
                <FaHamburger
                  onClick={() => {
                    toggle ? setToggle(false) : setToggle(true);
                  }}
                />
              </h1>
            )}
            <span>
              <Search handleChange={handleChange} />
              <CgSearch className="search-icon" onClick={handleSearchToggle} />
              {/*checking if the user is logged in to display profile image */}
              {auth && (
                <>
                  {user?.profileImage ? (
                    <small>
                      <img
                        src={`${uri}/image/${user?.profileImage}`}
                        alt='profile picture'
                        onClick={() => navigate(`profile/${user?._id}`)}
                      />
                    </small>
                  ) : (
                    <CgProfile />
                  )}
                </>
              )}
              {!auth && (
                <p
                  style={{
                    fontSize: "20px",
                    fontWeight: "bolder",
                    color: "#374254",
                  }}
                  onClick={() => navigate("/login")}>
                  Login
                </p>
              )}
            </span>
          </>
        )}
      </div>
    </nav>
  );
}

export default DashboardNav;
