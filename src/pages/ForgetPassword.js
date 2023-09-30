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
      console.log(fullName, email, code)
      const emailParams = {
        to_email: email,
        message: code?.toString(),
        to_name: fullName,
      };
      emailjs
        .send("service_o7zsqgf", "template_xjt6l7d", emailParams, "hSaHRFDu3n5QYIXsK")
        .then((response) => {
          setResulved(true)
          console.log("Email sent successfully:", response);
        })
        .catch((error) => {
          console.log("Email sending failed:", error);
        });
    };

    const handleSubmit =()=>{
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
        {!resulved ?
            <form onSubmit={(e)=> e.preventDefault()}>
                <label>
              Enter Your Email<span style={{ color: "orangered" }}>*</span>
                </label>
                <br/>
                <input type='email' placeholder='email...' onChange={(e)=>setEmail(e.target.value)} required/>
                <br/>
                <button onClick={handleSubmit}>Submit</button>
            </form>:
            <ResetPassword email={email}/>
        }
    </div>
  )
}

export default ForgetPassword