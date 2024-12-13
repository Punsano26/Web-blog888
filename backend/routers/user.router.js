const express = require("express");
const router = express.Router(); //เรียกออกมาเป็นฟังก์ชันด้วยนะ!!
const userController = require("../controllers/user.controller");

// http://localhost:5000/api/v1/auth/register
router.post("/register", userController.register);
// http://localhost:5000/api/v1/auth/login
router.post("/login", userController.Login);


module.exports = router;
