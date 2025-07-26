const express = require("express");
const messagerouter = express.Router();
const isauth = require('../middlewares/isauth');
const upload = require('../middlewares/multer.js');
const { sendmessage, getmessage } = require("../controllers/message.js");
messagerouter.post("/send/:receiver",isauth,upload.single("image"),sendmessage)
messagerouter.get("/get/:receiver",isauth,getmessage)
module.exports = messagerouter;