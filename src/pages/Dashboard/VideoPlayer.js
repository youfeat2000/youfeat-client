import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";

function VideoPlayer({ videoName, setVideoName }) {
  const { uri } = useContext(AuthContext);
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
