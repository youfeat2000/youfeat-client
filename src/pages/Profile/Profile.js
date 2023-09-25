import React, { useEffect, useState, useContext } from "react";
import UserInfo from "./UserInfo";
import UserVideo from "./UserVideo";
import UserVideoStatistics from "./UserVideoStatistics";
import ProfileHeader from "./ProfileHeader";
import { useParams } from "react-router-dom";
import AllComment from "./AllComment";
import AuthContext from "../../context/AuthContext";
import ProfileContext from "../../context/ProfileContext";

function Profile() {
  const [foundUser, setFoundUser] = useState([]);
  const {
    users,
    user,
    vote,
    comments,
    setComment,
    setVote,
    setUsers,
    setUser,
  } = useContext(ProfileContext);
  const { uri } = useContext(AuthContext);
  const params = useParams();
  //filter the user from users
  useEffect(() => {
    const singleUser = users?.filter((value) => value?._id === params.id);
    setFoundUser(singleUser);
  }, [users]);

  //get all users
  useEffect(() => {
    if (!users?.length) {
      fetch(`${uri}/users`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  useEffect(() => {
    if (!comments?.length) {
      fetch(`${uri}/allcomment`, {
        method: "POST",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setComment(data))
        .catch((err) => console.log(err));
    }
  }, []);
  useEffect(() => {
    if (!user) {
      fetch(`${uri}/user`, {
        method: "POST",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  useEffect(() => {
    if (!vote?.length) {
      fetch(`${uri}/allvote`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => setVote(data))
        .catch((err) => console.log(err));
    }
  }, []);

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
      <AllComment />
    </div>
  );
}

export default Profile;
