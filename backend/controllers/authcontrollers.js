const { JsonWebTokenError } = require("jsonwebtoken");
const generatetoken = require("../config/token");
const User = require("../models/schema");
const bcrypt = require('bcryptjs');
exports.signup = async(req, res)=>{
   try{
    const {username,email,password} = req.body;
    if(!username || !email|| !password){
return res.status(400).json({message:"send all details"})
    }
const existuser  = await User.findOne({username});
if(existuser){
          return res.status(409).json({message:"user already exist"});
}
const hashedpassword = await bcrypt.hash(password,10);
   const user =await User.create({
          username,
          email,
          password:hashedpassword
     })
     console.log(user)
     let token ; 
     try{
      token = await generatetoken(user._id)
     }catch(err){
  console.log(err)
     }
     console.log("Token generated:", token);
     res.cookie("token",token,{
       httpOnly : true,
       secure : true,
       sameSite:"None",
       maxAge:7*24*60*60*1000
     },)
    return res.status(201).json({user:{
          username,
          email,
    }});
   }catch(err){
   console.log(err)
   }
}
exports.login=async(req,res)=>{
   try{
  const {email,password} = req.body;
  if(!email || !password){
  return res.status(400).json({message:"fill all details"});}
   const exist = await User.findOne({email});
   if(!exist){
   return res.status(400).json({message:"user does not exist"})
   }
   const decoded =  await bcrypt.compare(password,exist.password);
   if(!decoded){
  return res.status(400).json({message:"incorrect password"})
   }
   let token ; 
     try{
      token = await generatetoken(exist._id)
     }catch(err){
  console.log(err)
     }
     console.log("Token generated:", token);
     res.cookie("token",token,{
       httpOnly : true,
       secure : true,
       sameSite:"None",
       maxAge:7*24*60*60*1000
     },)
   res.status(200).json({user:{
     username:exist.username,
     email:exist.email
   }});
  }catch(err){
 console.log(err);
   }
}
exports.logout=async(req,res)=>{
   try{
    res.clearCookie("token")
   return res.status(200).json({message:"logout successfully"})
   }catch(err){
 console.log(err)
 return res.status(500).json({ message: "Logout failed" });
   }
}
