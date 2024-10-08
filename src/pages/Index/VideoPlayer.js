import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import {BiArrowBack} from 'react-icons/bi'

//this is the video popup section that allows user watch videos
function VideoPlayer({ videoName, setVideoName }) {
  const { uri } = useContext(AuthContext);
  return (
    <div>
      {videoName && (
        <div className="video-player">
          <p onClick={() => setVideoName(null)}><BiArrowBack/></p>
          <div>
            <video autoPlay controls>
              <source src={`${uri}/video/${videoName}`}  />
            </video>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;
