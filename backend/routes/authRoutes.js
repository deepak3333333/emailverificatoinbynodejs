const express=require("express");
const {register,login,logout,sendVerificationOtp,verifyOtp} = require("../contollers/authController");
const userAuth = require("../middleware/userAuth");

const router=express.Router();







router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)
router.post("/send-verification-otp",userAuth,sendVerificationOtp)
router.post("/verifyaccount",userAuth,verifyOtp)


module.exports=router;