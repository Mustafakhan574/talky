const uploadoncloudinary = require("../config/cloudinary");
const Conversation = require("../models/conversation");
const Message  = require("../models/message");
const {io, getreceiversocketid } = require("../socket/socket");

exports.sendmessage=async(req,res)=>{
          try{
                console.log("=== sendmessage called ===");
    console.log("Sender:", req.userid);
    console.log("Receiver:", req.params.receiver);
    console.log("Body:", req.body);
    console.log("File:", req.file);

      const sender = req.userid;
      const {receiver} = req.params
      const {message} = req.body;
      if (!sender) {
      console.error("Error: req.userid is undefined");
      return res.status(401).json({ message: "Not authenticated" });
    }
      let image;
      if(req.file){
          image = await uploadoncloudinary(req.file.path)
      }
 let conver = await Conversation.findOne({
          participants:{$all:[sender,receiver]}
 })
 let newmessage = await Message.create({
          sender,receiver,message,image
 })
 if(!conver){
          conver=await Conversation.create({
          participants:[sender,receiver],
          message:[newmessage._id]
          })
 }else{
          conver.message.push(newmessage._id)
         await conver.save()
 }
  const receiversocketid = getreceiversocketid(receiver)
  if(receiversocketid){
        io.to(receiversocketid).emit("newmessage",newmessage)
  }
 return res.status(201).json({newmessage})
          }catch(err){
  return res.status(500).json({message:"send mes error"})
          }

}
exports.getmessage=async(req,res)=>{
          try{
const sender = req.userid;
      const {receiver} = req.params
  let conver = await Conversation.findOne({
          participants:{$all:[sender,receiver]}
  }).populate("message")
  if(!conver){
          return res.status(400).json({message:"covrn not found"})
  }
  return res.status(200).json(conver?.message)
          }catch(err){
return res.status(500).json({message:"get mes error",err})
          }
}