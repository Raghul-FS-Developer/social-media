import React from 'react'
import '../styles/home.css'
import Feed from './feed'
import Rightbar from './rightbar'
import Sidebar from './sidebar'
import Navbar from './navbar'

function Home() {
  return (
    <>
    <Navbar/> 
    <div className='homecontainer'>
    <Sidebar/>
    <Feed/>
    <Rightbar/>
    </div>
    </>
  )
}

export default Home