import React, { useEffect, useState } from "react";
import AllVideos from "../component/AllVideos";
import VideoCatigory from "../component/VideoCatigory";
import { useSelector, useDispatch } from "react-redux";
import {
  handleGetComments,
  handleGetUsers,
  handleGetVote,
} from "../redux/redux-slice/UsersSlice";

function Index() {
  const [users, setUsers] = useState();
  const { vote, comments } = useSelector((state) => state.UsersSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!vote?.length) {
      dispatch(handleGetVote());
    }
  }, []);

  useEffect(() => {
    if (!comments?.length) {
      dispatch(handleGetComments());
    }
  }, []);

  useEffect(() => {
    if (!users?.length) {
      dispatch(handleGetUsers());
    }
  }, []);

  return (
    <div className="index">
      <VideoCatigory setUsers={setUsers} />
      <AllVideos users={users} videoUri={"video"} />
    </div>
  );
}

export default Index;
