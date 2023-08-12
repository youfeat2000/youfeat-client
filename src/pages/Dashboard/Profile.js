import React, { useContext, useEffect, useState } from "react";
import UserInfo from "./UserInfo";
import UserVideo from "./UserVideo";
import UserVideoStatistics from "./UserVideoStatistics";
import ProfileHeader from "./ProfileHeader";
import ProfileContext from "../../context/ProfileContext";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function Profile() {
  const [foundUser, setFoundUser] = useState([]);
  const { users, user, setUsers } = useContext(ProfileContext);
  const { uri } = useContext(AuthContext);
  const params = useParams();

  useEffect(() => {
    const singleUser = users?.filter((value) => value?._id === params.id);
    setFoundUser(singleUser);
  }, [users]);

  useEffect(() => {
    fetch(`${uri}/users`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(user);

  return (
    <div className="profile">
      <ProfileHeader foundUser={foundUser} />
      <div className="user-info">
        <UserInfo foundUser={foundUser} />
        {user?._id === foundUser[0]?._id && user?.contestant && (
          <UserVideo foundUser={foundUser} />
        )}
      </div>
      <UserVideoStatistics foundUser={foundUser} />
    </div>
  );
}

export default Profile;
