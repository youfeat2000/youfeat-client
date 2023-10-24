import React from 'react'
import { CiWarning } from 'react-icons/ci'

function Popup({message, setMessage}) {
  return (
    <>{
        message &&
    <section className='popup'>
        <div>
        <br/>
        <p><CiWarning size={40}/> <small>{message}</small></p>
        <br/>
        <span>
        <button onClick={()=>setMessage(null)}>Okay</button>
        </span>
        </div>
    </section>
    }
</>
  )
}

export default Popup