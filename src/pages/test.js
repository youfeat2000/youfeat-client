import React, { useState } from "react";
import emailjs from "emailjs-com";

const EmailSender = () => {
  const [to_email, setToEmail] = useState("recipient@example.com");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  

  const sendEmail = () => {
    const emailParams = {
      to_email,
      subject,
      message,
    };

    emailjs
      .send("your_email_service_id", "your_template_id", emailParams)
      .then((response) => {
        console.log("Email sent successfully:", response);
      })
      .catch((error) => {
        console.log("Email sending failed:", error);
      });
  };

  return (
    <div>
      <h2>Send an Email</h2>
      <div>
        <label htmlFor="to_email">Recipient Email:</label>
        <input
          type="email"
          id="to_email"
          value={to_email}
          onChange={(e) => setToEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>
      <div>
        <button onClick={sendEmail}>Send Email</button>
      </div>
    </div>
  );
};

export default EmailSender;
