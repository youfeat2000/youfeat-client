import React, { useState } from 'react'
import youfeatLogo from "../../public/youfeatlogo.png"
import { CgPlayButtonO } from 'react-icons/cg'
import YoufeatVideoPlayer from './YoufeatVideoPlayer'
import vid1 from "../../public/video1.mp4"
import "./index.css"
function YoufeatVideo() {
  const [videoName, setVideoName] = useState(null)

  const videos = [
    {
      video: vid1,
      title: "Getting Ready For The Season",
      id: 1
    }
  ]

  return (
    <div className='youfeat-video'>
      <YoufeatVideoPlayer videoName={videoName} setVideoName={setVideoName} />
      {videos?.map((value) => {
            return (
              <div key={value?.id} className="video-box">
                  <div className="youfeat-video-con" onClick={()=>setVideoName(value.video)}>
                    <CgPlayButtonO className='play-icon'/>
                      <video autoPlay muted >
                        <source src={value.video} />
                      </video>
                  </div>
                  <span>
                    <div>
                      <img src={youfeatLogo} alt="youfeat logo"/>
                    </div>
                    <p>Youfeat</p>
                  </span>
                      <p><b>{value?.title}</b></p>
              </div>
            )
        })
      }
    </div>
  )
}


export default YoufeatVideo