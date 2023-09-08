import React, { useEffect, useRef, useState } from "react";
import { CgPen } from "react-icons/cg";
import UserBioUpdate from "./UserBioUpdate";
import { useParams } from "react-router-dom";
import SocialShare from "./SocialShare";
import { useDispatch, useSelector } from "react-redux";
import { setVotes } from "../redux/redux-slice/UsersSlice";

//this is the component that contains the user bio, user name and email in the profile page
function UserInfo({ foundUser }) {
  const userInfo = useRef();
  const [userId, setUserId] = useState(null);
  const [userUrl, setUserUrl] = useState(null);
  const { uri } = useSelector((state) => state.AuthSlice);
  const { user } = useSelector((state) => state.UsersSlice);
  const params = useParams();
  const dispatch = useDispatch();

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
        dispatch(setVotes((i) => [...i, data]));
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
        <article>
          <br />
          <p style={{ fontSize: "25px", marginTop: "10px" }}>
            {foundUser[0]?.fullName}
          </p>
          <p style={{ marginTop: "5px" }}>{foundUser[0]?.email}</p>
          <p>
            State<b>:</b> {foundUser[0]?.state}
          </p>
          <br />
          <p>
            {/*checking if the user has a bio */}
            {foundUser[0]?.bio ? (
              <>
                {foundUser[0]?.bio?.length >= 100
                  ? foundUser[0]?.bio.slice(0, 300) + "..."
                  : foundUser[0]?.bio}
                {user?._id === foundUser[0]?._id && (
                  <CgPen
                    style={{
                      float: "right",
                      fontSize: "30px",
                      cursor: "pointer",
                    }}
                    onClick={() => setUserId(foundUser[0]?._id)}
                  />
                )}
              </>
            ) : (
              <span onClick={() => setUserId(foundUser[0]?._id)}>
                {user?._id === foundUser[0]?._id && "Add bio"}
              </span>
            )}
          </p>
          <br />
        </article>
        <div>
          {foundUser[0]?.contestant && (
            <button onClick={(e) => handleVote(e, foundUser)}>Vote</button>
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
