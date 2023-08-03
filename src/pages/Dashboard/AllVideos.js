import React, { useState, useContext, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import AuthContext from "../../context/AuthContext";
import ProfileContext from "../../context/ProfileContext";
import { useNavigate, useParams } from "react-router-dom";

function AllVideos({ users }) {
  const [newUser, setNewUser] = useState(null);
  const { uri, auth } = useContext(AuthContext);
  const { user, setVote, vote } = useContext(ProfileContext);
  const [videoName, setVideoName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const i = users?.filter((value) => {
      return value?.video;
    });
    setNewUser(i);
  }, [users]);

  const handleVote = (e, value) => {
    if (auth) {
      e.target.innerText = "Loading...";

      fetch(`${uri}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          voterId: user?._id,
          userName: value?.userName,
          userId: value?._id,
          videoTitle: value?.video.title,
          videoName: value?.video.filename,
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
          e.target.innerText = "Vote";
          e.target.style.backroundColor = "#fafafa";
        });
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="all-video">
      <VideoPlayer videoName={videoName} setVideoName={setVideoName} />
      {newUser?.map((value) => {
        const videoVote = vote.filter((i) => i.userId === value?._id);
        return (
          <div key={value?._id} className="video">
            <div className="video-con">
              <video onClick={() => setVideoName(value?.video?.filename)}>
                <source src={`${uri}/video/${value?.video?.filename}`} />
              </video>
            </div>
            <span onClick={() => navigate(`profile/${value?._id}`)}>
              <img src={`${uri}/image/${value?.profileImage}`} alt="profile" />
              <div>
                <h2>{value?.fullName}</h2>
                <p style={{ fontSize: "smaller", color: "#0e1424" }}>
                  {value?.email}
                </p>
              </div>
            </span>
            <div>
              <p>
                {`${value?.video?.title} | ${value?.video?.description.slice(
                  0,
                  50
                )}`}
                {value?.video.description.length >= 50 && "..."}
              </p>
              <p style={{ alignSelf: "flex-end" }}>
                <b>{videoVote.length}V</b>
              </p>
            </div>
            <button onClick={(e) => handleVote(e, value)}>Vote</button>
          </div>
        );
      })}
    </div>
  );
}

export default AllVideos;
