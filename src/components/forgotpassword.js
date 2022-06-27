import React, { useRef, useState } from 'react';
import db from '../db';
import axios from 'axios';
import '../styles/forgotpassword.css';

function ForgotPassword() {
  
  const email = useRef()

  const [msg ,setMsg] = useState('')

  const handleSubmit=async(e)=>{
    e.preventDefault()
    let res = await axios.post(`${db}forgot-password`,{email:email.current.value})
    if(res.data.statuscode === 200){
      alert('Check your email for password reset link')
    }else{
      setMsg(res.data.message)
    }   
  }

  return (
    <>
    <div className='login'>
        <div className='loginWrapper'>
            <div className='loginLeft'>
                <h3 className='loginLogo'>SocialMedia</h3>
                <span className='loginDesc'>connect with your friend and the world around you on SocialMedia<span className='custom'>:)</span></span>
            </div>
            <div className='loginRight'>
                <form className='passBox' onSubmit={handleSubmit}>
                  <h2 className='forgot'>Forgot Password</h2>
                    <input placeholder='Enter Your Registered Email Address' type='email' className='forgotInput' required ref={email}/>
                    <p style={{color:'crimson'}}>{msg}</p>  
                   <hr/>
                    <button className='loginButton' type='submit'>Send</button>
                   
                 </form>
            </div>
        </div>
    
    </div>
    </>
  )
}

export default ForgotPassword