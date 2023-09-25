import React, { useContext, useState } from "react";
import ProfileContext from "../../context/ProfileContext";
import AuthContext from "../../context/AuthContext";

//this is the popup that allows users edit their bio
function UserBioUpdate({ userId, setUserId }) {
  const { uri } = useContext(AuthContext);
  const { setUser } = useContext(ProfileContext);
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
