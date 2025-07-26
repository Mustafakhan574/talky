import React from 'react'
import Sidebar from '../components/sidebar'
import Message from '../components/message'
import Getmessages from '../custonhooks/getmessages'

const Home = () => {
  Getmessages();
  return (
    <div className='w-full h-[100vh] flex overflow-hidden'>
      <Sidebar/>
      <Message/>
    </div>
  )
}

export default Home