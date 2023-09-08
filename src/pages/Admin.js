import React, { useEffect, useState } from "react";
import AllUsers from "../component/AllUsers";
import Notify from "../component/Notify";
import { useDispatch, useSelector } from "react-redux";
import {
  handleGetUser,
  handleGetUsers,
  handleGetVote,
} from "../redux/redux-slice/UsersSlice";

// admin page
function Admin() {
  const [sendTo, setSendTo] = useState(null);
  const { user, vote, users } = useSelector((state) => state.UsersSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch(handleGetUser());
    }
  }, []);
  useEffect(() => {
    if (!users?.length) {
      dispatch(handleGetUsers());
    }
  }, []);
  useEffect(() => {
    if (!vote?.length) {
      dispatch(handleGetVote());
    }
  }, []);
  return (
    <div>
      <header className="admin-header">
        <form>
          <h2>competition mode</h2>
          <label for="start">Competition ongoing</label>
          <input type="radio" name="competition" id="start" />
          <br />
          <label for="register">Registration ongoing</label>
          <input type="radio" name="competition" id="register" />
        </form>
        <br />
        <section>
          <h2>send a notification to everyone</h2>
          <button onClick={() => setSendTo("everyOne")}>
            send notification
          </button>
        </section>
      </header>
      <section className="all-users-con">
        <AllUsers />
      </section>
      <Notify sendTo={sendTo} setSendTo={setSendTo} />
    </div>
  );
}

export default Admin;
