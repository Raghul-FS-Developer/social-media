import React,{ useState} from 'react';
import axios from 'axios'
import '../styles/register.css'
import { useNavigate } from 'react-router-dom';
import db from '../db'
import {CgProfile} from 'react-icons/cg'


function Register() {
    
    const [msg ,setMsg]=useState('')
    const [username ,setUsername]=useState('')
    const [email ,setEmail]=useState('')
    const [password ,setPassword]=useState('')
    const [city ,setCity]=useState('')
    const [from ,setFrom]=useState('')
    const [relationship ,setRelationship]=useState('')
    const [profile,setProfile]=useState('')
    const [disc ,setDisc] = useState('')
    
    const nav = useNavigate()

    if(profile == undefined){
        setProfile('')

    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        
        try{
            
        let res = await axios.post(`${db}register`,formdata)
 
        if(res.data.statuscode === 200){
            alert('check your mail for account activation link')
        }else{
            setMsg(res.data.message)
        }}catch(err){
            console.log(err)
        }
       
    }
    
  
 
    const formdata = new FormData()

   formdata.append('username',username)
   formdata.append('email',email)
   formdata.append('password',password)
   formdata.append('city',city)
   formdata.append('from',from)
   formdata.append('disc',disc)
   formdata.append('relationship',relationship)
   formdata.append('profilepicture',profile)

  return (
    <div className='login'>
        <div className='loginWrapper'>
            <div className='loginLeft'>
                <h3 className='loginLogo'>SocialMedia</h3>
                <span className='loginDesc'>connect with your friend and the world around you on SocialMedia<span className='custom'>:)</span></span>
            </div>
            <div className='loginRight'>
                <form className='registerBox' onSubmit={handleSubmit}>
                   <input placeholder='Username' type='username' className='registerInput' required onChange={(e)=>setUsername(e.target.value)}/>
                    <input placeholder='Email' type='email' className='registerInput' onChange={(e)=>setEmail(e.target.value)} required />
                    <input placeholder='Password' type='password' className='registerInput'required onChange={(e)=>setPassword(e.target.value)}  minLength={8} maxLength={14}/> 
                    
                    <div className='bunch'>
                    <input placeholder='Disc' type='text' className='bunchInput' required onChange={(e)=>setDisc(e.target.value)} maxLength={25}/>
                    <input placeholder='City' type='text' className='bunchInput' required onChange={(e)=>setCity(e.target.value)} maxLength={25}/>
                    <input placeholder='From' type='text' className='bunchInput' required onChange={(e)=>setFrom(e.target.value)} maxLength={25}/>
                    <input placeholder='RelationShip' type='text' className='bunchInput' required onChange={(e)=>setRelationship(e.target.value)} maxLength={25}/>

                    </div>
                    <label  className='register-profile'>

                    <input type='file' accept='image/*' style={{display:'none'}}  onChange={(e)=>setProfile(e.target.files[0])} />
                    <CgProfile size={25}/>profile
                    </label>
                    <p style={{color:'red'}}>{msg}</p>
                    <button className='loginButton' type='submit'>SignUp</button>
                    <hr/>
                    <button className='loginRegisterButton' onClick={()=>nav('/login')}>LogIn</button>
                </form>
            </div>
        </div>
    
    </div>
  )
}

export default Register