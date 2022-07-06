import React,{useState,useEffect} from 'react'
import '../styles/sidebar.css'
import adsl from '../img/adsl.png'
import Friend from './friend'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import db from '../db'
function Sidebar() {

  const navigate = useNavigate()

  const [Users,setUsers]=useState()

  useEffect(()=>{
   const getusers = async()=>{
     let res =await axios.get(`${db}allusers`)
   setUsers(res.data)
  }
  getusers()
  },[])

  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>
      <img className='sideImg' src={adsl} alt=''/>
          
        <hr className='sidebarHr'/>
        <ul className='sidebarFriendList'>
          <p className='sub'>All Users</p>
        {Users?.map(u=>(
         <Friend key={u.id} users={u}/>
         ))}
          </ul>
      </div>
    </div>
  )
}

export default Sidebar