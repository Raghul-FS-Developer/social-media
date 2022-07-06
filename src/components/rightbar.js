import React, { useEffect, useState } from "react";
import "../styles/rightbar.css";
import birthday from '../img/birthday.png'
import axios from "axios";
import db from "../db";
import { IoIosPersonAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import adsr from '../img/adsr.jpg'
function Rightbar({ user }) {
  const myStorage = window.localStorage;
  const currentUser = myStorage.getItem("user");
  const currentUserId = myStorage.getItem('userId')
  let navigate = useNavigate();

 

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img
            className="birthdayImg"
            src={birthday}
            alt="birthday img"
          />
          <span className="birthdayText">
            {" "}
            <b>Praveen</b> and <b>5 other friends</b> have birthday today
          </span>
        </div>
        <div className="birthday2">
        <img className="rightbarAd" src={adsr}/>
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          <span className="online">No one is online</span>
        </ul>
        </div>
      </>
    );
  };
const ProfileRight = () => {


  const userId = user._id;

  const handlenav =  (username) => {
  
  navigate(`/profile/${username}`);
  window.location.reload()  
  
  };

    const [friends ,setFriends] = useState("");
    const [followed ,setFollowed] = useState(false)
    
    useEffect(()=>{
  
      let step = user?.followers?.map(e => e == currentUserId)
      const step2 = step?.some(e=> e == true)
    
      if(step2 == true){
    
        setFollowed(true)
      }else{
        setFollowed(false)
      }
      },[]) 
      
    useEffect(() => {
      getData();
    }, []);

    const getData = async () => {
      try {
        let res = await axios.get(`${db}friends/${userId}`);
      
        if (res.data.statuscode === 200) {
          setFriends(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const handleFollow=async(e)=>{
      e.preventDefault()

      let res = await axios.put(`${db}${currentUserId}/follow`,{userId:userId})

      if(res.data.statuscode === 200){
      setFollowed(prev=>!prev)
      }
    }
    const handleUnFollow=async(e)=>{
      e.preventDefault()

      let res = await axios.put(`${db}${currentUserId}/unfollow`,{userId:userId})

      if(res.data.statuscode === 200){
        setFollowed(prev=>!prev)
        }

    }

    const handleConv =async(id)=>{
      try {
       const res = await axios.post(`${db}newconv`,{senderId:currentUserId ,receiverId:id})

       if(res.data.statuscode === 200){
           navigate('/chat')
          //  window.location.reload()
       }else if(res.data.statuscode === 201){
        navigate('/chat')
       }
      } catch (error) {
        console.log(error)
      }
}
    return (
      <>
        <div className="rightbarHead">
        {user.username !== currentUser && (
          <div className="bunchs">
          <>
          {followed ?         
           <button onClick={handleUnFollow} className="btn right">
            <IoIosPersonAdd size={17} style={{ marginRight: "5px" }} />UnFollow</button>:
              <button className="btn right" onClick={handleFollow}>
              <IoIosPersonAdd size={17} style={{ marginRight: "5px" }} />Follow</button>
          }
          </>
          <>
          <button className="btn message" onClick={()=>handleConv(user._id)}>Message</button>
          </>
          </div>
        )}
         <h4 className="rightbarTitles">User Information</h4>
          <div className="rightbarInfo">
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">City:</span>
              <span className="rightbarInfoKey">{user.city}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">From:</span>
              <span className="rightbarInfoKey">{user.from}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Relationship:</span>
              <span className="rightbarInfoKey">{user.relationship}</span>
            </div>
          </div>
       <h4 className="rightbarTitles">User Friends</h4>
        {friends ? (
          <>
            <div className="rightbarFollowings">
              {friends.map((e, i) => {
                return (
                  <>
                    <div className="rightbarFollowing" key={i}>
                      <img
                        onClick={() => handlenav(e.username)}
                        src={
                          e.profilepicture
                            ? e.profilepicture
                            : "https://globalcenters.columbia.edu/themes/custom/columbia/assets/img/people-default.svg"
                        }
                        className="rightbarFollowingImg"
                      />
                      <span className="rightbarFollowingName">
                        {e.username}
                      </span>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        ) : (
          <div className="logos">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" />
          </div>
        )}
      </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRight /> : <HomeRightbar />}
      </div>
    </div>
  );
}

export default Rightbar;
