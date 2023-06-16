import React, { useContext } from "react";
import ProfileContext from "../../../context/ProfileContext";
import ProfileVideo from "./ProfileVideo";

function UserVideoStatistics() {
  const { user } = useContext(ProfileContext);

  return (
    <>
      <div className="user-video-stats">
        {user?.video ? (
          <ProfileVideo user={user} />
        ) : (
          <>
            <h2>you do not have a any video yet</h2>
            <p>Publish a video and stand a chance to win</p>
          </>
        )}
      </div>
    </>
  );
}

export default UserVideoStatistics;
