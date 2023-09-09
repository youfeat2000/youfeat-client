import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

//this is the section that shows the user video in the profile page
//imported in the userVideoStatistics component
function ProfileVideo({ foundUser }) {
  const { uri } = useSelector((state) => state.AuthSlice);
  const { vote, comments } = useSelector((state) => state.UsersSlice);
  const videoVote = vote.filter((i) => i.userId === foundUser[0]?._id);
  const [userComment, setUserComment] = useState();
  const params = useParams();

  useEffect(() => {
    const i = comments?.filter((v) => v?.userId === params.id);
    setUserComment(i);
  }, [comments]);
  return (
    <div className="user-video">
      <span>
        <video controls>
          <source src={`${uri}/video/${foundUser[0]?.video?.filename}`} />
        </video>
      </span>
      <div>
        <table>
          <tr>
            <th>Video Title</th>
            <th>Description</th>
            <th>Votes</th>
            <th>Comments</th>
          </tr>
          <tr>
            <td>{foundUser[0]?.video?.title}</td>
            <td>{foundUser[0]?.video?.description}</td>
            <td>{videoVote?.length}</td>
            <td>{userComment?.length}</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default ProfileVideo;
