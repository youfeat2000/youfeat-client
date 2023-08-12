import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import ProfileContext from "../../context/ProfileContext";

function ProfileVideo({ foundUser }) {
  const { uri } = useContext(AuthContext);
  const { vote } = useContext(ProfileContext);
  const videoVote = vote.filter((i) => i.userId === foundUser[0]?._id);

  return (
    <div className="user-video">
      <span>
        <video controls>
          <source src={`${uri}/video/${foundUser[0]?.video?.filename}`} />
        </video>
      </span>
      <div>
        <table>
          <thead>
            <th>video Title</th>
            <th>description</th>
            <th>Votes</th>
            <th>View</th>
          </thead>
          <tbody>
            <td>{foundUser[0]?.video?.title}</td>
            <td>{foundUser[0]?.video?.description}</td>
            <td>{videoVote?.length}</td>
            <td>0</td>
          </tbody>
        </table>
        <br />
      </div>
    </div>
  );
}

export default ProfileVideo;
