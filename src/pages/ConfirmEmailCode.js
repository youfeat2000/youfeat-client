import React, {useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import AuthContext from '../context/AuthContext'

function ConfirmEmailCode() {
  const {uri, setAuth} = useContext(AuthContext)
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

  return (
    <div className='login'>
        <form onSubmit={(e)=>e.preventDefault()}>
            <h2>Confirm your email</h2>
            <p>A verification code has been sent to your email</p>
            <br/>
            <input type='number' placeholder = '123-456' required onChange={(e)=>setCode(e.target.value)}/>
            <br/>
            <button onClick={handleVerify}>Verify</button>
        </form>
    </div>
  )
}

export default ConfirmEmailCode