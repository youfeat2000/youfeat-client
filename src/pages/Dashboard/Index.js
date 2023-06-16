import React, { useState } from "react";
import SearchBar from "./component/SearchBar";
import AllVideos from "./component/AllVideos";
import VideoCatigory from "./component/VideoCatigory";

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
