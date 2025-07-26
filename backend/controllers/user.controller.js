const uploadoncloudinary = require("../config/cloudinary");
const User = require("../models/schema");

exports.getcurruser=async(req,res)=>{
          try{
       const userid=  req.userid;
    const user = await User.findById(userid).select("-password");
    if(!user){
         return res.status(400).json({message:"user not found"})
    }
    return res.status(200).json(user);
}catch(err){
   
          return res.status(400).json({message:"current user error"})
}
}
exports.editprofile = async (req, res) => {
  try {
    const { username } = req.body;
    const updateData = { username };

    if (req.file) {
      const image = await uploadoncloudinary(req.file.path);
      updateData.image = image;
    }

    const user = await User.findByIdAndUpdate(req.userid, updateData, { new: true });

    if (!user) {
      return res.status(400).json({ message: "user not found in edit" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error("profile error", err);
    return res.status(500).json({ message: "Profile update failed" });
  }
};

exports.getotherusers=async(req,res)=>{
   if (!req.userid) {
    return res.status(401).json({ message: "User ID missing" });
  }
   try{
    const users = await User.find({
     _id:{$ne:req.userid}
    }).select("-password")
    return res.status(200).json(users)
   }catch(err){
  return res.status(400).json({message:"other users error"})
   }
}
exports.search=async(req,res)=>{
   try{
    let {query} = req.query;
    if(!query){
      return res.status(400).json({message:"query is required"})
    }
    let users = await User.find({
         username:{$regex:query,$options:"i"}
    })
    return res.status(200).json(users)
   }catch(err){
return res.status(400).json({message:"search user error"})
   }
}