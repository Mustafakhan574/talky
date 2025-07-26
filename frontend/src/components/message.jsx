// import React, { useEffect, useRef } from 'react'
// import axios from 'axios'; // Add this at the top

// import EmojiPicker from 'emoji-picker-react';
// import { serverurl } from '../main';
// import { FaBackward } from "react-icons/fa";
// import { BsEmojiSmile } from "react-icons/bs";
// import { IoSendOutline } from "react-icons/io5";
// import dp from "../assets/dp.png"
// import { RiChatSmile2Line } from "react-icons/ri";
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { FaImages } from "react-icons/fa";
// import { setselecteduser } from '../redux/userslice';
// import { useState } from 'react';
// import Sendermessage from './sendermessage';
// import Receivermessage from './receivermessage';
// import { setaddmessages, setmessages } from '../redux/messageslice';
// const Message = () => {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const image = useRef();
//   const [showpicker,setshowpicker]=useState(false)
//   const [sendimage,setsendimage]=useState(null)
//   const [receiveimage,setreceiveimage]=useState(null)
//   const {selecteduser,userData,socket}=useSelector(state=>state.user)
//   const {messages} = useSelector(state=>state.message)
//   console.log("Redux state messages:", messages);

//   const [input,setinput]=useState("")
  
//   const handleimage=(e)=>{
//   const file = e.target.files[0]
//   setsendimage(file)
//   setreceiveimage(URL.createObjectURL(file))
//   }
//   const onemojiclick=(emojidata)=>{
//     setinput(previnput=>previnput+emojidata.emoji)
//     setshowpicker(false)
//   }
//   const handlesendmessage=async(e)=>{
    
//     e.preventDefault();
//     try{
//       const formData = new FormData()
//       formData.append("message",input)
//       if(sendimage){
//         formData.append("image",sendimage)
//       }
//    const result = await axios.post(`${serverurl}/send/${selecteduser._id}`,formData,{withCredentials:true})
//    console.log("Sent result.data:", result.data);

//    dispatch(setaddmessages(result.data));

//    setinput("");
// setsendimage(null);
// setreceiveimage(null);

//     }catch(err){
// console.log(err)
//     }
//   }
//   useEffect(()=>{
//     if(!socket) return
//     const handlenewmessage=(mess)=>{
//       console.log("Received new message from socket:", mess);
//    dispatch(setaddmessages(mess));
//     };
//   socket.on("newmessage",handlenewmessage)
  
//   return ()=>{socket.off("newmessage",handlenewmessage)};
//   },[socket,dispatch]);

//   return (
    
//     <div className={`lg:w-[100%] ${selecteduser?"flex":"hidden"} lg:flex w-full h-full bg-slate-400 border-l-2 border-black-400`}>
//       {selecteduser &&
//       <div className='w-full h-[100vh] flex flex-col'>
//        <div className=' w-full h-[100px] bg-[#20c7ff] rounded-b-[30px] shadow-gray-400 shadow-lg flex  items-center  px-[20px] gap-[20px]'>
       
//   <div onClick={()=>dispatch(setselecteduser(null))}>
//   <FaBackward className='font-semibold h-[35px] w-[35px]'/>
//   </div>
//   <div className='w-[60px] h-[60px] rounded-full overflow-hidden  flex justify-center items-center shadow-gray-500 shadow-lg'>
//        <img src={selecteduser?.image || dp} alt="" className='h-[100%]'/>
//        </div>
//        <h1 className='font-semibold'>{ selecteduser?.username||"user"}</h1>
//   </div>
//   <div className='w-full h-[550px] flex flex-col pt-[30px] overflow-auto gap-[20px]'>
//   {showpicker && <div className='absolute bottom-[100px] left-[20px]'>
//     <EmojiPicker width={250} height={350} onEmojiClick={onemojiclick}/></div>}
//   {messages && messages.map((mess, index) =>
//   mess.sender === userData._id
//     ? <Sendermessage key={index} image={mess.image} message={mess.message} />
//     : <Receivermessage key={index} image={mess.image} message={mess.message} />
// )}

    
//   </div>
//   </div>}
// {!selecteduser && <div className='w-full h-full flex flex-col justify-center items-center bg-aqua '><h1 className='font-bold text-[70px]'>welcome to talky</h1>
// <div className='text-[100px] overflow-hidden outline-0 border-0 rounded-full'><RiChatSmile2Line className=' w-full text-[aqua]'/></div></div>}
// {selecteduser && <div className='w-full lg:w-[100%] h-[100px] fixed bottom-[20px] flex items-center justify-center'>
//   <img src={receiveimage} alt="" className='w-[80px] h-[40px] absolute bottom-[100%] right-[20%]'/>
// <form className='w-[95%] max-w-[70%] h-[60px] bg-[aqua] rounded-full flex items-center gap-[20px] p-[10px]'onSubmit={handlesendmessage}>
  
