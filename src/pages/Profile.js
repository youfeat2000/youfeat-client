import React, { useEffect, useState } from "react";
import UserInfo from "../component/UserInfo";
import UserVideo from "../component/UserVideo";
import UserVideoStatistics from "../component/UserVideoStatistics";
import ProfileHeader from "../component/ProfileHeader";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AllComment from "../component/AllComment";
import {
  handleGetUser,
  handleGetUsers,
  handleGetVote,
  handleGetComments,
} from "../redux/redux-slice/UsersSlice";

function Profile() {
  const [foundUser, setFoundUser] = useState([]);
  const { users, user, vote, comments } = useSelector(
    (state) => state.UsersSlice
  );
  const params = useParams();
  const dispatch = useDispatch();
  //filter the user from users
  useEffect(() => {
    const singleUser = users?.filter((value) => value?._id === params.id);
    setFoundUser(singleUser);
  }, [users]);

  //get all users
  useEffect(() => {
    if (!users?.length) {
      dispatch(handleGetUsers());
    }
  }, []);
  useEffect(() => {
    if (!comments?.length) {
      dispatch(handleGetComments());
    }
  }, []);
  useEffect(() => {
    if (!user) {
      dispatch(handleGetUser());
    }
  }, []);
  useEffect(() => {
    if (!vote?.length) {
      dispatch(handleGetVote());
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
