import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../styles/conversation.css'
import db from '../db'
import {AiOutlineDelete} from 'react-icons/ai'

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

  const handleDelete = async(id)=>{
    let res =  await axios.delete(`${db}deleteconv/${id}`)
    if(res.status === 200){
        window.location.reload()
    }else{
      alert('Deletion failed')
    } 


  }


  
  return (
  <>
 
       <div className='conversation'>
       { user && (
        
       <>
        <div className='conversationWrapper'>
       <img className='conversationImg' src={user.profilepicture ? user.profilepicture :"https://globalcenters.columbia.edu/themes/custom/columbia/assets/img/people-default.svg"}/>
       <span className='conversationName'>{user.username}</span>
       </div>
      
       <div  className='deleteIcon' onClick={()=>handleDelete(conversation._id)}><AiOutlineDelete  size={20}/></div>
    
       </>)}

    
        </div>   
 </>
    
  )
}

export default Conversation