import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoSearchSharp } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { SlLogout } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';
import axios from "axios"

import dp from "../assets/dp.png"
import { serverurl } from '../main';
import { setotherusers, setsearchdata, setselecteduser, setuserdata } from '../redux/userslice';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userData, otherusers, selecteduser, onlineusers, searchdata } = useSelector(state => state.user);
  const [search, setsearch] = useState(false);
  const [input, setinput] = useState("");

  const handleLogout = async () => {
    try {
      await axios.get(`${serverurl}/logout`, { withCredentials: true });
      dispatch(setuserdata(null));
      dispatch(setotherusers(null));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = async () => {
    try {
      const result = await axios.get(`${serverurl}/search?query=${input}`, { withCredentials: true });
      dispatch(setsearchdata(result.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (input) handleSearch();
  }, [input]);

  return (
    <div className={`lg:w-[30%] w-full h-full bg-slate-200 overflow-hidden ${!selecteduser ? "block" : "hidden"} lg:block`}>

      {/* Logout Button */}
      <div className='fixed bg-white left-1 w-[60px] h-[60px]  rounded-full shadow-lg flex justify-center items-center text-xl cursor-pointer '>
        <SlLogout onClick={handleLogout}   />
      </div>

      {/* Header */}
      <div className='w-full h-[300px] bg-[#20c7ff] rounded-b-[30%] shadow-lg flex flex-col justify-center px-6 text-black'>
        <h1 className='font-bold text-3xl text-center'>TALKY</h1>
        <div className='flex justify-between items-center mt-2'>
          <h2 className='text-xl font-bold'>Hi, {userData.username || "User"}</h2>
          <div
            className='w-[60px] h-[60px] bg-white rounded-full overflow-hidden shadow-md cursor-pointer'
            onClick={() => navigate("/profile")}
          >
            <img src={userData.image || dp} alt="profile" className='w-full h-full object-cover' />
          </div>
        </div>

        {/* Search Bar / Icons */}
        <div className='flex items-center gap-4 mt-5'>
          {!search ? (
            <div
              className='w-[60px] h-[60px] bg-white rounded-full shadow-md flex justify-center items-center text-xl cursor-pointer'
              onClick={() => setsearch(true)}
            >
              <IoSearchSharp />
            </div>
          ) : (
            <form className='relative w-full'>
              <div className='w-full h-[60px] bg-white rounded-full shadow-md flex items-center px-5 gap-4'>
                <IoSearchSharp className='text-xl' />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setinput(e.target.value)}
                  placeholder='Search users...'
                  className='w-full text-lg outline-none'
                />
                <RxCross1
                  className='text-xl cursor-pointer'
                  onClick={() => {
                    setsearch(false);
                    setinput("");
                  }}
                />
              </div>

              {/* Search Results */}
<div className='absolute w-full max-h-[300px] bg-white mt-2 rounded-lg shadow-lg overflow-y-auto z-10'>
{searchdata?.map(user => (
<div key={user._id} className='flex items-center gap-4 p-3 hover:bg-gray-200 cursor-pointer'
onClick={() => dispatch(setselecteduser(user))}
                  >
                    <div className='w-[50px] h-[50px] rounded-full overflow-hidden shadow-md relative'>
                      <img src={user.image || dp} alt="user" className='w-full h-full object-cover' />
                      {onlineusers?.includes(user._id) && (
                        <span className='absolute bottom-1 right-1 w-[10px] h-[10px] rounded-full bg-green-400'></span>
                      )}
                    </div>
                    <span className='font-semibold text-gray-800'>{user.username || "User"}</span>
                  </div>
                ))}
              </div>
            </form>
          )}

          {/* Online User Circles */}
          {!search && (
            <div className='flex items-center gap-3 overflow-x-auto max-w-full py-2'>
              {otherusers?.map(user => (
                onlineusers?.includes(user._id) && (
                  <div
                    key={user._id}
                    className='w-[60px] h-[60px] rounded-full overflow-hidden shadow-md relative cursor-pointer'
                    onClick={() => navigate("/profile")}
                  >
                    <img src={user.image || dp} alt="user" className='w-full h-full object-cover' />
                    <span className='absolute bottom-1 right-1 w-[10px] h-[10px] rounded-full bg-green-400'></span>
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      </div>

      {/* All Users */}
      <div className='w-full h-[50vh] overflow-y-auto flex flex-col gap-4 mt-6 px-4 '>
        
        {otherusers?.map((user)=>{
          return (
<div
            key={user._id}
            className='flex items-center gap-4 p-3 bg-white rounded-full shadow-md hover:bg-gray-200 cursor-pointer'
            onClick={() => dispatch(setselecteduser(user))}
          >
            <div className='w-[60px] h-[60px] rounded-full overflow-hidden shadow-md relative'>

              <img src={user.image || dp} alt="user" className='w-full h-full object-cover bg-red' />
              {onlineusers?.includes(user._id) && (
                <span className='absolute bottom-1 right-1 w-[10px] h-[10px] rounded-full bg-green-400'></span>
              )}
            </div>
            <span className='font-semibold'>{user.username || "User"}</span>
          </div>
          )
        })}
        
      </div>
    </div>
  );
};

export default Sidebar;
