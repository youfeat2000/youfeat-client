import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileContext from "../../context/ProfileContext";

function AllComment() {
  const [userComment, setUserComment] = useState();
  const { comment, users } = useContext(ProfileContext);
  const params = useParams();

  useEffect(() => {
    const i = comment?.filter((v) => v?.userId === params.id);
    setUserComment(i);
  }, [comment]);
  return (
    <div className="allcomment" id="comment">
      {userComment?.map((value) => {
        const user = users?.filter((v) => v?._id === value?.commenterId);
        return (
          <div key={value._id}>
            <h4>{user[0]?.fullName}</h4>
            <p>{value.comment}</p>
          </div>
        );
      })}
      <br />
    </div>
  );
}

export default AllComment;
