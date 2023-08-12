import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import ProfileContext from "../../context/ProfileContext";

function VideoUpload({ userId, setUserId }) {
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState("");
  const [videoLength, setVideoLength] = useState();
  const [videoLarge, setVideoLarge] = useState(false);
  const [videoName, setVideoName] = useState(null);
  const [catigory, setCatigory] = useState("");
  const [description, setDescription] = useState("");
  const { uri } = useContext(AuthContext);
  const { setUser } = useContext(ProfileContext);

  useEffect(() => {
    if (videoLength >= 120) {
      setVideoLarge(true);
    } else {
      setVideoLarge(false);
    }
  }, [videoLength]);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setVideo(e.target.files[0]);
      setVideoName(e.target.files[0].name);

      const vide = document.createElement("video");
      vide.preload = "metadata";
      vide.src = URL.createObjectURL(e.target.files[0]);
      vide.onloadedmetadata = () => {
        setVideoLength(vide.duration);
      };
    }
  };

  const handleUpload = (e) => {
    console.log(videoLarge);
    console.log(videoLength);
    if (videoLarge) {
      return alert("video duration too long");
    }
    e.target.style.backgroundColor = "grey";
    e.target.innerText = "Loading...";
    e.target.disabled = true;

    const formData = new FormData();
    formData.append("video", video);
    formData.append("title", title);
    formData.append("catigory", catigory);
    formData.append("description", description);
    formData.append("userId", userId);

    fetch(`${uri}/videouploads`, {
      method: "POST",
      dataType: "jsonp",
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("err");
        }
      })
      .then((data) => {
        setUser(data);
        alert("video updated");
      })
      .finally(() => {
        e.target.style.backgroundColor = "#374254";
        e.target.innerText = "Update";
        e.target.disabled = false;
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
            <article>
              <h2>Upload a video</h2>
              <p>Video must not be more than two minutes long</p>
            </article>
            <br />
            {videoLarge && <p style={{ color: "red" }}>video file too long</p>}
            <div>
              <p>Choose a video</p>
              <input
                type="file"
                className="video-input"
                name="video"
                aria-required
                formTarget="video/mp4"
                accept="video/*"
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
            <p>{videoName && `video: ${videoName}`}</p>
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
              <option value="Dance">Dance</option>
              <option value="Music">Music</option>
              <option value="Commedy">Comedy</option>
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
