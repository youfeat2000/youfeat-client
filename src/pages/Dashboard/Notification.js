import React, { useContext, useEffect, useState } from "react";
import ProfileContext from "../../context/ProfileContext";
import AuthContext from "../../context/AuthContext";

function Notification() {
  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newNotification, setNewNotification] = useState([]);
  const { user } = useContext(ProfileContext);
  const { uri } = useContext(AuthContext);
  useEffect(() => {
    setLoading(true);
    fetch(`${uri}/notification`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setNotification(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const i = notification?.filter(
      (value) => value?.to === "everyOne" || value?.to === user?._id
    );
    setNewNotification(i);
  }, [notification]);

  return (
    <div className="notification">
      {notification.length ? (
        newNotification.map((value) => {
          return (
            <div>
              <h3>{value.from}</h3>
              <p>{value.message}</p>
              <span>{value.date}</span>
            </div>
          );
        })
      ) : (
        <h1
          style={{ alignSelf: "center", justifySelf: "center", color: "grey" }}>
          {!loading ? "no notification" : "Loading..."}
        </h1>
      )}
    </div>
  );
}

export default Notification;
