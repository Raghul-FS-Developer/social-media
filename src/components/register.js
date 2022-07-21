import React,{ useState} from 'react';
import axios from 'axios'
import '../styles/register.css'
import { useNavigate } from 'react-router-dom';
import db from '../db'
import {CgProfile} from 'react-icons/cg'
import {GiPartyPopper} from 'react-icons/gi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    
    // const [wait,setWait] =useState(false)
    // const [msg ,setMsg]=useState('')
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
    const id = toast.loading("Please wait...")
            
        let res = await axios.post(`${db}register`,formdata)
 
        if(res.data.statuscode === 200){
       
    toast.update(id, { render: "Check your mail for account activation link", type: "success", isLoading: false ,closeButton:true,autoClose:true})

          
        }else{
            
            toast.update(id,{render:res.data.message,type:"error",autoClose:true,closeButton:true, isLoading: false })
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
  
   const handleImage=(e)=>{
       if(e.target.files[0].size > 10356302){
           toast.error('File size should be less than 10 mb')
           
        }else{
            setProfile(e.target.files[0])
            
                toast.success(<img  style={{height:"150px",width:"150px",borderRadius:"50%",objectFit:"cover"}} src={URL.createObjectURL(e.target.files[0])}/>,{render:"profile pic"})
        
    
      }
    
  }

  return (
    <div className='login'>
        <ToastContainer limit={2}/>
        <div className='loginWrapper'>
            <div className='loginLeft'>
                <h3 className='loginLogo'>Fun<GiPartyPopper className='deko'/>Zone</h3>
                <span className='loginDesc'>connect with your friend and the world around you on FunZone<span className='custom'>:)</span></span>
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
                    <label style={{color:profile && 'green'}} className='register-profile'>

                    <input type='file' accept='image/*' style={{display:'none'}}  onChange={handleImage} />
                    <CgProfile  size={25}/>profile
                    </label>
                    {/* <p style={{color:'red'}}>{msg}</p> {wait && <p className='registerWait'>wait a moment...</p>} */}
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