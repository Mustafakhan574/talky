import React, { useEffect, useRef, useState } from 'react'
import dp from "../assets/dp.png"
import { CiCamera } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { FaBackward } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
import { serverurl } from '../main';
import { setuserdata } from '../redux/userslice';
const Profile = () => {
    const {userData} = useSelector(state=>state.user)
    const [username,setusername] = useState(userData.username || "");
    const navigate = useNavigate()
    const [frontendimage,setfrontendimage]=useState(userData.image || dp)
    const [backendimage,setbackendimage]=useState(null)
    const dispatch = useDispatch()
    let image = useRef()
    const [saving,setsaving]=useState(false);


    useEffect(() => {
    if (userData) {
      setusername(userData.username || " ");
      setfrontendimage(userData.image || dp);
    }
  }, [userData]);
    const handleimage=(e)=>{
     const file = e.target.files[0]
     setbackendimage(file);
     setfrontendimage(URL.createObjectURL(file))
    }
    
    const handleprofile=async(e)=>{  
  e.preventDefault();
  setsaving(true)
  try{
    const formData = new FormData()
    formData.append("username",username)
    if(backendimage){
      formData.append("image",backendimage);
    }
    const result = await axios.put(`${serverurl}/profile`,formData,{
      withCredentials:true
    })
    setsaving(false)
    dispatch(setuserdata(result.data))
    navigate("/")
  }catch(err){
  console.log(err)
  setsaving(false)
  }
    }
  return (
    <div className='w-full h-[100vh] bg-slate-200 flex flex-col justify-center items-center gap-[20px]'>
          <div className='fixed top-0 left-[5px]
          ' >
  <FaBackward className='font-bold h-[35px] w-[35px]' onClick={()=>navigate("/")}/>
          </div>
    <div className='w-[200px] h-[200px] bg-white rounded-full border-2 border-[#20c7ff] shadow-gray-400 shadow-lg  relative'  onClick={()=>image.current.click()}>
          <div className='w-[100%] h-[100%] overflow-hidden rounded-full flex justify-center items-center'>
     <img src={frontendimage} alt="" className='h-[100%]'/>
     </div>
     <CiCamera className='absolute w-[35px] h-[35px] bottom-10 right-0 text-white font-bold'/>
    </div>
    <form className='w-full flex flex-col gap-[20px] items-center' onSubmit={handleprofile}>
      <input type="file" accept='image/*' hidden ref={image} onChange={handleimage}/>
        
<input type="text"  placeholder='change username' className='w-[90%] h-[60px] outline-none border-2 border-black px-[20px] py-[10px] bg-white rounded-lg shadow-gray-400 shadow-lg text-gray-400' value={username} onChange={(e)=>setusername(e.target.value)}/> 
        <input type="text" placeholder='email' className='w-[90%] h-[60px] outline-none border-2 border-black px-[20px] py-[10px] bg-white rounded-lg shadow-gray-400 shadow-lg text-gray-400'value={userData.email} readOnly/>  
         <button className='px-[40px] py-[10px] bg-[aqua] rounded-lg shadow-gray-400 shadow-lg w-[200px] mt-[20px] hover:shadow-inner'disabled
         ={saving}>{saving?"Saving...":"Save Profile"}</button>
    </form>
    </div>
  )
}

export default Profile