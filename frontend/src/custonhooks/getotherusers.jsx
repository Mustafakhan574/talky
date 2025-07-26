import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setotherusers, setuserdata } from '../redux/userslice'
import { serverurl } from '../main'
const Getotherusers = () => {
          const dispatch = useDispatch()
const {userData} = useSelector(state=>state.user)
          
  useEffect(()=>{
 const fetchuser=async()=>{
                    try{
                      console.log("Fetching other users, userData:", userData);

    let result = await axios.get(`${serverurl}/others`,{
          withCredentials:true
    })
    dispatch(setotherusers(result.data))
                    }
     catch (err) {
  if (err.response) {
    console.error("Error fetching other users:", err.response.status, err.response.data);
  } else {
    console.error("Error fetching other users:", err.message);
  }
}

                    
          }
          fetchuser()
  },[userData])
}

export default Getotherusers