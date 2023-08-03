import React, { useState } from "react";
import AllVideos from "./AllVideos";
import VideoCatigory from "./VideoCatigory";

function Index() {
  const [users, setUsers] = useState();
  return (
    <div className="index">
      <VideoCatigory setUsers={setUsers} />
      <AllVideos users={users} videoUri={"video"} />
    </div>
  );
}

export default Index;
