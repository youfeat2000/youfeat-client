import React, { useState } from "react";
import { useSelector } from "react-redux";

//this is the popup that allows users edit their bio
function UserBioUpdate({ userId, setUserId }) {
  const { uri } = useSelector((state) => state.AuthSlice);
  const { setUser } = useSelector((state) => state.UsersSlice);
  const [bio, setBio] = useState();
  const handleSubmit = (e) => {
    e.target.style.backgroundColor = "gray";
    e.target.innerText = "Loading...";
    e.target.disabled = true;

    fetch(`${uri}/bio/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bio }),
    })
      .then((res) => res.json())
      .then((data) => setUser({ ...data, bio }))
      .catch((err) => console.log(err))
      .finally(() => {
        e.target.style.backgroundColor = "#374254";
        e.target.innerText = "Update";
        e.target.disabled = false;
        setUserId(null);
      });
  };
  return (
    <>
      {userId && (
        <div className="edit-bio">
          <div>
            <h2 onClick={() => setUserId(null)}>&times;</h2>
            <h1>Write a bio</h1>
            <textarea
              placeholder="Bio"
              onChange={(e) => setBio(e.target.value)}
            />
            <button onClick={(e) => handleSubmit(e)}>Update</button>
          </div>
        </div>
      )}
    </>
  );
}

export default UserBioUpdate;
