import React, { useContext, useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import ProfileContext from "../../context/ProfileContext";
import AuthContext from "../../context/AuthContext";
import "./index.css"

function UserRanking() {
  const { users, user, vote, loading, setUsers, setVote, setUser } =
    useContext(ProfileContext);
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

  useEffect(() => {
    if (!users?.length) {
      fetch(`${uri}/users`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  useEffect(() => {
    if (!vote?.length) {
      fetch(`${uri}/allvote`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => setVote(data))
        .catch((err) => console.log(err));
    }
  }, []);
  useEffect(() => {
    if (!user) {
      fetch(`${uri}/user`, {
        method: "POST",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        })
        .catch((err) => console.log(err));
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
          v?.catigory?.toLowerCase() === e.target.value.toLowerCase() &&
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
          <p>Rank by category</p>
          <select onChange={(e) => handleFilter(e)}>
            <option>All</option>
            <option>Dance</option>
            <option>Sport</option>
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
                    alt="youfeat contestant"
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
