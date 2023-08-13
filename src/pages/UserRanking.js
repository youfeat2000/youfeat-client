import React, { useContext, useEffect, useState } from "react";
import ProfileContext from "../context/ProfileContext";
import AuthContext from "../context/AuthContext";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

function UserRanking() {
  const { users, vote } = useContext(ProfileContext);
  const [newUsers, setNewUsers] = useState([]);
  const { uri } = useContext(AuthContext);
  const navigate = useNavigate();

  //sorting users according to their votes
  newUsers?.sort((a, b) => {
    let x = vote?.filter((v) => v?.userId === a?._id);
    let y = vote?.filter((v) => v?.userId === b?._id);
    if (x?.length > y?.length) {
      return -1;
    } else {
      return 1;
    }
  });

  //filter only the contestant
  useEffect(() => {
    const i = users.filter((value) => value.contestant);
    setNewUsers(i);
  }, [users]);

  return (
    <div className="ranking-con">
      {newUsers.map((value, index) => {
        const userVote = vote?.filter((v) => v?.userId === value?._id);
        return (
          <div
            key={value?._id}
            className="ranking"
            onClick={(e) => navigate(`../profile/${value?._id}`)}>
            <div>
              {value?.profileImage ? (
                <img
                  src={`${uri}/image/${value?.profileImage}`}
                  alt="profile"
                />
              ) : (
                <CgProfile size={"60px"} />
              )}
              <span>
                <h3>{value?.fullName}</h3>
                <p>{value?.email}</p>
                {index === 0 && (
                  <p>
                    <AiFillStar color="goldenrod" />
                    <AiFillStar color="goldenrod" />
                    <AiFillStar color="goldenrod" />
                  </p>
                )}
                {index === 1 && (
                  <p>
                    <AiFillStar color="goldenrod" />
                    <AiFillStar color="goldenrod" />
                    <AiFillStar color="grey" />
                  </p>
                )}
                {index === 2 && (
                  <p>
                    <AiFillStar color="goldenrod" />
                    <AiFillStar color="grey" />
                    <AiFillStar color="grey" />
                  </p>
                )}
              </span>
            </div>
            <p style={{ fontWeight: "bolder" }}>{userVote?.length} vote</p>
          </div>
        );
      })}
    </div>
  );
}

export default UserRanking;
