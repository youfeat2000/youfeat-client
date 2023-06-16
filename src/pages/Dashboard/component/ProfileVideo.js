import React, { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import ProfileContext from "../../../context/ProfileContext";

function ProfileVideo({ user }) {
  const { uri } = useContext(AuthContext);
  const { vote } = useContext(ProfileContext);
  const videoVote = vote.filter((i) => i.userId === user._id);

  return (
    <div className="user-video">
      <video controls>
        <source src={`${uri}/video/${user?.video?.filename}`} />
      </video>
      <table>
        <tr>
          <th>video Title</th>
          <th>description</th>
          <th>Votes</th>
          <th>View</th>
        </tr>
        <tr>
          <td>{user?.video?.title}</td>
          <td>{user?.video?.description}</td>
          <td>{videoVote?.length}</td>
          <td>0</td>
        </tr>
      </table>
    </div>
  );
}

export default ProfileVideo;
