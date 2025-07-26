const express = require('express');
const { getcurruser, editprofile, getotherusers, search } = require('../controllers/user.controller.js');
const isauth = require('../middlewares/isauth');
const upload = require('../middlewares/multer.js');
const userrouter = express.Router()
userrouter.get("/current",isauth,getcurruser);
userrouter.put("/profile",isauth,upload.single("image"),editprofile);
userrouter.get("/others",isauth,getotherusers)
userrouter.get("/search",isauth,search)
module.exports = userrouter;