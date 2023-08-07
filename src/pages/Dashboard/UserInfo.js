import React, { useContext, useEffect, useRef, useState } from "react";
import { CgPen } from "react-icons/cg";
import ProfileContext from "../../context/ProfileContext";
import UserBioUpdate from "./UserBioUpdate";
import AuthContext from "../../context/AuthContext";
import { useParams } from "react-router-dom";

function UserInfo({ foundUser }) {
  const userInfo = useRef();
  const [userId, setUserId] = useState(null);
  const { uri } = useContext(AuthContext);
  const { user, setVote } = useContext(ProfileContext);
  const params = useParams();

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

  useEffect(() => {
    if (window.innerWidth >= 850) {
      user?._id === foundUser[0]?._id && user?.contestant
        ? (userInfo.current.style.width = "48%")
        : (userInfo.current.style.width = "100%");
    }
  }, [foundUser]);

  const copyUri = (e) => {
    e.preventDefault();
    navigator.clipboard
      .writeText(e.target.getAttribute("href"))
      .then(() => (e.target.innerText = "Copied"))
      .catch(() => alert("error"));
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
          <br />
          <p>
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
            href={`https://youfeat.onrender.com/dashboard/profile/${params.id}`}
            onClick={(e) => copyUri(e)}>
            Share link
          </button>
        </div>
      </div>
    </>
  );
}

export default UserInfo;
