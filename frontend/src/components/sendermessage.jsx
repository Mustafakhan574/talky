import React from 'react'
import dp from "../assets/dp.png"
import { useRef } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
const Sendermessage = ({image,message}) => {
  const scroll = useRef()
  const {userData} = useSelector(state=>state.user)
  useEffect(()=>{
scroll.current.scrollIntoView({behavior:"smooth"})
  },[message,image])
  
  return (
    <div className='w-fit max-w-[90%]  md:max-w-[500px] px-[20px]  py-[20px] bg-[aqua] text-[19px] ml-auto rounded-2xl rounded-tr-none relative right-0  mr-[30px] shadow-[#000000a1] shadow-lg gap-[15px] flex flex-col'ref={scroll}>
           <div className='w-[40px] h-[40px] rounded-full overflow-hidden  flex justify-center items-center shadow-gray-500 shadow-lg absolute top-[0] right-[-50px] ' onClick={()=>navigate("/profile")}>
           <img src={userData.image || dp} alt="" className='h-[100%]'/>
           </div>
      {image && <img src={image} alt="" className='w-[100px] rounded-lg ' /> }
      {message &&<span>{message}</span> }    
          </div>
  )
}

export default Sendermessage