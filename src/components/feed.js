import React, { useEffect, useState } from 'react'
import  '../styles/feed.css'
import Post from './post'
import Share from './share'
import axios from 'axios'
import db from '../db'
function Feed({username}) {
   
  const storage = window.localStorage
 const user =  storage.getItem('user')


  useEffect(()=>{
  getData() 
  },[]);

  useEffect(()=>{
  getData() 
  },[username]);
  
  

  let getData=async()=>{
    const res = username ? await axios.get(`${db}profile/${username}`) 
     : await axios.get(`${db}timeline/${user}`)
     let step = [...res.data.data]
    setPosts(step.sort((p1,p2)=>{
      return new Date(p2.createdAt) - new Date(p1.createdAt)
    }))

   
   }
    const[posts,setPosts]=useState([])
  
    
  return (
    <div className='feedbar'>
      <div className='feedWrapper'>

        {username === user && <Share/> || !username && <Share/>} 
        
        
        {posts.map((p)=>(
          
          <Post key={p._id} post={p}/>
        ))}        
        
      </div>
    </div>
  )
}

export default Feed