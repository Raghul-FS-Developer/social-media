import React, { useRef, useState } from 'react'
import '../styles/login.css';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import db from '../db'
function Login() {

    const myStorage = window.localStorage
    
    const [msg ,setMsg]=useState('')
    const nav = useNavigate()
    const username = useRef()
    const password = useRef()
    const handleSubmit =async(e)=>{

        e.preventDefault()
       let res = await axios.post(`${db}login`,{username:username.current.value ,password:password.current.value})

        if(res.data.statuscode === 200){ 
        
         myStorage.setItem('user',res.data.username)
         myStorage.setItem('userId',res.data.userId)
         nav('/') 
         window.location.reload()
       }else{
           setMsg(res.data.message)
       }
    }
   
  return (
    <div className='login'>
        <div className='loginWrapper'>
            <div className='loginLeft'>
                <h3 className='loginLogo'>SocialMedia</h3>
                <span className='loginDesc'>connect with your friend and the world around you on SocialMedia<span className='custom'>:)</span></span>
            </div>
            <div className='loginRight'>
                <form className='loginBox' onSubmit={handleSubmit}>
                    <input placeholder='Username' type='username' className='loginInput' required ref={username}/>
                    <input placeholder='Password' type='password' className='loginInput' required minLength={8} maxLength={14} ref={password}/>
                    <button className='loginButton' type='submit'>LogIn</button>
                    <p style={{color:'crimson'}}>{msg}</p>
                    <span  className='loginForgot' onClick={()=>nav('/forgot-password')}><u >Forgot password?</u></span>
                    <button className='loginRegisterButton' onClick={()=>nav('/register')} >Create a new account</button>
                </form>
            </div>
        </div>
    
    </div>
  )
}

export default Login