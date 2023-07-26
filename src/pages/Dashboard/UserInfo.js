import React, { useContext, useState } from "react";
import { CgPen } from "react-icons/cg";
import ProfileContext from "../../context/ProfileContext";
import UserBioUpdate from "./UserBioUpdate";

function UserInfo() {
  const [userId, setUserId] = useState(null);
  const { user } = useContext(ProfileContext);

  return (
    <>
      <UserBioUpdate userId={userId} setUserId={setUserId} />
      <div className="profile-info">
        <article>
          <br />
          <p style={{ fontSize: "25px", marginTop: "10px" }}>
            {user?.fullName}
          </p>
          <p style={{ marginTop: "5px" }}>{user?.email}</p>
          <br />
          <p>
            {user?.bio ? (
              <div>
                {user.bio.length >= 100
                  ? user?.bio.slice(0, 300) + "..."
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
          <br />
        </article>
      </div>
    </>
  );
}

export default UserInfo;
