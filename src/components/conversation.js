import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../styles/conversation.css'
import db from '../db'

function Conversation({conversation , currentUser}) {

  const [user ,setUser] = useState(null)
 
  useEffect(()=>{
    
    const friendId = conversation.members.find((m)=> m !== currentUser)

    const getUser = async () =>{
      try{
      const res = await axios.get(`${db}getuser?userId=`+ friendId)

      setUser(res.data.data)
      }catch(err){
        console.log(err)
      }
    };
  
    getUser()
  
  },[currentUser ,conversation])




  
  return (
  <>
 
       <div className='conversation'>
       { user && (
       <>
       <img className='conversationImg' src={user.profilepicture ? user.profilepicture :"https://globalcenters.columbia.edu/themes/custom/columbia/assets/img/people-default.svg"}/>
       <span className='conversationName'>{user.username}</span>
       </>)}

    
        </div>   
 </>
    
  )
}

export default Conversation