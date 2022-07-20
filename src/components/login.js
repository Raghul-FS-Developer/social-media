import React, { useRef, useState } from 'react'
import '../styles/login.css';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import db from '../db'
import {GiPartyPopper} from 'react-icons/gi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

    const myStorage = window.localStorage
    

    const nav = useNavigate()
    const username = useRef()
    const password = useRef()
    const handleSubmit =async(e)=>{

        e.preventDefault()
        const id = toast.loading("checking credentials...")
       let res = await axios.post(`${db}login`,{username:username.current.value ,password:password.current.value})
        if(res.data.statuscode === 200){ 
        
         myStorage.setItem('user',res.data.username)
         myStorage.setItem('userId',res.data.userId)
         nav('/') 
         
         window.location.reload()
       }else{
           toast.update(id, {render:res.data.message,type:"error",isLoading:false,autoClose:true,closeButton:true})
       }
    }
   
  return (
    <div className='login'>
        <ToastContainer/>
        <div className='loginWrapper'>
            <div className='loginLeft'>
                <h3 className='loginLogo'>Fun<GiPartyPopper className='deko'/>Zone</h3>
                <span className='loginDesc'>connect with your friend and the world around you on FunZone<span className='custom'>:)</span></span>
            </div>
            <div className='loginRight'>
                <form className='loginBox' onSubmit={handleSubmit}>
                    <input placeholder='Username' type='username' className='loginInput' required ref={username}/>
                    <input placeholder='Password' type='password' className='loginInput' required minLength={8} maxLength={14} ref={password}/>
                    <button className='loginButton' type='submit'>LogIn</button>

                    <span  className='loginForgot' onClick={()=>nav('/forgot-password')}><u >Forgot password?</u></span>
                    <button className='loginRegisterButton' onClick={()=>nav('/register')} >Create a new account</button>
                </form>
            </div>
        </div>
        </div>
  )
}

export default Login