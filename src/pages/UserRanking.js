import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import {
  handleGetUser,
  handleGetUsers,
  handleGetVote,
} from "../redux/redux-slice/UsersSlice";

function UserRanking() {
  const { users, user, vote, loading } = useSelector(
    (state) => state.UsersSlice
  );
  const [newUsers, setNewUsers] = useState([]);
  const { uri } = useSelector((state) => state.AuthSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (!users?.length) {
      dispatch(handleGetUsers());
    }
  }, []);
  useEffect(() => {
    if (!vote?.length) {
      dispatch(handleGetVote());
    }
  }, []);
  useEffect(() => {
    if (!user) {
      dispatch(handleGetUser());
    }
  }, []);

  const handleFilter = (e) => {
    console.log(e.target.value);
    if (e.target.value === "All") {
      const i = users.filter((value) => value.contestant);
      setNewUsers(i);
      console.log(i);
    } else {
      const i = users?.filter(
        (v) =>
          v?.video?.catigory?.toLowerCase() === e.target.value.toLowerCase() &&
          v?.contestant
      );
      setNewUsers(i);
    }
  };

  //filter only the contestant
  useEffect(() => {
    const i = users.filter((value) => value.contestant);
    setNewUsers(i);
  }, [users]);

  return (
    <div>
      <div className="filter-rank">
        <div>
          <p>Rank by catigory</p>
          <select onChange={(e) => handleFilter(e)}>
            <option>All</option>
            <option>Dance</option>
            <option>Drama</option>
            <option>Music</option>
            <option>Comedy</option>
            <option>Poetry/Speach</option>
          </select>
        </div>
      </div>
      <div className="ranking-con">
        <h1
          style={{ alignSelf: "center", justifySelf: "center", color: "grey" }}>
          {loading && "Loading..."}
        </h1>
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
    </div>
  );
}

export default UserRanking;
