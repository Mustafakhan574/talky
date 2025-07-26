import { createSlice } from "@reduxjs/toolkit";


const messageSlice = createSlice({
     name:"message",
     initialState:{
          messages:[],
     },
     reducers:{
          setmessages:(state,action)=>{
                    state.messages = action.payload
                    
          },
          setaddmessages: (state, action) => {
  // Handle both formats:
  const message = action.payload.newmessage || action.payload;
  state.messages.push(message);
  console.log(action.payload)
},
     }
})
export const {setmessages,setaddmessages} = messageSlice.actions;
export default messageSlice.reducer