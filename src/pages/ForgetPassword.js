import React, {useContext, useState} from 'react'
import ResetPassword from '../component/ResetPassword'
import AuthContext from '../context/AuthContext'
import emailjs from 'emailjs-com'
import { useNavigate } from 'react-router-dom'

function ForgetPassword() {
    const [email, setEmail] = useState()
    const [resulved, setResulved] = useState(false)
    const {uri} = useContext(AuthContext)
    const navigate = useNavigate()

    const sendEmail = (code, fullName) => {
      const emailParams = {
        to_email: email,
        message: code?.toString(),
        to_name: fullName,
      };
      emailjs
        .send(process.env.REACT_APP_SERVICE_KEY, process.env.REACT_APP_TEMPLATE_KEY, emailParams, process.env.REACT_APP_USER_KEY)
        .then((response) => {
          setResulved(true)
          console.log("Email sent successfully:", response);
        })
        .catch((error) => {
          console.log("Email sending failed:", error);
        });
    };

    const handleSubmit =(e)=>{
      e.target.disabled = true;
        e.target.style.backgroundColor = "grey";
        e.target.innerText = "Loading...";
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
      .finally(()=>{
        e.target.disabled = false;
        e.target.style.backgroundColor = "#e03e03";
        e.target.innerText = "Submit";
      })
    }

  return (
    <div className='login'>
        {!resulved ?
            <form onSubmit={(e)=> e.preventDefault()}>
                <label>
              Enter Your Email<span style={{ color: "orangered" }}>*</span>
                </label>
                <br/>
                <input type='email' placeholder='email...' onChange={(e)=>setEmail(e.target.value)} required/>
                <br/>
                <button onClick={(e)=>handleSubmit(e)}>Submit</button>
            </form>:
            <ResetPassword email={email} handleResend={handleSubmit}/>
        }
    </div>
  )
}

export default ForgetPassword