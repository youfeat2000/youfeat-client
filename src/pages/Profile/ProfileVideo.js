import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { FaCommentDots } from "react-icons/fa";
import {GiCheckMark} from 'react-icons/gi'
import ProfileContext from "../../context/ProfileContext";

//this is the section that shows the user video in the profile page
//imported in the userVideoStatistics component
function ProfileVideo({ foundUser }) {
  const { uri } = useContext(AuthContext);
  const { vote, comment } = useContext(ProfileContext);
  const videoVote = vote.filter((i) => i.userId === foundUser[0]?._id);
  const [userComment, setUserComment] = useState();
  const params = useParams();

  useEffect(() => {
    const i = comment?.filter((v) => v?.userId === params.id);
    setUserComment(i);
  }, [comment]);
  //
  return (
    <div className="user-video">
      <br/>
      <span>
        <video controls>
          <source src={`${uri}/video/${foundUser[0]?.video?.filename}`} />
        </video>
      </span>
      <div>
      <ul>
        <li><b>{foundUser[0]?.video?.title}</b></li>
        <li><small><GiCheckMark size={18} style={{marginRight: '5px'}}/></small><p>{videoVote?.length}</p></li>
        <li><small><FaCommentDots size={18} style={{marginRight: '5px'}}/></small><p>{userComment?.length}</p></li>
      </ul>
      <div>
        <p>{foundUser[0]?.video?.description}</p>
      </div>
      </div>
      <br/>
    </div>
  );
}

export default ProfileVideo;
