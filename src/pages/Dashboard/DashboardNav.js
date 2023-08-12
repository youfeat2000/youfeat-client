import React, { useContext, useRef, useState } from "react";
import { CgProfile, CgSearch } from "react-icons/cg";
import { FaHamburger } from "react-icons/fa";
import ProfileContext from "../../context/ProfileContext";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Search from "./Search";

function DashboardNav() {
  const { setToggle, user, toggle, users, setSearch } =
    useContext(ProfileContext);
  const { uri, auth } = useContext(AuthContext);
  const [searchToggle, setSearchToggle] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    navigate("/dashboard");
    const i = users?.filter((value) => {
      return (
        value?.fullName.includes(e.target.value) ||
        value?.video?.title.includes(e.target.value) ||
        (value?.video?.description.includes(e.target.value) && value?.video)
      );
    });
    setSearch(i);
  };

  const handleSearchToggle = () => {
    setSearchToggle(true);
  };
  return (
    <nav className="dash-nav">
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
