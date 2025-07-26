import './App.css'
import { Routes ,Route, Navigate} from 'react-router-dom'
import {io} from "socket.io-client"
import Signup from './pages/signup'
import Login from './pages/login'
import Getcuruser from './custonhooks/getcuruser';
import { useDispatch, useSelector } from 'react-redux';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Getotherusers from './custonhooks/getotherusers';
import { useEffect } from 'react';
import { serverurl } from './main'
import { setonlineusers, setsocket } from './redux/userslice'
function App() {
  Getcuruser()
  Getotherusers()
  const {userData,socket,onlineusers} = useSelector(state=>state.user)
  const dispatch = useDispatch()
  useEffect(()=>{
    if(userData){
const socketio = io(`${serverurl}`,{
    query:{
      userId : userData?._id
    }
  })
  dispatch(setsocket(socketio))
  socketio.on("getonlineusers",(users)=>{
dispatch(setonlineusers(users))
  })
   return ()=>socketio.close()
    }else{
      if(socket){
        socket.close()
        dispatch(setsocket(null))
      }
    }
  },[userData])
  return (
    <>
    
      <Routes>
      <Route path='/signup' element={!userData?<Signup/>:<Navigate to="/"/>}/>
      <Route path='/' element={userData?<Home/>:< Navigate to="/Login"/>}/>
      <Route path='/login' element={!userData?<Login/>:<Navigate to="/"/>}/>
      <Route path='/Profile' element={userData?<Profile/>:< Navigate to="/Signup"/>}/>
      </Routes>
    </>
  )
}

export default App
