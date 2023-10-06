import React, { useContext, useState } from "react";
import ProfileContext from "../../context/ProfileContext";
import AuthContext from "../../context/AuthContext";
import { CgPen } from "react-icons/cg";

//this is the popup that allows users edit their bio
function UserBioUpdate({ userId, setUserId }) {
  const { uri } = useContext(AuthContext);
  const { user, setUser } = useContext(ProfileContext);
  const [toggle, setToggle] = useState()
  const [bio, setBio] = useState(user?.bio);
  const [state, setState] = useState(user?.state);
  const [dob, setDob] = useState(user?.dob);
  const [highschool, setHighschool] = useState(user?.highschool);

  const handleExit =()=>{
    setBio(user?.bio)
    setState(user?.state)
    setDob(user?.dob)
    setHighschool(user?.highschool)
    setUserId(null)
  }

  const handleSubmit = (e) => {
    e.target.style.backgroundColor = "gray";
    e.target.innerText = "Loading...";
    e.target.disabled = true;

    fetch(`${uri}/bio/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bio, state, dob, highschool }),
    })
      .then((res) => res.json())
      .then((data) => setUser({ ...data, bio }))
      .catch((err) => console.log(err))
      .finally(() => {
        e.target.style.backgroundColor = "#374254";
        e.target.innerText = "Update";
        e.target.disabled = false;
        setBio(user?.bio)
        setState(user?.state)
        setDob(user?.dob)
        setHighschool(user?.highschool)
        setUserId(null)
      });
  };
  return (
    <>
      {userId && (
        <div className="edit-bio">
          <div>
            <h2 onClick={handleExit}>&times;</h2>
            <br/>
            <section>
            <h3>Your Bio <CgPen onClick={()=>setToggle('bio')}/><span>{bio?.slice(0,10)}...</span></h3>
            {toggle === 'bio'?
            <textarea placeholder="Bio.." type='text' onChange={(e)=>setBio(e.target.value)}/>:
            <span>
              {user?.bio ?<p>{user?.bio}</p>:<p>No Bio...</p> }
              </span>}
              </section>
              <br/>
            <section>
            <h3>Your State <CgPen onClick={()=>setToggle('state')}/><span>{state?.slice(0,10)}...</span></h3>
            {toggle === 'state'?
            <input placeholder="state..." type='text' onChange={(e)=>setState(e.target.value)}/>:
            <span>
              {user?.state ?<p>{user?.State}</p>:<p>No State...</p> }
              </span>}
              </section>
              <br/>
            <section>
            <h3>Your Date of Birth <CgPen onClick={()=>setToggle('dob')}/><span>{dob?.slice(0,10)}...</span></h3>
            {toggle === 'dob'?
            <input type='date' placeholder="Date of Birth..." onChange={(e)=>setDob(e.target.value)}/>:
            <span>
              {user?.dob ?<p>{user?.dob}</p>:<p>No Date od Birth..</p> }
              </span>}
              </section>
            <br/>
            <section>
            <h3>Your High School <CgPen onClick={()=>setToggle('hs')}/><span>{highschool?.slice(0,10)}...</span></h3>
            {toggle === 'hs'?
            <input type='text' placeholder="high school" onChange={(e)=>setHighschool(e.target.value)}/>:
            <span>
              {user?.highschool ?<p>{user?.highschool}</p>:<p>No High School...</p> }
              </span>}
              </section>
            <br/>
            <button onClick={(e)=>handleSubmit(e)}>Submit</button>
            <br/>
            </div>
        </div>
      )}
    </>
  )
      }

export default UserBioUpdate;
