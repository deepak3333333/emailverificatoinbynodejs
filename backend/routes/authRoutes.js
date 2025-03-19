const express=require("express");
const {register,login,logout,sendVerificationOtp,verifyOtp,isAuthenticated, sendResetOtp, resetPassword, deleteUser} = require("../contollers/authController");
const userAuth = require("../middleware/userAuth");

const router=express.Router();







router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)
router.post("/send-verification-otp",userAuth,sendVerificationOtp)
router.post("/verifyaccount",userAuth,verifyOtp)
router.post("/is-auth",userAuth,isAuthenticated)
router.post("/send-reset-otp",sendResetOtp)
router.post("/resetPassword",resetPassword)
router.delete("/deleteuser",userAuth,deleteUser)


module.exports=router;