const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const  transporter  = require("../config/nodemailer");


async function register(req, res) {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.json({
      success: false,
      message: "Please provide all the required details",
    });
  }
  try {
    const userAlreadyExits = await userModel.findOne({ email });
    if (userAlreadyExits) {
      return res.json({
        success: false,
        message: "User already exits",
      });
    }
    // const user=await userModel.create({name,email,password}); no need of save method
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const mailOption={
      from:process.env.SENDER_EMAIL,
      to:email,
      subject:"Welcome to our website",
      text:`Hello there, your account has been register by using ${email} email address`,
      html: "<b>Hello world?</b>",
    }
    const info=await transporter.sendMail(mailOption);
    console.log("Message sent: %s", info.messageId);




    return res.json({ success: true, message: "User created successfully" });
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Please provide all the required details",
    });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "invalid email",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "invalid password",
      });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "User logged in successfully",
    });
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
}


async function logout(req, res) {
  try{
    res.clearCookie("token",{
      httpOnly: true,
    });
    return res.json({
      success: true,
      message: "User logged out successfully",
    });

  }
  catch(err){
    return res.json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = { register, login,logout };
