import React, { useEffect, useState, useRef} from 'react'
import '../styles/message.css'
import Conversation from './conversation'
import Navbar from  './navbar'
import Chat from './chat'
// import Chatonline from './chatonline'
import axios from 'axios'
import db from '../db'
import {io} from 'socket.io-client'
function Message() {

const[conversation ,setConversation] = useState([])  
const[currentChat ,setCurrentChat] = useState(null)
const[message ,setMessage] = useState([])

const[newMessage, setNewMessage] = useState("")
const[arrivalMessage, setArrivalMessage] = useState(null)

const socket= useRef()
const scrollRef =useRef()
const myStorage = window.localStorage
const userId = myStorage.getItem('userId')
   


useEffect(()=>{
    socket.current = io("https://socket-io-back.herokuapp.com");
    socket.current.on("getMessage",data => {
      
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
      })
      
    })
},[])

  useEffect(()=>{
  
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
    setMessage((prev) => [...prev,arrivalMessage])
  
  },[arrivalMessage, currentChat])

  useEffect(()=>{
    const getConversation = async()=>{
      try{
        const res = await axios.get(`${db}getConv/${userId}`)
       setConversation(res.data.data)
      }catch(err){
        console.log(err)
      
      }
    }
    getConversation()
  },[userId])



 useEffect(()=>{
   const getMessage = async () =>{
     try{
     const res = await axios.get(`${db}getmsg/${currentChat?._id}`)

     setMessage(res.data.data)
     }catch(err){
       console.log(err)
     }
   }
   getMessage()
 },[currentChat])

 
  const handleSubmit = async() =>{

    const messages = {
      sender:userId,
      text: newMessage,
      conversationId:currentChat._id
    }
    
    const receiverId = currentChat.members.find(member => member !== userId )

    socket.current.emit("sendMessage",{
      senderId:userId,
      receiverId,
      text:newMessage
    })

    try {
      let res = await axios.post(`${db}newMsg`,{sender:messages.sender,text:messages.text,conversationId:messages.conversationId})
      setMessage([...message,res.data.data])
      setNewMessage('')
    } catch (error) {
      console.log(error)
    }
  }
   
  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:'smooth'})
   },[message])

  useEffect(()=>{
    socket.current.emit('addUser',userId);
    // socket.current.on("getUsers",(users)=>{
    //   setOnlineUsers(user.followings.filter((f) => users.some((u)=> u.userId === f)))
    // console.log(users)
    //     })
  },[userId])

  

  return (
    <>
    <Navbar/>
    <div className='messenger'>
    <div className='chatMenu'>
      <div className='chatMenuWrapper'>
        <input placeholder='search for friends' className='chatMenuInput'/>
      
      {conversation.map((c)=>(
        <div onClick={()=>setCurrentChat(c)}>
        <Conversation key={c._id} conversation={c} currentUser={userId}/>
        </div>
      ))}
       </div>
      </div>
    <div className='chatBox'>
      <div className='chatBoxWrapper'>
        {
          currentChat ?
          <>
        <div className='chatBoxTop'>
          {message.map(m=>(
            <div ref={scrollRef}>
            <Chat message={m} own={m?.sender === userId} />
            </div>
          ))}
         

        </div>
        <div className='chatBoxBottom'>
          <textarea className='chatMessageInput' placeholder='write something...' onChange={(e)=>setNewMessage(e.target.value)} value={newMessage}></textarea>
          <button className='chatSubmitButton' onClick={handleSubmit}>Send</button>
        </div></> :<span style={{color:'gray', textAlign:"center",marginTop:'50px'}}>open a conversation to start a chat</span>}
      </div>
      </div>
    <div className='chatOnline'>

        <img className='onlineImg' src="https://cdn.dribbble.com/users/618197/screenshots/3056869/output_t6mcwr.gif"/>
        <hr className='imgHr'/>
       <img className='onlineImg2' src="https://tl360.b-cdn.net/wp-content/uploads/2019/09/Different-chatting-apps.jpg"/>

      </div>

    </div>
    </>
  )
}

export default Message