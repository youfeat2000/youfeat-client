import React, { useContext, useState } from "react";
import AuthContext from "../../../context/AuthContext";

function VideoUpload({ userId, setUserId }) {
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState("");
  const [videoName, setVideoName] = useState(null);
  const [catigory, setCatigory] = useState("");
  const [description, setDescription] = useState("");
  const { uri } = useContext(AuthContext);
  const handleUpload = (e) => {
    e.target.style.backgroundColor = "grey";
    e.target.innerText = "Loading...";

    const formData = new FormData();
    formData.append("video", video[0]);
    formData.append("title", title);
    formData.append("catigory", catigory);
    formData.append("description", description);
    formData.append("userId", userId);

    console.log(formData.get("video"));
    fetch(`${uri}/videouploads`, {
      method: "POST",
      dataType: "jsonp",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
      .finally(() => {
        e.target.style.backgroundColor = "#374254";
        e.target.innerText = "Update";
        setUserId(null);
        setVideoName(null);
      });
  };
  return (
    <>
      {userId && (
        <div className="uplaod-video">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1 onClick={() => setUserId(null)}>&times;</h1>
            <div>
              <p>Choose a video</p>
            </div>
            <p>{videoName && `video: ${videoName}`}</p>

            <input
              type="file"
              className="video-input"
              name="video"
              aria-required
              formTarget="video/mp4"
              required
              onChange={(e) => {
                setVideo(e.target.files);
                setVideoName(e.target.files[0].name);
              }}
            />

            <input
              type="text"
              placeholder="title"
              name="title"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="description"
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <select
              placeholder="catigory"
              required
              onChange={(e) => setCatigory(e.target.value)}>
              <option value="None">None</option>
              <option value="Dance">Dance</option>
              <option value="Music">Music</option>
              <option value="Commedy">Commedy</option>
              <option value="Short drama">Short drama</option>
              <option value="Poetry/Speach">Poetry/Speach</option>
            </select>
            <button onClick={(e) => handleUpload(e)}>Upload</button>
          </form>
        </div>
      )}
    </>
  );
}

export default VideoUpload;
