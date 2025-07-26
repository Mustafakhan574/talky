const jwt = require('jsonwebtoken')
const isauth=async(req,res,next)=>{
   try{
      console.log("Cookies:", req.cookies);
          let token  = req.cookies.token
          if(!token){
   return res.status(400).json({message:"token is not found"})
}
const decoded   = await jwt.verify(token,process.env.JWT_SECRET)
         console.log("Decoded token:", decoded);
 
          req.userid = decoded.id;
          next();
   }catch(err){
         return res.status(400).json({message:"token error"});
   }
}
module.exports = isauth;