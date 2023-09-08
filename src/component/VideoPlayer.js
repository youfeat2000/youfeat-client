import React from "react";
import { useSelector } from "react-redux";

//this is the video popup section that allows user watch videos
function VideoPlayer({ videoName, setVideoName }) {
  const { uri } = useSelector((state) => state.AuthSlice);
  return (
    <div>
      {videoName && (
        <div className="video-player">
          <h1 onClick={() => setVideoName(null)}>&times;</h1>
          <div>
            <video autoPlay controls>
              <source src={`${uri}/video/${videoName}`} />
            </video>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;
