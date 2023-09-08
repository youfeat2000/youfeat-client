import React from "react";
import { FaCamera } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/redux-slice/UsersSlice";

//this is the profile header component
function ProfileHeader({ foundUser }) {
  const { uri } = useSelector((state) => state.AuthSlice);
  const { user } = useSelector((state) => state.UsersSlice);
  const params = useParams();
  const dispatch = useDispatch();

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
        dispatch(setUser(data));
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
  );
}

export default ProfileHeader;
