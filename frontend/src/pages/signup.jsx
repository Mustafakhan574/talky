import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setuserdata } from '../redux/userslice';
import { serverurl } from '../main';
const Signup = () => {
  const navigate = useNavigate();
  const [show,setshow] = useState(false);
  const [username,setusername] = useState("");
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");
  const [err,seterr]=useState("");
  const dispatch = useDispatch()
  
  const handlesignup=async(e)=>{
    e.preventDefault();
    try{
const result = await axios.post(`${serverurl}/signup`,{
  username,
  email,
  password,
},{withCredentials:true});
dispatch(setuserdata(result.data))
navigate("/")
console.log(result)
seterr("");
setusername("")
setemail("")
setpassword("")
    }catch(err){
 console.log(err)
 seterr(err?.response?.data?.message)
    }
  }
  return (
  <div className='w-full h-[100vh] bg-gray-600 flex justify-center items-center'>
        <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[30px]'>
          <div className='w-full h-[200px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col justify-center items-center'>
            <h1 className=' font-bold text-[30px]'>WELCOME TO <span className='text-white'>TALKY</span></h1>
          </div>
                  <form  onSubmit={handlesignup}className='w-full flex flex-col gap-[20px] items-center'>
          <input type="text" placeholder='username' className='w-[90%] h-[60px] outline-none border-2 border-black px-[20px] py-[10px] bg-white rounded-lg shadow-gray-400 shadow-lg' onChange={(e)=>setusername(e.target.value)} value={username}/>
          <input type="text" placeholder='email' className='w-[90%] h-[60px] outline-none border-2 border-black px-[20px] py-[10px] bg-white rounded-lg shadow-gray-400 shadow-lg'
          onChange={(e)=>setemail(e.target.value)} value={email}/>
          <div className='w-[90%] h-[50px] border-2 border-black overflow-hidden rounded-lg  shadow-gray-400 shadow-lg relative'>
            <input type={`${show?"text":"password"}`} placeholder='password' className='w-full h-full outline-none  px-[20px] py-[10px] bg-white shadow-gray-400 shadow-lg' 
            onChange={(e)=>setpassword(e.target.value)} value={password}/>
            <span className='absolute text-black right-[15px] top-[10px] font-semibold' onClick={()=>setshow(prev=>!prev)}>{`${show?"hidden":"show"}`}</span>
          </div>
          {err && <p className='text-red-500'>{err}</p>}
          <button className='px-[40px] py-[10px] bg-[aqua] rounded-lg shadow-gray-400 shadow-lg w-[200px] mt-[20px] hover:shadow-inner'><span className='font-bold text-[20px] '>Signup</span></button>
          <p onClick={()=>navigate("/login")}>Already have an account?<span className='font-bold text-[aqua]'>Login</span></p>
        </form>
        </div>

    </div>
  )
}

export default Signup