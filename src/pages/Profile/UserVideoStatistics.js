import React, { useContext } from "react";
import ProfileVideo from "./ProfileVideo";
import { useParams } from "react-router-dom";
import ProfileContext from "../../context/ProfileContext";

//this section checks if the user has a video and display it
function UserVideoStatistics({ foundUser }) {
  const { user } = useContext(ProfileContext);
  const params = useParams();
  return (
    <>
      <div className="user-video-stats">
        {foundUser[0]?.video ? (
          <ProfileVideo foundUser={foundUser} />
        ) : (
          <span>
            {user?._id && params ? (
              <>
                <h2 style={{ marginRight: "10px" }}>
                  You do not have a any video yet
                </h2>
                <p style={{ marginLeft: "10px" }}>
                  Upload a video to get started
                </p>
              </>
            ) : (
              <h3>No video to display</h3>
            )}
          </span>
        )}
      </div>
    </>
  );
}

export default UserVideoStatistics;
