import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileContext from "../../context/ProfileContext";
import AuthContext from "../../context/AuthContext";

function Comment({ user, commenterId, setUser }) {
  const [comments, setComments] = useState();
  const { uri } = useContext(AuthContext);
  const { comment, setComment } = useContext(ProfileContext);
  const navigate = useNavigate();

  const handleComment = (e) => {
    e.target.innerText = "Loading...";
    e.target.style.backgroundColor = "grey";

    const userId = user?._id;
    const body = {
      userId,
      comment: comments,
      commenterId,
    };
    console.log(body);
    fetch(`${uri}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => setComment([...comment, data]))
      .catch((err) => console.log(err))
      .finally(() => {
        setUser(null);
        e.target.innerText = "Send";
        e.target.style.backgroundColor = "#0e1424";
      });
  };
  return (
    <>
      {user && commenterId && (
        <div className="edit-bio">
          <div>
            <h2 onClick={() => setUser(null)}>&times;</h2>
            <h4>leave a comment for {user?.fullName}</h4>
            <textarea
              placeholder="Comment..."
              onChange={(e) => setComments(e.target.value)}
            />
            <button onClick={(e) => handleComment(e)}>Send</button>
            <button onClick={() => navigate(`/profile/${user._id}/#comment`)}>
              See all comment
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Comment;
