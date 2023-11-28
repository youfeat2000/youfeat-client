import React, { useContext, useState } from "react";
import ProfileContext from "../../context/ProfileContext";
import AuthContext from "../../context/AuthContext";
import { MdModeEdit } from "react-icons/md";

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
            <h3>Your Bio <MdModeEdit size={20} style={{marginLeft: '20px'}} onClick={()=>setToggle('bio')}/></h3>
            {toggle === 'bio'?
            <textarea placeholder="Bio.." type='text' onChange={(e)=>setBio(e.target.value)}/>:
            <span style={{marginTop: '10px'}}>
              {user?.bio ?<p>{user?.bio}</p>:<p>No Bio...</p> }
              </span>}
              </section>
              <br/>
            <section>
            <h3>Your State <MdModeEdit size={20} style={{marginLeft: '20px'}} onClick={()=>setToggle('state')}/></h3>
            {toggle === 'state'?
            <input placeholder="state..." type='text' onChange={(e)=>setState(e.target.value)}/>:
            <span style={{marginTop: '10px'}}>
              {user?.state ?<p>{user?.state}</p>:<p>No State...</p> }
              </span>}
              </section>
              <br/>
            <section>
            <h3>Your Date of Birth <MdModeEdit size={20} style={{marginLeft: '20px'}} onClick={()=>setToggle('dob')}/></h3>
            {toggle === 'dob'?
            <input type='date' placeholder="Date of Birth..." onChange={(e)=>setDob(e.target.value)}/>:
            <span style={{marginTop: '10px'}}>
              {user?.dob ?<p>{user?.dob.slice(0, 10)}</p>:<p>No Date fo Birth..</p> }
              </span>}
              </section>
            <br/>
            <section>
            <h3>Your High School <MdModeEdit size={20} style={{marginLeft: '20px'}} onClick={()=>setToggle('hs')}/></h3>
            {toggle === 'hs'?
            <input type='text' placeholder="high school" onChange={(e)=>setHighschool(e.target.value)}/>:
            <span style={{marginTop: '10px'}}>
              {user?.highschool ?<p>{user?.highschool}</p>:<p>No High School...</p> }
              </span>
              }
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
