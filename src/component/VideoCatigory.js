import React, { useEffect } from "react";
import { useSelector } from "react-redux";

//this section is after the navbar at the home page
//it allows users navigate through catigories
function VideoCatigory({ setUsers }) {
  const { users } = useSelector((state) => state.UsersSlice);

  useEffect(() => {
    if (users?.length) setUsers(users);
  }, []);

  const handleFilter = (filter) => {
    const newVideoList = users?.filter((value) => {
      return value?.video?.catigory === filter && value?.video;
    });
    setUsers(newVideoList);
  };

  return (
    <div className="catigory">
      <ul>
        <li onClick={() => setUsers(users)}>All</li>
        <li onClick={() => handleFilter("Dance")}>Dance</li>
        <li onClick={() => handleFilter("Music")}>Music</li>
        <li onClick={() => handleFilter("Commedy")}>Comedy</li>
        <li onClick={() => handleFilter("Short drama")}>Drama</li>
        <li onClick={() => handleFilter("Poetry/Speach")}>Poetry/Speach</li>
      </ul>
    </div>
  );
}

export default VideoCatigory;
