import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

//this pade is the popup that allows admin send notifcation
function Notify({ sendTo, setSendTo }) {
  const { uri } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  //sending notification to the server
  const handleNotify = (e) => {
    e.target.style.backgroundColor = "grey";
    e.target.innerText = "Loading...";
    e.target.disabled = true;
    const i = new Date();
    fetch(`${uri}/notify`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "youfeat",
        to: sendTo,
        message,
        date: String(i).slice(0, 24),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Notification sent");
        console.log(data);
      })
      .catch((err) => alert("Error"))
      .finally(() => {
        e.target.style.backgroundColor = "#374254";
        e.target.innerText = "Send";
        e.target.disabled = true;
        setSendTo(null);
      });
  };
  return (
    <>
      {sendTo && (
        <div className="edit-bio">
          <div>
            <h2 onClick={() => setSendTo(null)}>&times;</h2>
            <h1>Send notification</h1>
            <textarea
              placeholder="send notification..."
              required
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={(e) => handleNotify(e)}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Notify;
