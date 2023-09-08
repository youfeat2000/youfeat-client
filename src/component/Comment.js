import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setComments } from "../redux/redux-slice/UsersSlice";

function Comment({ user, commenterId, setUser }) {
  const [comment, setComment] = useState();
  const { uri } = useSelector((state) => state.AuthSlice);
  const { comments } = useSelector((state) => state.UsersSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleComment = (e) => {
    e.target.innerText = "Loading...";
    e.target.style.backgroundColor = "grey";

    const userId = user?._id;
    const body = {
      userId,
      comment,
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
      .then((data) => dispatch(setComments([...comments, data])))
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
              onChange={(e) => setComment(e.target.value)}
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
