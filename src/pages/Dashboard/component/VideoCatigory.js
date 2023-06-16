import React, { useContext, useEffect } from "react";
import ProfileContext from "../../../context/ProfileContext";

function VideoCatigory({ setUsers }) {
  const { users } = useContext(ProfileContext);

  useEffect(() => {
    setUsers(users);
  }, [users]);
  const handleFilter = (filter) => {
    const newVideoList = users?.filter((value) => {
      return value?.video?.catigory === filter;
    });
    setUsers(newVideoList);
    console.log(newVideoList);
  };

  return (
    <div className="catigory">
      <ul>
        <li onClick={() => setUsers(users)}>All</li>
        <li onClick={() => handleFilter("Dance")}>Dance</li>
        <li onClick={() => handleFilter("Music")}>Music</li>
        <li onClick={() => handleFilter("Commedy")}>Commedy</li>
        <li onClick={() => handleFilter("Short drama")}>Drama</li>
        <li onClick={() => handleFilter("Poetry/Speach")}>Poetry/Speach</li>
      </ul>
    </div>
  );
}

export default VideoCatigory;
