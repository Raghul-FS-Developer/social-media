import React from 'react'
import {useNavigate} from 'react-router-dom'

function Friend({users}) {

  const navigate = useNavigate()
  const handleClick=(username)=>{
    navigate(`/profile/${username}`)
    window.location.reload()
  }
  return (
    <li className='sidebarFriend' onClick={()=>handleClick(users?.username)}>
    <img className='sidebarFriendImg' src={users?.profilepicture ? users.profilepicture : "https://globalcenters.columbia.edu/themes/custom/columbia/assets/img/people-default.svg"}/>
    <span>{users?.username}</span>
  </li>
  )
}

export default Friend