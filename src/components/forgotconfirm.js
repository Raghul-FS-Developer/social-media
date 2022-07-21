import React ,{useState} from 'react'
import '../styles/forgotconfirm.css';
import {useNavigate ,useParams} from 'react-router-dom'
import axios from 'axios';
import db from '../db'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function ForgotConfirm() {
  
const navigate=useNavigate()

const params=useParams()

const[msg,setMsg]=useState("")
const[password,setPassword]=useState("")
const[newpassword,setNewPassword]=useState("")

 let handleSubmit=async(e)=>{
   e.preventDefault()
   const id  = toast.loading('Please wait...')
        if(password === newpassword){
        
       let res = await axios.post(`${db}verify/${params.token}`,{
       password:password})


    if(res.data.statuscode==200){
     
      toast.update(id,{render:"password changed successfully",isLoading:false,type:'success',autoClose:true,closeButton:true})
      setTimeout(()=>navigate("/login"),2000)
    
    }else{
      toast.update(id,{render:res.data.message,isLoading:false,type:'error',autoClose:true,closeButton:true})

    }
}else{
       toast.update(id,{render:"Password Doesn't Match",isLoading:false,type:'error',autoClose:true,closeButton:true,delay:1000})

    }
}

  return (
    <div className='login'>
     <ToastContainer autoClose={2000}/>

    <div className='loginWrapper'>
        <div className='loginLeft'>
            <h3 className='loginLogo'>SocialMedia</h3>
            <span className='loginDesc'>connect with your friend and the world around you on SocialMedia<span className='custom'>:)</span></span>
        </div>
        <div className='loginRight'>
            <form className='confirmBox' onSubmit={handleSubmit}>
              <h2 className='confirm'>Reset Password</h2>
                <input placeholder='new password' type='password' className='confirmInput' required onChange={(e)=>setPassword(e.target.value)}/>
                <input placeholder='confirm password' type='password' className='confirmInput' required onChange={(e)=>setNewPassword(e.target.value)}/>
                <p style={{color:'crimson'}}>{msg}</p>  
               <hr/>
                <button className='loginButton' type='submit'>Send</button>
               
             </form>
        </div>
    </div>

</div>
  )
}

export default ForgotConfirm