//   <input type="file" accept='image/*' hidden ref={image} onChange={handleimage}/>
// <div onClick={()=>setshowpicker(pre=>!pre)}>
//   <BsEmojiSmile className='w-[25px] h-[25px]' />
// </div>
// <input type="text" className='w-full h-full rounded-lg' placeholder='send messages' onChange={(e)=>setinput(e.target.value)} value={input}/>
// <div onClick={()=>image.current.click()} >
//   <FaImages className='w-[25px] h-[25px]'/>
// </div>
// <button type='submit'>
// <IoSendOutline className='w-[25px] h-[25px]'/>
// </button>
// </form>
// </div>}
//     </div>
//   )
// }

// export default Message
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import EmojiPicker from 'emoji-picker-react';
import { serverurl } from '../main';
import { FaBackward, FaImages } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";
import { IoSendOutline } from "react-icons/io5";
import { RiChatSmile2Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dp from "../assets/dp.png";
import { setselecteduser } from '../redux/userslice';
import Sendermessage from './sendermessage';
import Receivermessage from './receivermessage';
import { setaddmessages, setmessages } from '../redux/messageslice';

const Message = () => {
  // Hooks and Refs
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const imageInputRef = useRef();
  const messagesEndRef = useRef(null);
  
  // State
  const [showPicker, setShowPicker] = useState(false);
  const [sendImage, setSendImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  
  // Redux State
  const { selecteduser, userData, socket } = useSelector(state => state.user);
  const { messages } = useSelector(state => state.message);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate image size (e.g., 5MB max)
    
    
    setSendImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Handle emoji selection
  const onEmojiClick = (emojiData) => {
    setInput(prev => prev + emojiData.emoji);
    setShowPicker(false);
  };

  // Send message handler
  const handleSendMessage = async (e) => {
    e.preventDefault();
    console.log("Sending message with:", { input, sendImage });

    // Don't send empty messages
    if (!input.trim() && !sendImage) {
      console.log("No content to send");
      return;
    }
    setIsSending(true);
    
    try {
      const formData = new FormData();
      if (input) formData.append("message", input);
      if (sendImage) formData.append("image", sendImage);
      
      console.log("FormData contents:"); // Debug log
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

      const { data } = await axios.post(
        `${serverurl}/send/${selecteduser._id}`,
        formData,
        { withCredentials: true }
      );
      console.log("Server response:", data); 
      dispatch(setaddmessages(data));
      console.log("Dispatched message to Redux");
      setInput("");
      setSendImage(null);
      setImagePreview(null);
    } catch (err) {
      console.error("Failed to send message:", err);
      
    } finally {
      setIsSending(false);
    }
  };

  // Socket effect for real-time messages
  useEffect(() => {
  if (!socket) {
    console.log("Socket not available"); // Debug log
    return;
  }
  
  console.log("Setting up socket listener"); // Debug log
  
  const handleNewMessage = (message) => {
    console.log("Received new message from socket:", message); // Debug log
    if (message.sender === selecteduser?._id || message.receiver === selecteduser?._id) {
      dispatch(setaddmessages(message));
    }
  };
  
  socket.on("newmessage", handleNewMessage);
  
  return () => {
    console.log("Cleaning up socket listener"); // Debug log
    socket.off("newmessage", handleNewMessage);
  };
}, [socket, dispatch, selecteduser?._id]);

  // No selected user view
  if (!selecteduser) {
    return (
      <div className={`w-full h-full flex flex-col justify-center items-center bg-blue-50 ${!selecteduser?"hidden":"block"} lg:block`}>
        <h1 className="font-bold text-4xl md:text-7xl mb-8 text-blue-600 text-center">Welcome to Talky</h1>
        <div className="text-8xl md:text-9xl text-blue-400 flex justify-center">
          <RiChatSmile2Line />
        </div>
        <p className="mt-8 text-lg text-gray-600 text-center">Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100">
      {/* Header */}
      <div className="w-full h-16 bg-blue-500 flex items-center px-4 shadow-md">
        <button 
          onClick={() => dispatch(setselecteduser(null))}
          className="mr-4 text-white hover:bg-blue-600 p-2 rounded-full"
          aria-label="Back to contacts"
        >
          <FaBackward className="text-xl" />
        </button>
        
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
          <img 
            src={selecteduser?.image || dp} 
            alt={selecteduser?.username || "User"} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <h1 className="ml-3 text-white font-semibold text-lg">
          {selecteduser?.username || "User"}
        </h1>
      </div>
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4  bg-gray-50 flex flex-col gap-[20px]">
        {messages?.length === 0 ? (
          <div className="h-full flex flex-col justify-center items-center text-gray-400">
            <p>No messages yet</p>
            <p>Start the conversation!</p>
          </div>
        ) : (
          messages?.map((message) => (
            message.sender === userData._id ? (
              <Sendermessage 
                key={message._id || message.timestamp} 
                image={message.image} 
                message={message.message} 
                timestamp={message.createdAt}
              />
            ) : (
              <Receivermessage 
                key={message._id || message.timestamp}
                image={message.image} 
                message={message.message} 
                timestamp={message.createdAt}
                senderImage={selecteduser.image}
              />
            )
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Emoji Picker */}
      {showPicker && (
        <div className="absolute bottom-24 left-4 z-10">
          <EmojiPicker 
            width={300} 
            height={400} 
            onEmojiClick={onEmojiClick}
            previewConfig={{ showPreview: false }}
          />
        </div>
      )}
      
      {/* Image Preview */}
      {imagePreview && (
        <div className="absolute bottom-24 right-4 bg-white p-2 rounded-lg shadow-lg border border-gray-200">
          <div className="relative">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="max-h-32 max-w-xs object-contain"
            />
            <button
              onClick={() => {
                setImagePreview(null);
                setSendImage(null);
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              aria-label="Remove image"
            >
              ×
            </button>
          </div>
        </div>
      )}
      
      {/* Input Area */}
      <div className="w-full p-4 bg-white border-t border-gray-200">
        <form 
          onSubmit={handleSendMessage}
          className="flex items-center gap-2"
        >
          {/* Emoji Button */}
          <button
            type="button"
            onClick={() => setShowPicker(!showPicker)}
            className="p-2 text-gray-500 hover:text-blue-500 rounded-full hover:bg-gray-100"
            aria-label="Toggle emoji picker"
          >
            <BsEmojiSmile className="text-2xl" />
          </button>
          
          {/* Image Upload Button */}
          <button
            type="button"
            onClick={() => imageInputRef.current.click()}
            className="p-2 text-gray-500 hover:text-blue-500 rounded-full hover:bg-gray-100"
            aria-label="Attach image"
          >
            <FaImages className="text-2xl" />
            <input
              type="file"
              accept="image/*"
              ref={imageInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </button>
          
          {/* Message Input */}
          <textarea
  value={input}
  onChange={(e) => setInput(e.target.value)}
  placeholder="Type a message..."
  rows={1}
  className="flex-1 resize-none py-2 px-4 rounded-2xl border border-gray-300 focus:outline-none focus:border-blue-500 break-words whitespace-pre-wrap"
  style={{
    fontFamily: "inherit",
    overflow: "hidden",
    lineHeight: "1.5",
    width: "25ch",
    maxWidth: "100%",
    minHeight: "40px",
    maxHeight: "150px",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
  }} // Optional character limit
/>       
          {/* Send Button */}
          <button
            type="submit"
            disabled={isSending || (!input.trim() && !sendImage)}
            className={`p-2 rounded-full ${isSending || (!input.trim() && !sendImage) ? 'text-gray-400' : 'text-blue-500 hover:bg-blue-50'}`}
            aria-label="Send message"
          >
            <IoSendOutline className="text-2xl" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Message;