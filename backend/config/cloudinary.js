const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config()
cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET})
const uploadoncloudinary=async(filepath)=>{
        try{
  const uploadResult = await cloudinary.uploader
       .upload(filepath)
       console.log(filepath)
       if(fs.existsSync(filepath)){
fs.unlinkSync(filepath)
console.log("delete local file",filepath)
       }
       
       return uploadResult.secure_url;
        }catch(err){
        
        console.log("clodinary upload err",err)
        }
}
module.exports  = uploadoncloudinary;
