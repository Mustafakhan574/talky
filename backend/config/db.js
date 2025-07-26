const mongoose = require('mongoose');
const connectdb=async()=>{
          try{
          await mongoose.connect(process.env.URL);
          console.log('db connected')
          }catch(err){
                    console.log(err)
          }   
}
module.exports = connectdb;