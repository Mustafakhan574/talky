const express = require('express');
const env = require('dotenv')
const db = require('./config/db');
const router = require('./routes/users');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const userrouter = require('./routes/user.route');
const messagerouter = require('./routes/message');
const { app, server } = require('./socket/socket');
env.config()
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use(router)
app.use(userrouter)
app.use(messagerouter)
const port = process.env.PORT;
server.listen(port,async()=>{
           await db(); 
       console.log(`http://localhost:${port}`);    
})