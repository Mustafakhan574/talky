import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setotherusers, setuserdata } from '../redux/userslice'
import { serverurl } from '../main'
import { setmessages } from '../redux/messageslice'
const Getmessages = () => {
          const dispatch = useDispatch()
const {userData,selecteduser} = useSelector(state=>state.user)
         
  useEffect(()=>{
          if (!selecteduser?._id) return 
 const fetchmessages=async()=>{
                    try{
    let result = await axios.get(`${serverurl}/get/${selecteduser._id}`,{
          withCredentials:true
    })
    dispatch(setmessages(result.data))
                    }catch(err){
     console.log(err)
                    }
          }
          fetchmessages()
  },[selecteduser,userData])
}

export default Getmessages