import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setuserdata } from '../redux/userslice'
import { serverurl } from '../main'


const Getcuruser = () => {
          const dispatch = useDispatch()
          const {userData} = useSelector(state=>state.user)
          
  useEffect(()=>{
 const fetchuser=async()=>{
                    try{
    let result = await axios.get(`${serverurl}/current`,{
          withCredentials:true
    })
    dispatch(setuserdata(result.data))
                    }catch(err){
     console.log(err)
                    }
          }
          fetchuser()
  },[])
}

export default Getcuruser