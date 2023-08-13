import React, { useState } from "react";
import AllVideos from "../component/AllVideos";
import VideoCatigory from "../component/VideoCatigory";

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
