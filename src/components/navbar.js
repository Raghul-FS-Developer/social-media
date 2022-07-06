import '../styles/navbar.css';
import axios from 'axios';
import { useState ,useEffect} from 'react';
import {AiOutlineSearch } from 'react-icons/ai';
import {BsFillPersonFill ,BsFillChatLeftDotsFill} from 'react-icons/bs';
import {IoMdNotifications} from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import {GiPartyPopper} from 'react-icons/gi'
import db from '../db';

function Navbar({}){

    const[user1,setUser1]=useState()

    useEffect(()=>{
        let getData=async()=>{
          let res = await axios.get(`${db}getauser/${currentUser}`)    
          setUser1(res.data.data)
        }
        getData() 
        },[])


    const myStorage = window.localStorage
    const navigate = useNavigate();
    const currentUser = myStorage.getItem('user');

    let handlenav=async()=>{
        navigate(`/profile/${currentUser}`)
     }

     const handlelogout=()=>{
         myStorage.removeItem('user')
         myStorage.removeItem('userId')
         window.location.reload()
     }
    return (
        <>
        <div className='topbarContainer'>
            <div className='topbarLeft'>
                <span className='logo' onClick={()=>navigate('/')}>Fun<GiPartyPopper/>Zone</span>
            </div>
            <div className='topbarCenter'>
                <div className='searchbar'>
                    <AiOutlineSearch className='searchIcon' />
                    <input placeholder='search a post'className='searchInput'/>
                </div>
            </div>
            <div className='topbarRight'>
                <div className='topbarlinks'>
                    <span className='topbarLink' onClick={()=>navigate('/')}>Home</span>
                    <span className='topbarLink' onClick={handlelogout}>Logout</span>
                </div>
                <div className='topbarIcons'>
                    <div className='topbarIconItem'>
                    <BsFillPersonFill size={25}/>
                    {/* <span className='topbarIconBadge'>1</span> */}
                    </div>
                    <div className='topbarIconItem' onClick={()=>navigate('/chat')}>
                    <BsFillChatLeftDotsFill size={20} style={{paddingTop:'5px'}} />
                    {/* <span className='topbarIconBadge'>2</span> */}
                    </div>
                    <div className='topbarIconItem'>
                    <IoMdNotifications size={25}/>
                    {/* <span className='topbarIconBadge'>2</span> */}
                    </div>
                </div>
                <img src={user1 ? user1 :"https://globalcenters.columbia.edu/themes/custom/columbia/assets/img/people-default.svg"} alt='profile' onClick={handlenav} className='topbarImg'/>
            </div>
        </div>
        </>
    )
}


export default Navbar