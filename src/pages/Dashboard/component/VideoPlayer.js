import React from "react";

function VideoPlayer({ videoName, setVideoName }) {
  return (
    <div>
      {videoName && (
        <div className="video-player">
          <h1 onClick={() => setVideoName(null)}>&times;</h1>
          <video autoPlay controls>
            <source src={`http://localhost:3500/video/${videoName}`} />
          </video>
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;
