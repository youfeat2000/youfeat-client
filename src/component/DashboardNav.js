import React, { useContext, useRef, useState } from "react";
import { CgProfile, CgSearch } from "react-icons/cg";
import { FaHamburger } from "react-icons/fa";
import ProfileContext from "../context/ProfileContext";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Search from "./Search";

//this is the navigation bar
function DashboardNav() {
  const { setToggle, user, toggle, users, setSearch } =
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
          <h1>
            <FaHamburger
              onClick={() => {
                toggle ? setToggle(false) : setToggle(true);
              }}
            />
          </h1>
          <span>
            <Search handleChange={handleChange} />
            <CgSearch className="search-icon" onClick={handleSearchToggle} />
            {/*checking if the user is logged in to display profile image */}
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
    </nav>
  );
}

export default DashboardNav;
