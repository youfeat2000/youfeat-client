import React, { useContext, useState } from "react";
import Notify from "./Notify";
import { CgProfile } from "react-icons/cg";
import AuthContext from "../../context/AuthContext";
import ProfileContext from "../../context/ProfileContext";

//this component is imported and used in the Admin Page
function AllUsers() {
  //bring users and the api url from my context
  const { users } = useContext(ProfileContext);
  const { uri } = useContext(AuthContext);
  const [sendTo, setSendTo] = useState(null);

  return (
    <>
      {/*mapping all the users*/}
      {users?.map((value) => {
        return (
          <div className="all-users" key={value?._id}>
            <div>
              {/*checking to know is the user has a profile image */}
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
      {/*this is the notification popUp that helps admin write and send notification*/}
      <Notify sendTo={sendTo} setSendTo={setSendTo} />
    </>
  );
}

export default AllUsers;
