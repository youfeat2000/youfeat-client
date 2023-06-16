import React, { useState, useContext, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import AuthContext from "../../../context/AuthContext";
import ProfileContext from "../../../context/ProfileContext";

function AllVideos({ users }) {
  const [newUser, setNewUser] = useState(null);
  const { uri } = useContext(AuthContext);
  const { user, setVote, vote } = useContext(ProfileContext);
  const [videoName, setVideoName] = useState(null);

  useEffect(() => {
    const i = users?.filter((value) => {
      return value?.video;
    });
    setNewUser(i);
  }, [users]);

  const handleVote = (e, value) => {
    e.target.style.backgroundColor = "grey";
    e.target.innerText = "Loading...";

    fetch(`${uri}/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        voterId: user._id,
        userName: value.userName,
        userId: value._id,
        videoTitle: value.video.title,
        videoName: value.video.filename,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setVote((i) => [...i, data]);
        alert("your vote has been sent");
      })
      .catch((err) => {
        console.log(err);
        alert("something went wrong");
      })
      .finally(() => {
        e.target.style.backgroundColor = "#374254";
        e.target.innerText = "Vote";
      });
  };

  return (
    <div className="all-video">
      <VideoPlayer videoName={videoName} setVideoName={setVideoName} />
      {newUser?.map((value) => {
        const videoVote = vote.filter((i) => i.userId === value._id);
        return (
          <div key={value?._id} className="video">
            <div className="video-con">
              <video onClick={() => setVideoName(value?.video?.filename)}>
                <source src={`${uri}/video/${value?.video?.filename}`} />
              </video>
            </div>
            <span>
              <img
                src={`http://localhost:3500/image/${value?.profileImage}`}
                alt="profile"
              />
              <p>{value?.fullName}</p>
            </span>
            <div>
              <h3>{value?.video?.title}</h3>
              <p>{value?.video?.catigory}</p>
              <h3 style={{ alignSelf: "flex-end" }}>{videoVote.length}V</h3>
              <br />
            </div>
            <button onClick={(e) => handleVote(e, value)}>Vote</button>
            <br />
          </div>
        );
      })}
    </div>
  );
}

export default AllVideos;
