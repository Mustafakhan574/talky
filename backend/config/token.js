const jwt = require('jsonwebtoken');
const generatetoken=async(id)=>{
 const token = jwt.sign({id},process.env.JWT_SECRET,{
          expiresIn:"7d"
 })
 return token;
}
module.exports = generatetoken;