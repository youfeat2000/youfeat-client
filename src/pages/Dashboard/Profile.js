import React from "react";
import UserInfo from "./UserInfo";
import UserVideo from "./UserVideo";
import UserVideoStatistics from "./UserVideoStatistics";

function Profile() {
  return (
    <div className="profile">
      <div className="user-info">
        <UserInfo />
        <UserVideo />
      </div>
      <UserVideoStatistics />
    </div>
  );
}

export default Profile;
