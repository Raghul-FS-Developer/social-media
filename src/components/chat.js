import '../styles/chat.css'
import {format} from 'timeago.js'
import axios from 'axios'
import db from '../db'
import {useEffect ,useState} from 'react'

function Chat({message,own}) {

  
  const myStorage = window.localStorage
  const user = myStorage.getItem('user')
  const[pic ,setPic] =useState()

  
  useEffect(()=>{
  const pic = async()=>{
  try{
    if(own){
   let res = await axios.get(`${db}getauser/${user}`)
    setPic(res.data.data)
    }else{
      let res = await axios.get(`${db}getpic/${message.sender}`)
    setPic(res.data.data)
    }
    }catch(err){
      console.log(err)
   }
  } 
    pic()
  },[message])

  return (
    <div className={own ? 'chat own' :"chat" }>
        <div className='chatTop'>
            <img className='chatImg' src={pic? pic : 'https://globalcenters.columbia.edu/themes/custom/columbia/assets/img/people-default.svg'}/>
        <p className='chatText'>{message.text}<div className='chatBottom'>{format(message.createdAt)}:)</div></p>
        </div>
    </div>
  )
}

export default Chat