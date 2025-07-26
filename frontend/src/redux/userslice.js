import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
          name:"user",
          initialState:{
                    userData:null,
                    otherusers:null,
                    selecteduser:null,
                    socket:null,
                    onlineusers:null,
                    searchdata:null,
          },
          reducers:{
                  setuserdata:(state,action)=>{
             state.userData = action.payload
                  },
                  setotherusers: (state,action)=>{
             state.otherusers = action.payload
                  } ,
     setselecteduser:(state,action)=>{
      state.selecteduser = action.payload
                  },
setsocket:(state,action)=>{
      state.socket = action.payload
                  },
setonlineusers:(state,action)=>{
      state.onlineusers = action.payload
                  },
     setsearchdata:(state,action)=>{
      state.searchdata = action.payload
                  }             
          }
})
export const {setuserdata,setotherusers,setselecteduser,setsocket,setonlineusers,setsearchdata} = userSlice.actions;
export default userSlice.reducer