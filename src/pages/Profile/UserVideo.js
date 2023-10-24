import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Popup from "../../component/Popup";
import UserVerificationPopup from "../../component/UserVerificationPopup";
import VideoUpload from "./VideoUpload";

//the section in the profile page that allows users uploads video
function UserVideo({ foundUser }) {
  const [message, setMessage] = useState(null)
  const [userId, setUserId] = useState(null);
  const [pop, setPop] = useState(false)
  const handleUpload = () => {
    setMessage('Vedeo uploads is not yet open')
    /*if(foundUser[0]?.verified){
      setUserId(foundUser[0]?._id);
    }else{
      setPop(true)
    }*/
  };
  return (
    <>
    <Popup message={message} setMessage={setMessage}/>
      <UserVerificationPopup pop={pop} setPop={setPop} navigate={'../../confirmemailcode'}/>
    <div className="video-uploads">
      <span onClick={handleUpload}>
        <FaPlus className="add-image-icon" />
      </span>
      <p>Upload and publish a video to get started</p>
      {/*video uplaod popup */}
      <VideoUpload userId={userId} setUserId={setUserId} />
    </div>
    </>
  );
}

export default UserVideo;
