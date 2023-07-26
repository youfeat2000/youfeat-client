import React, { useContext } from "react";
import { FaCamera } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import AuthContext from "../../context/AuthContext";
import ProfileContext from "../../context/ProfileContext";

function ProfileHeader() {
  const { uri } = useContext(AuthContext);
  const { setUser, user } = useContext(ProfileContext);

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
    <header className="profile-header">
      <div>
        <span className="camera">
          <FaCamera />
          <input
            type="file"
            name="profile"
            onChange={(e) => handleUploadProfile(e)}
          />
        </span>
        {user?.profileImage ? (
          <img src={`${uri}/image/${user?.profileImage}`} />
        ) : (
          <CgProfile className="profile-img" />
        )}
      </div>
    </header>
  );
}

export default ProfileHeader;
