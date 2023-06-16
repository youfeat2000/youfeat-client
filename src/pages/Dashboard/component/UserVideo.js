import React, { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa";
import ProfileContext from "../../../context/ProfileContext";
import VideoUpload from "./VideoUpload";

function UserVideo() {
  const [userId, setUserId] = useState(null);
  const { user } = useContext(ProfileContext);
  const handleUpload = () => {
    setUserId(user?._id);
  };
  return (
    <div className="video-uploads">
      <span onClick={handleUpload}>
        <FaPlus className="add-image-icon" />
      </span>
      <p>Upload and publish a video to get started</p>
      <VideoUpload userId={userId} setUserId={setUserId} />
    </div>
  );
}

export default UserVideo;
