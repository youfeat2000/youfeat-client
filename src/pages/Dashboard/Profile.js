import React from "react";
import UserInfo from "./UserInfo";
import UserVideo from "./UserVideo";
import UserVideoStatistics from "./UserVideoStatistics";
import ProfileHeader from "./ProfileHeader";

function Profile() {
  return (
    <div className="profile">
      <ProfileHeader />
      <div className="user-info">
        <UserInfo />
        <UserVideo />
      </div>
      <UserVideoStatistics />
    </div>
  );
}

export default Profile;
