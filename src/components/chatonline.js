import axios from 'axios';
import { useEffect, useState } from 'react';
import '../styles/chatonline.css';
import db from '../db'

function Chatonline({onlineusers, currentId, setCurrentChat}) {

  const[friends,setFriends]=useState([])
  const[onlinefriends,setOnlineFriends]=useState([])

  useEffect(()=>{
    const getFriends = async () =>{
      const res = await axios.get(`${db}friends/${currentId}`)
      setFriends(res.data.data)
    } 
    getFriends()

  },[currentId])

  useEffect(()=>{
    
    setOnlineFriends(friends.filter((f) => onlineusers.includes(f._id)))

  },[friends,onlineusers])

  const handleSubmit =async(user)=>{
    try {
      const res =await axios.get(`${db}find/${currentId}/${user._id}`)
      setCurrentChat(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='chatOnline'>
      {onlinefriends.map((o)=>(
        <div className='chatOnlineFriend' onClick={()=>handleSubmit(o)}>
            <div className='chatOnlineImgContainer'>
                <img className='chatOnlineImg' src={o?.profilepicture ? o.profilepicture : 'https://globalcenters.columbia.edu/themes/custom/columbia/assets/img/people-default.svg'}/>
                <div className='chatOnlineBadge'></div>
            </div>
            <span className='chatOnlineName'>{o?.username}</span>
        </div>
        ))}
    </div>
  )
}

export default Chatonline