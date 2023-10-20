import React, { useContext, useEffect, useRef, useState } from "react";
import { BiEdit } from "react-icons/bi";
import UserBioUpdate from "./UserBioUpdate";
import { useParams } from "react-router-dom";
import SocialShare from "./SocialShare";
import AuthContext from "../../context/AuthContext";
import ProfileContext from "../../context/ProfileContext";
import {GiCheckMark} from 'react-icons/gi'

//this is the component that contains the user bio, user name and email in the profile page
function UserInfo({ foundUser }) {
  const userInfo = useRef();
  const [userId, setUserId] = useState(null);
  const [userUrl, setUserUrl] = useState(null);
  const { uri } = useContext(AuthContext);
  const { user, setVote, vote } = useContext(ProfileContext);
  const [yourVote, setYourVote] = useState([])
  const params = useParams();


  useEffect(()=>{
    const userVotes = vote.filter((i)=> i?.userId === foundUser[0]?._id)
    const corentUserVote = userVotes.filter(i=> i?.voterId === user?._id)
    setYourVote(corentUserVote)
  }, [vote, foundUser])

  const handleVote = (e, value) => {
    e.target.innerText = "Loading...";

    fetch(`${uri}/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        voterId: user?._id,
        userName: value[0]?.userName,
        userId: value[0]?._id,
        videoTitle: value[0]?.video.title,
        videoName: value[0]?.video.filename,
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
  };

  //this useEffect checks if the user is a contestant to determine the length of this section
  useEffect(() => {
    if (window.innerWidth >= 850) {
      user?._id === foundUser[0]?._id && user?.contestant
        ? (userInfo.current.style.width = "48%")
        : (userInfo.current.style.width = "100%");
    }
  }, [foundUser]);

  //this function helps users copy the url of the profile
  const copyUri = (e) => {
    e.preventDefault();
    const i = e.target.getAttribute("href");
    setUserUrl(i);
  };
  return (
    <>
      <UserBioUpdate userId={userId} setUserId={setUserId} />
      <div className="profile-info" ref={userInfo}>
        <article style={{position: 'relative'}}>
        {foundUser[0]?._id === user?._id &&<BiEdit
        className="edit-profile"
          onClick={() => setUserId(foundUser[0]?._id)}
        />}
          <p style={{ fontSize: "25px", marginTop: "10px" }}>
            {foundUser[0]?.fullName}
          </p>
          {foundUser[0]?.state &&
          <p>
            <b>State:</b> {foundUser[0]?.state}
            </p>
          }
          {foundUser[0]?.dob &&
          <p>
            <b>Date of Birth:</b> {foundUser[0]?.dob.slice(0,10)}
            </p>
          }{foundUser[0]?.highschool &&
              <p>
                <b>High School:</b> {foundUser[0]?.highschool}
                </p>
              }
          <br />
          {foundUser[0]?.bio &&
              <p>
                 {foundUser[0]?.bio}
              </p>
          }
          <br />
        </article>
        <div>
          {foundUser[0]?.contestant && (
            !yourVote?.length ?
              <button onClick={(e) => handleVote(e, foundUser)}> Vote </button>
              :
              <button> <GiCheckMark size={18}/></button>
          )}
          <button
            href={`https://youfeat.onrender.com/profile/${params.id}`}
            onClick={(e) => copyUri(e)}>
            Share
          </button>
        </div>
      </div>
      <SocialShare userUrl={userUrl} setUserUrl={setUserUrl} />
    </>
  );
}

export default UserInfo;
