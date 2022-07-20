import React,{useEffect ,useState} from 'react'
import '../styles/post.css';
import {format} from 'timeago.js'
import db from '../db';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import {AiTwotoneHeart} from 'react-icons/ai'
import {IoMdThumbsUp} from 'react-icons/io'

function Post({post}) {
    
  const myStorage = window.localStorage
  const user2 = myStorage.getItem('userId');
  
  const nav = useNavigate()

  useEffect(()=>{
    let getData=async()=>{
      let res = await axios.get(`${db}getuser?userId=${post.userId}`)
      setUser(res.data.data)
    }
    getData() 
    },[post.userId])
  
 

   const[like,setLike]=useState(post.likes.length)
   const[user,setUser]=useState({})

   const likeHandler=async(id)=>{

  let res= await axios.put(`${db}${id}/likes`,({userId:user2}))
    if(res.data.message === 'liked successfully'){
      setLike(like+1)
    }else if(res.data.message == 'disliked successfully'){
      setLike(like-1)
    }
  }
  // post delete

  const handleDelete= async(id)=>{
    let res = await axios.delete(`${db}deletepost/${id}/${user2}`)
    if(res.data.statuscode === 200){
     
   window.location.reload()
    }
  }
  const handleClick=(username)=>{
    nav(`/profile/${username}`)
    window.location.reload()
  }
  return (      
        <>

    <div className='post'>
    
      <div className='postWrapper'>
        
        <div className='postTop'>
          <div className='postTopLeft'>
            <img className='postProfileImg'  onClick={()=>handleClick(user?.username)} src={user?.profilepicture ? user?.profilepicture:"https://globalcenters.columbia.edu/themes/custom/columbia/assets/img/people-default.svg"} alt='pic'/>
            <span className='postUsername' >{user?.username}</span>
            <p className='postDate'>{format(post.createdAt)}</p>
          </div>
         {/* <div className='postTopRight'> */}
            
            <div class="dropdown-container" tabindex="-1">
    <div class="three-dots"></div>
    <div class="dropdown">
      <a > {post.userId === user2 ? <button className='newbtn' style={{cursor:'pointer'}} onClick={()=>handleDelete(post._id)}>Delete</button>:<button style={{cursor:'not-allowed'}} disabled>Delete</button>}</a>

    </div>
  {/* </div> */}
          </div>
        </div>
        <div className='postCenter'>
          <span className='postText'>{post?.disc}</span>
          <img src={post.Image} className='postImg'/>
        </div>
        <div className='postBottom'>
          <div className='postBottomLeft'>
            <IoMdThumbsUp  size={20} className="bts1" onClick={()=>likeHandler(post._id)}/>
            <AiTwotoneHeart size={20} className="bts" onClick={()=>likeHandler(post._id)}/>
            <span className='postLikeCounter'>{like} people liked it</span>
          </div>
          <div className='postBottomRight'>
            <span className='postCommentText'>{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  
  </>
  ) 
}

export default Post