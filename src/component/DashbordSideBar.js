import React, { useEffect, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { AiFillHome, AiFillTrophy } from "react-icons/ai";
import { FcAbout } from "react-icons/fc";
import { ImProfile } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { handleLogout, setAuth } from "../redux/redux-slice/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { setToggle } from "../redux/redux-slice/UsersSlice";

//this is the sidebar
function DashbordSideBar() {
  const { uri, auth } = useSelector((state) => state.AuthSlice);
  const { user, toggle } = useSelector((state) => state.UsersSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sidebarRef = useRef();

  //this useEffect checks if it is a mobile screen to hide the sidebar or not
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

  const logout = () => {
    dispatch(handleLogout());
    dispatch(setAuth(null));
  };

  const handleNavigate = (e) => {
    dispatch(setToggle(true));
    navigate(e);
  };
  return (
    <div className="side-bar" ref={sidebarRef}>
      <div>
        <h2 className="sidebar-exit" onClick={() => dispatch(setToggle(true))}>
          &times;
        </h2>
        <div onClick={() => handleNavigate(`/profile/${user?._id}`)}>
          {auth && (
            <>
              {/*profile head*/}
              {user?.profileImage ? (
                <span>
                  <img
                    src={`${uri}/image/${user?.profileImage}`}
                    alt="ropfile"
                  />
                </span>
              ) : (
                <span style={{ border: "none" }}>
                  <CgProfile />
                </span>
              )}
            </>
          )}
          <p>{user?.fullName}</p>
          <p style={{ color: "#374254", overflow: "hidden" }}>{user?.email}</p>
        </div>
        {/*navigation list*/}
        <ul>
          <li onClick={() => handleNavigate("/")}>
            <AiFillHome style={{ marginRight: "20px", fontSize: "30px" }} />
            Home
          </li>
          {auth && (
            <li onClick={() => handleNavigate(`/profile/${user?._id}`)}>
              <ImProfile style={{ marginRight: "20px", fontSize: "30px" }} />
              Profile
            </li>
          )}
          {user?.role === 1999 && (
            <li onClick={() => handleNavigate("/admin")}>
              <ImProfile style={{ marginRight: "20px", fontSize: "30px" }} />
              Admin
            </li>
          )}
          <li onClick={() => handleNavigate("/rank")}>
            <AiFillTrophy style={{ marginRight: "20px", fontSize: "30px" }} />
            Ranking board
          </li>
          {auth && (
            <li onClick={() => handleNavigate("/notification")}>
              <IoIosNotifications
                style={{
                  marginRight: "20px",
                  fontSize: "30px",
                }}
              />
              Notifications
            </li>
          )}
          <li onClick={() => handleNavigate("/about")}>
            <FcAbout
              style={{
                marginRight: "20px",
                fontSize: "30px",
              }}
            />
            About
          </li>
          {auth && (
            <li onClick={logout} style={{ color: "red" }}>
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
