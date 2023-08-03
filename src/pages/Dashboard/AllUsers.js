import React, { useContext, useState } from "react";
import ProfileContext from "../../context/ProfileContext";
import AuthContext from "../../context/AuthContext";
import Notify from "./Notify";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

function AllUsers() {
  const { users } = useContext(ProfileContext);
  const { uri } = useContext(AuthContext);
  const [sendTo, setSendTo] = useState(null);
  const navigate = useNavigate();
  return (
    <>
      {users?.map((value) => {
        return (
          <div className="all-users" key={value?._id}>
            <div>
              {value?.profileImage ? (
                <img
                  src={`${uri}/image/${value?.profileImage}`}
                  alt="profile"
                />
              ) : (
                <CgProfile size={"60px"} />
              )}
              <span>
                <h3>{value?.fullName}</h3>
                <p>{value?.email}</p>
              </span>
            </div>
            <br />
            <div>
              <button onClick={() => setSendTo(value?._id)}>Notify</button>
              <button style={{ color: "red", border: "1px solid red" }}>
                Block
              </button>
            </div>
          </div>
        );
      })}
      <Notify sendTo={sendTo} setSendTo={setSendTo} />
    </>
  );
}

export default AllUsers;
