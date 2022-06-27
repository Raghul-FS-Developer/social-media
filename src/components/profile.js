import React,{useEffect ,useState} from 'react'
import Feed from './feed'
import Rightbar from './rightbar'
import Sidebar from './sidebar'
import Navbar from './navbar'
import '../styles/profile.css';
import axios from 'axios';
import db from '../db' 
import { useParams } from 'react-router-dom'
import {BsFillCameraFill} from 'react-icons/bs'
function Profile() {

  const[user,setUser]=useState({})

  const username = useParams().username;
  
  useEffect(()=>{
  
    let getData=async()=>{
      let res = await axios.get(`${db}getuser?username=${username}`)

      setUser(res.data.data)
    }
    getData() 
    },[username])
    
  
  return (
    <>
    <Navbar/> 
    <div className='profile'>
    <Sidebar/>
    <div className='profileRight'>
    <div className='profileRightTop'>
        <div className='profileCover'>
        <img className='profileCoverImg' src={user.coverpicture || 'https://marketplace.canva.com/EAE89qUYCic/1/0/1600w/canva-blue-ocean-tide-beach-motivational-quote-facebook-cover-UlayDxq20Mo.jpg'} />
        <img className='profileUserImg' src={ user.profilepicture ? user.profilepicture :"https://globalcenters.columbia.edu/themes/custom/columbia/assets/img/people-default.svg"}/>
        {/* <label style={{ cursor: "pointer" }} className="shareOptionText">
        <input type='file' style={{ display: "none" }} accept="image/*"/>
        <BsFillCameraFill size={25} className='icons'/>
        </label> */}
        </div>
        <div className='profileInfo'>
            <h4 className='profileInfoName'>{user.username}</h4>
            <span className='profileInfoDesc'>{user.disc}</span>
        </div>
    </div>
    <div className='profileRightBottom'>
    <Feed username={username}/>
    <Rightbar user={user}/>
    </div>
    </div>
    </div>
    </>
  )
}

export default Profile