import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function AllComment() {
  const [userComment, setUserComment] = useState();
  const { comments, users } = useSelector((state) => state.UsersSlice);
  const params = useParams();

  useEffect(() => {
    const i = comments?.filter((v) => v?.userId === params.id);
    setUserComment(i);
  }, [comments]);
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
