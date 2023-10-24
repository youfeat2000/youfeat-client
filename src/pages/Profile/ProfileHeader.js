import React, { useContext, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import ProfileContext from "../../context/ProfileContext";
import Popup from "../../component/Popup";

//this is the profile header component
function ProfileHeader({ foundUser }) {
  const { uri } = useContext(AuthContext);
  const { user, setUser } = useContext(ProfileContext);
  const [message, setMessage] = useState(null)
  const params = useParams();

  //this functions uploads the usser profile image
  const handleUploadProfile = (e) => {
    const formData = new FormData();
    formData.append("profile", e.target.files[0]);
    fetch(`${uri}/profile/${foundUser[0]._id}`, {
      method: "POST",
      contentType: "jsonp",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setMessage("Profile image uploaded");
      })
      .catch((err) => {
        console.log(err);
        setMessage("error while uploading your image");
      });
  };

  return (
    <>
     <Popup message={message} setMessage={setMessage}/>
    <header className="profile-header">
       
      <div>
        {params.id === user?._id && (
          <span className="camera">
            <FaCamera />
            <input
              type="file"
              name="profile"
              accept="image/*"
              onChange={(e) => handleUploadProfile(e)}
            />
          </span>
        )}
        {foundUser[0]?.profileImage ? (
          <img src={`${uri}/image/${foundUser[0]?.profileImage}`} />
        ) : (
          <CgProfile className="profile-img" />
        )}
      </div>
    </header>
    </>
  );
}

export default ProfileHeader;
