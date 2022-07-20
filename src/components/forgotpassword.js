import React, { useRef, useState } from 'react';
import db from '../db';
import axios from 'axios';
import '../styles/forgotpassword.css';
import {GiPartyPopper} from 'react-icons/gi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {
  
  const email = useRef()


  const handleSubmit=async(e)=>{
    e.preventDefault()
    const id = toast.loading("please wait...")
    let res = await axios.post(`${db}forgot-password`,{email:email.current.value})
    if(res.data.statuscode === 200){
      toast.update(id,{render:'Check your email for password reset link',type:"success",isLoading:false,autoClose:true,closeButton:true})
    }else{
      toast.update(id,{render:res.data.message,type:"error",isLoading:false,autoClose:true,closeButton:true})
    }   
  }

  return (
    <>
    <div className='login'>
    <ToastContainer limit={2}/>
        <div className='loginWrapper'>
            <div className='loginLeft'>
                <h3 className='loginLogo'>Fun<GiPartyPopper className='deko'/>Zone</h3>
                <span className='loginDesc'>connect with your friend and the world around you on FunZone<span className='custom'>:)</span></span>
            </div>
            <div className='loginRight'>
                <form className='passBox' onSubmit={handleSubmit}>
                  <h2 className='forgot'>Forgot Password</h2>
                    <input placeholder='Enter Your Registered Email Address' type='email' className='forgotInput' required ref={email}/>
 
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