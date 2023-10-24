import React, { useEffect, useContext } from "react";
import ProfileContext from "../../context/ProfileContext";

//this section is after the navbar at the home page
//it allows users navigate through catigories
function VideoCatigory({ setUsers }) {
  const { users } = useContext(ProfileContext);

  useEffect(() => {
    if (users?.length) setUsers(users);
  }, []);

  const handleFilter = (filter) => {
    const newVideoList = users?.filter((value) => {
      return value?.catigory === filter && value?.video;
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
        <li onClick={() => handleFilter("Sport")}>Sport</li>
        <li onClick={() => handleFilter("Poetry/Speach")}>Poetry/Speach</li>
      </ul>
    </div>
  );
}

export default VideoCatigory;
