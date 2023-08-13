import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import VideoUpload from "./VideoUpload";

//the section in the profile page that allows users uploads video
function UserVideo({ foundUser }) {
  const [userId, setUserId] = useState(null);
  const handleUpload = () => {
    setUserId(foundUser[0]?._id);
  };
  return (
    <div className="video-uploads">
      <span onClick={handleUpload}>
        <FaPlus className="add-image-icon" />
      </span>
      <p>Upload and publish a video to get started</p>
      {/*video uplaod popup */}
      <VideoUpload userId={userId} setUserId={setUserId} />
    </div>
  );
}

export default UserVideo;
