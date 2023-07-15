import React, { useContext, useState } from "react";
import { CgPen, CgProfile } from "react-icons/cg";
import ProfileContext from "../../context/ProfileContext";
import { FaCamera } from "react-icons/fa";
import UserBioUpdate from "./UserBioUpdate";
import AuthContext from "../../context/AuthContext";

function UserInfo() {
  const [userId, setUserId] = useState(null);
  const { user, setUser } = useContext(ProfileContext);
  const { uri } = useContext(AuthContext);

  const handleUploadProfile = (e) => {
    const formData = new FormData();
    formData.append("profile", e.target.files[0]);
    fetch(`${uri}/profile/${user._id}`, {
      method: "POST",
      contentType: "jsonp",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        console.log(data);
        alert("profile updated");
      })
      .catch((err) => {
        console.log(err);
        alert("error");
      });
  };
  return (
    <>
      <UserBioUpdate userId={userId} setUserId={setUserId} />
      <div className="profile-head">
        <i>
          <picture className="camera">
            <FaCamera />
            <input
              type="file"
              name="profile"
              onChange={(e) => handleUploadProfile(e)}
            />
          </picture>
          {user?.profileImage ? (
            <img src={`${uri}/image/${user?.profileImage}`} />
          ) : (
            <CgProfile className="profile-img" />
          )}
        </i>
        <article>
          <p style={{ fontSize: "20px", marginTop: "10px" }}>
            {user?.fullName}
          </p>
          <p>{user?.email?.slice(0, 20)}...</p>
          <br />
          <p>
            {user?.bio ? (
              <div>
                {user.bio.length >= 100
                  ? user?.bio.slice(0, 100) + "..."
                  : user.bio}
                <CgPen
                  style={{
                    float: "right",
                    fontSize: "30px",
                    cursor: "pointer",
                  }}
                  onClick={() => setUserId(user?._id)}
                />
              </div>
            ) : (
              <span onClick={() => setUserId(user?._id)}>Add bio</span>
            )}
          </p>
        </article>
      </div>
    </>
  );
}

export default UserInfo;
