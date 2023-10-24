import React, { useContext } from 'react'
import ProfileContext from '../context/ProfileContext'
import {CiWarning} from 'react-icons/ci'

function UserVerificationPopup({navigate, pop, setPop}) {
    const {handleResend} = useContext(ProfileContext)
  return (
    <>
    {pop &&
    <section className='popup'>
        <div>
          <br/>
       <p><CiWarning color='red' size={40}/> <small>Sory but your account is not Verified</small></p>
        <br/>
        <span>
            <button onClick={()=>setPop(false)}>Later</button>
            <button onClick={()=>handleResend(navigate)}>Verify</button>
        </span>
        <br/>
        </div>
    </section>
        }
    </>
  )
}

export default UserVerificationPopup