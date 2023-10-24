import React, {useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import emailjs from 'emailjs-com'

function ConfirmEmailCode() {
  const {uri, setAuth, email} = useContext(AuthContext)
    const [code, setCode] = useState()
    const navigate = useNavigate()
    
  const handleVerify =(e)=>{
    e.target.style.backgroundColor = "grey";
    e.target.innerText = "Loading...";
    e.target.disabled = true;
    fetch(`${uri}/verifyemail`, {
      method: 'POST',
      credentials: 'include',
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        code
      })
    })
    .then(res=> {
      if(res.ok){
        return res.json()
      }else if(res.status === 401){
        throw 'Wrong verification code'
      }else {
        throw 'Server error'
      }
    })
    .then(data => {
        setAuth(data);
        navigate("/");
    })
    .catch((err) => {
        alert(err)
      })
      .finally(()=>{
        e.target.disabled = false;
        e.target.style.backgroundColor = "#e03e03";
        e.target.innerText = "Verify";
      })
  }

  const sendEmail = (code, fullName) => {
    const emailParams = {
      to_email: email,
      message: code?.toString(),
      to_name: fullName,
    };
    emailjs
      .send(process.env.REACT_APP_SERVICE_KEY, process.env.REACT_APP_TEMPLATE_KEY, emailParams, process.env.REACT_APP_USER_KEY)
      .then((response) => {
        console.log("Email sent successfully:", response);
      })
      .catch((error) => {
        console.log("Email sending failed:", error);
      });
  };

  const handleResend =()=>{
    fetch(`${uri}/checkemail`,{
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        email,
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
    <div className='login'>
        <form onSubmit={(e)=>e.preventDefault()}>
            <h2 style={{color:'#fafafa'}}>Confirm your email</h2>
            <p style={{color:'#fafafa'}}>A verification code has been sent to your email</p>
            <br/>
            <input type='number' placeholder = '123-456' required onChange={(e)=>setCode(e.target.value)}/>
            <br/>
            <button onClick={(e)=>handleVerify(e)}>Verify</button>
            <br/>
            <p style={{color:'#fafafa'}}>Did't get an email <span onClick={handleResend} style={{color:'green', fontWeight: 600}}>Resend</span></p>
        </form>
    </div>
  )
}

export default ConfirmEmailCode