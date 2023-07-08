import React, { useState } from "react";
import SearchBar from "./SearchBar";
import AllVideos from "./AllVideos";
import VideoCatigory from "./VideoCatigory";

function Index() {
  const [users, setUsers] = useState();
  return (
    <div className="index">
      <SearchBar />
      <VideoCatigory setUsers={setUsers} />
      <AllVideos users={users} />
    </div>
  );
}

export default Index;
