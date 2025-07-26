import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setselecteduser, setuserdata } from '../redux/userslice';
import { serverurl } from '../main';

const Login = () => {
  const navigate = useNavigate();
  const [show,setshow] = useState(false);
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [err,seterr]=useState("");
  const dispatch=useDispatch();
  const {selecteduser} = useSelector(state=>state.user)
  const handlelogin=async(e)=>{
    try{
e.preventDefault();
    const result = await axios.post(`${serverurl}/login`,{
      email,
      password
    },{withCredentials:true});
console.log(result);

dispatch(setuserdata(result.data))
dispatch(setselecteduser(null))
navigate("/")
setemail("")
setpassword("")
    }catch(err){
      console.log(err)
      seterr(err.response.data.message)
    }
    
  }
  return (
  <div className='w-full h-[100vh] bg-gray-600 flex justify-center items-center'>
        <div className='w-full max-w-[500px] h-[500px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[30px]'>
          <div className='w-full h-[200px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col justify-center items-center'>
            <h1 className=' font-bold text-[30px]'>LOGIN TO <span className='text-white'>TALKY</span></h1>
          </div>
                  <form className='w-full flex flex-col gap-[20px] items-center' onSubmit={handlelogin}>
          
          <input type="text" placeholder='email' className='w-[90%] h-[60px] outline-none border-2 border-black px-[20px] py-[10px] bg-white rounded-lg shadow-gray-400 shadow-lg'
          onChange={(e)=>setemail(e.target.value)} value={email}/>
          <div className='w-[90%] h-[50px] border-2 border-black overflow-hidden rounded-lg  shadow-gray-400 shadow-lg relative'>
            <input type={`${show?"text":"password"}`} placeholder='password' className='w-full h-full outline-none  px-[20px] py-[10px] bg-white shadow-gray-400 shadow-lg'
            onChange={(e)=>setpassword(e.target.value)} value={password}/>
            <span className='absolute text-black right-[15px] top-[10px] font-semibold' onClick={()=>setshow(prev=>!prev)}>{`${show?"hidden":"show"}`}</span>
          </div>
          {err && <p className='text-red-500'>{err}</p>}
          <button className='px-[40px] py-[10px] bg-[aqua] rounded-lg shadow-gray-400 shadow-lg w-[200px] mt-[20px] hover:shadow-inner'><span className='font-bold text-[20px] '>Login</span></button>
          <h3 className='font-bold' onClick={()=>navigate("/signup")}>if you dont have account then go to <span className='text-[aqua] text-[20px]'>
            Signup</span></h3>
        </form>
        </div>

    </div>
  )
}

export default Login