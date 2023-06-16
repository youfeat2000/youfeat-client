import React from "react";
import UserInfo from "./component/UserInfo";
import UserVideo from "./component/UserVideo";
import UserVideoStatistics from "./component/UserVideoStatistics";

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
