import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

function ResetPassword({email, handleResend}) {
    const [newPassword, setNewPassword] = useState()
    const {uri}= useContext(AuthContext)
    const [code, setCode] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e)=>{
        e.target.disabled = true;
        e.target.style.backgroundColor = "grey";
        e.target.innerText = "Loading...";
        fetch(`${uri}/setpassword`, {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                code,
                password: newPassword
            })
        })
        .then((res)=>{
            if(res.ok){
                navigate('../login')
            }else if(res.status === 401){
                throw 'wrong verification code'
            }else{
                throw 'server error'
            }
        })
        .catch(err=> alert(err))
        .finally(()=>{
            e.target.disabled = false;
        e.target.style.backgroundColor = "#e03e03";
        e.target.innerText = "Submit";
        })
    }
  return (
    <form onSubmit={(e)=> e.preventDefault()}>
                <br/>
                <h2>Comfirm Your Email and Reset Password</h2>
                <br/>
                <label>
                Check Your Email for Your Code: {email}<span style={{ color: "orangered" }}>*</span>
                </label>
                <input type='number' placeholder='123456' onChange={(e)=>setCode(e.target.value)} required/>
                <br/>
                <label>
                Enter a new Password:<span style={{ color: "orangered" }}>*</span>
                </label>
                <input type='password' placeholder='enter new password...' onChange={(e)=>setNewPassword(e.target.value)} required/>
                <br/>
                <button onClick={(e)=>handleSubmit(e)}>Submit</button>
                <br/>
                <p>Did't get an email <span onClick={handleResend} style={{color:'green', fontWeight: 600}}>Resend</span></p>
            </form>
  )
}

export default ResetPassword