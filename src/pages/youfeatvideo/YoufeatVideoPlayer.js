import React from "react";
import {BiArrowBack} from 'react-icons/bi'

//this is the video popup section that allows user watch videos
function YoufeatVideoPlayer({ videoName, setVideoName }) {
const handlePlay =(e)=>{
  e.target.play()
}
  return (
    <div>
      {videoName && (
        <div className="video-player">
          <p onClick={() => setVideoName(null)}><BiArrowBack/></p>
          <div>
            <video  onCanPlay={(e)=>handlePlay(e)} loop controls >
              <source src={videoName} type="video/mp4"/>
              </video>
          </div>
        </div>
      )}
    </div>
  );
}

export default YoufeatVideoPlayer;
