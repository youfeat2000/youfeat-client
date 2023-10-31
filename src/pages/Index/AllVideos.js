import React, { useState, useEffect, useContext } from "react";
import { CgProfile } from "react-icons/cg";
import VideoPlayer from "./VideoPlayer";
import { useNavigate } from "react-router-dom";
import { FaCommentDots } from "react-icons/fa";
import {GiCheckMark} from 'react-icons/gi'
import Comment from "./Comment";
import AuthContext from "../../context/AuthContext";
import ProfileContext from "../../context/ProfileContext";
import UserVerificationPopup from "../../component/UserVerificationPopup";
import Popup from "../../component/Popup";
import img1 from '../../public/img1.jpg'
import img2 from '../../public/img2.jpg'


//this page contains the list of all the video and is used in the Index page
function AllVideos({ users }) {
  const [newUser, setNewUser] = useState(null);
  const { uri, auth } = useContext(AuthContext);
  const { user, vote, search, comment, setVote } = useContext(ProfileContext);
  const [videoName, setVideoName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [commenterId, setCommenterId] = useState(null);
  const [message, setMessage] = useState(null)
  const [pop, setPop] = useState(false)
  const navigate = useNavigate();

  const image = [{img: img1, id: 1}, {img: img2, id:2}]
  //this use effect filter all the users that has their video upladed
  useEffect(() => {
    const i = users?.filter((value) => {
      return value?.video;
    });
    setNewUser(i);
  }, [users]);

  //this useEffect update the state whenever a user search for anything
  useEffect(() => {
    setNewUser(search);
  }, [search]);

  //voting function
  const handleVote = (e, value) => {
    //checking if the user is logedin
    if(user?.verified){
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
          setVote([...vote, data]);
          setMessage("your vote has been sent");
        })
        .catch((err) => {
          console.log(err);
          setMessage("something went wrong");
        })
        .finally(() => {
          e.target.innerText = "Vote";
          e.target.style.backroundColor = "#fafafa";
        });
    } else {
      navigate("/login");
    }
  }else{
    setPop(true)
  }
  };

  const handleComment = (id) => {
    if (auth) {
      setCommenterId(user?._id);
      setUserId(id);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Comment commenterId={commenterId} user={userId} setUser={setUserId} />
      {/*checking if videos */}
      {search?.length ? (
        <div className="all-video">
        <Popup message={message} setMessage={setMessage}/>
          <UserVerificationPopup pop={pop} navigate={'/resetpassword'} setPop={setPop}/>
          {/*video popUp */}
          <VideoPlayer videoName={videoName} setVideoName={setVideoName} />
          {/*mapping through all the video */}
          {newUser?.map((value) => {
              /*filtering the videos vote for the video */
            const videoVote = vote?.filter((i) => i?.userId === value?._id);
            const yourVote = videoVote?.filter((i) => i?.voterId === user?._id)
            const comments = comment?.filter((i) => i?.userId === value?._id);
            
            return (
              <div key={value?._id} className="video">
                <div className="video-con">
                  <video onClick={() => setVideoName(value?.video?.filename)}>
                    <source src={`${uri}/video/${value?.video?.filename}`} />
                  </video>
                </div>
                <span onClick={() => navigate(`profile/${value?._id}`)}>
                  {/*checking if the user has a profile image */}
                  {value.profileImage ? (
                    <img
                      src={`${uri}/image/${value?.profileImage}`}
                      alt="youfeat contestant profile"
                    />
                  ) : (
                    <CgProfile size={"50px"} color="#0e1424" />
                  )}
                  <div>
                    <h2>{value?.fullName}</h2>
                  </div>
                </span>
                <div>
                  {/*checking and slicing the length of the description*/}
                  <p>
                    {`${
                      value?.video?.title
                    } | ${value?.video?.description.slice(0, 50)}`}
                    {value?.video?.description.length >= 50 && "..."}
                  </p>
                  <p style={{ alignSelf: "flex-end" }}>
                    <b>{videoVote?.length}V</b>
                  </p>
                </div>
                {!yourVote?.length ?
                <button onClick={(e) => handleVote(e, value)}> Vote </button>
                :
                <button> <GiCheckMark size={18}/></button>
              }
                <i className="comment-icon">
                  <small>{comments?.length}</small>
                  <FaCommentDots onClick={() => handleComment(value)} />
                </i>
              </div>
            );
          })}
        </div>
      ) : (
          <div className="all-video">
            {image?.map((value) => {
              return (
                <div key={value?.id} className="image">
                  <div className="img-con">
                    <img src={value.img} alt='youfeat image'/>
                  </div>
                </div>
              );
            })}
          </div>
      )}
    </>
  );
}

export default AllVideos;
