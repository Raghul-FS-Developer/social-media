import React from 'react'

function Online({users}) {
  return (
    <>
     <li className='rightbarFriend'>
            <div className='rightbarProfileImgContainer'>
              <img className='rightbarProfileImg' src={users.profilePicture}/>
              <span className='rightbarOnline'></span>
            </div>
            <span className='rightbarUsername'>{users.username}</span>
          </li>
    </>
  )
}

export default Online