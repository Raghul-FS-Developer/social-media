import React,{useState,useEffect} from 'react'
import '../styles/sidebar.css'
import {MdRssFeed ,MdSlowMotionVideo ,MdGroups ,MdOutlineWorkOutline ,MdSchool} from 'react-icons/md'
import {BsFillChatLeftTextFill ,BsFillBookmarkFill} from 'react-icons/bs'
import {AiOutlineQuestionCircle} from 'react-icons/ai' 
import {RiCalendarEventFill} from 'react-icons/ri'
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
        <ul className='sidebarList'>
          <li className='sidebarListItem'>
            <MdRssFeed className='sidebarIcon'/>
            <span className='sidebarListItemText'>Feed</span>
          </li>
          <li className='sidebarListItem' style={{cursor:"pointer"}}onClick={()=>navigate('/chat')}>
            <BsFillChatLeftTextFill className='sidebarIcon'/>
            <span className='sidebarListItemText'>Chats</span>
          </li>
          <li className='sidebarListItem'>
            <MdSlowMotionVideo className='sidebarIcon'/>
            <span className='sidebarListItemText'>Videos</span>
          </li>
          <li className='sidebarListItem'>
            <MdGroups className='sidebarIcon'/>
            <span className='sidebarListItemText'>Groups</span>
          </li>
          <li className='sidebarListItem'>
            <BsFillBookmarkFill className='sidebarIcon'/>
            <span className='sidebarListItemText'>Bookmarks</span>
          </li>
          <li className='sidebarListItem'>
            <AiOutlineQuestionCircle className='sidebarIcon'/>
            <span className='sidebarListItemText'>Questions</span>
          </li>
          <li className='sidebarListItem'>
            <MdOutlineWorkOutline className='sidebarIcon'/>
            <span className='sidebarListItemText'>Jobs</span>
          </li>
          <li className='sidebarListItem'>
            <RiCalendarEventFill className='sidebarIcon'/>
            <span className='sidebarListItemText'>Events</span>
          </li><li className='sidebarListItem'>
            <MdSchool className='sidebarIcon'/>
            <span className='sidebarListItemText'>Courses</span>
          </li>
        </ul>
        <button className='sidebarButton'>Show More</button>
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