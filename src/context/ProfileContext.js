import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ProfileContext = createContext();
export function ProfileProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [vote, setVote] = useState([]);
  const [search, setSearch] = useState();
  const [comment, setComment] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    const i = users.filter((value) => value.video);
    setSearch(i);
  }, [users]);

  const sendEmail = (code, fullName) => {
    const emailParams = {
      to_email: user?.email,
      message: code?.toString(),
      to_name: fullName,
    };
    emailjs
      .send(process.env.REACT_APP_SERVICE_KEY, process.env.REACT_APP_TEMPLATE_KEY, emailParams, process.env.REACT_APP_USER_KEY)
      .then((response) => {
        console.log("Email sent successfully:", response);
        navigate('../../login')
      })
      .catch((error) => {
        console.log("Email sending failed:", error);
      })
  };

  const handleResend =()=>{
    fetch(`${uri}/checkemail`,{
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        email: user?.email,
        code: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
      })
    })
    .then(res=>{
      if(res.ok){
        return res.json()
      }else if(res.status === 401){
        throw 'Wrong Email'
      }else{
        throw 'server error'
      }
    })
    .then((data)=>{
      sendEmail(data?.code, data?.fullName, data?.email)
    })
    .catch(err=> alert(err))
  }

  return (
    <ProfileContext.Provider
      value={{
        user,
        setUser,
        setUsers,
        users,
        vote,
        setVote,
        toggle,
        setToggle,
        search,
        setSearch,
        comment,
        setComment,
        handleResend,
      }}>
      {children}
    </ProfileContext.Provider>
  );
}

export default ProfileContext;
