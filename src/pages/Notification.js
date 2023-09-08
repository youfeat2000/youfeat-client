import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleGetUser } from "../redux/redux-slice/UsersSlice";

function Notification() {
  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newNotification, setNewNotification] = useState([]);
  const { user } = useSelector((state) => state.UsersSlice);
  const { uri } = useSelector((state) => state.AuthSlice);
  const dispatch = useDispatch();

  //function to get all notification
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
    if (!user) {
      dispatch(handleGetUser());
    }
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
