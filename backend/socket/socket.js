const http = require('http');
const express = require("express");
const {Server} = require('socket.io')
let app = express()
const server = http.createServer(app)
const io = new Server(server,{
          cors:{
origin:"http://localhost:5173",
          }
})
let usersocketmap = {}
 const getreceiversocketid=(receiver)=>{
          return usersocketmap[receiver]
 }
io.on("connection",(socket)=>{
    const userId = socket.handshake.query.userId;
    if(userId!=undefined){
          usersocketmap[userId] = socket.id;
    }  
    io.emit("getonlineusers",Object.keys(usersocketmap))    
          socket.on('disconnect',()=>{
                    delete usersocketmap[userId]
    io.emit("getonlineusers",Object.keys(usersocketmap))    
          })
})
module.exports = {app,server,io,usersocketmap,getreceiversocketid}