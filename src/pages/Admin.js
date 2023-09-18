import React, { useContext, useEffect, useState } from "react";
import AllUsers from "../component/AllUsers";
import Notify from "../component/Notify";
import ProfileContext from "../context/ProfileContext";
import AuthContext from "../context/AuthContext";

// admin page
function Admin() {
  const [sendTo, setSendTo] = useState(null);
  const { user, vote, users, setUser, setUsers, setVote } =
    useContext(ProfileContext);
  const { uri } = useContext(AuthContext);
  useEffect(() => {
    if (!user) {
      fetch(`${uri}/user`, {
        method: "POST",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  useEffect(() => {
    if (!users?.length) {
      fetch(`${uri}/users`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  useEffect(() => {
    if (!vote?.length) {
      fetch(`${uri}/allvote`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => setVote(data))
        .catch((err) => console.log(err));
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
