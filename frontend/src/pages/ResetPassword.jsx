import React, { useContext, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios';
import { AppContent } from '../context/AppContext';
import { toast } from 'react-toastify';



function ResetPassword() {
  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [isEmailSent, setIsEmailSent] = React.useState(false);
  const [isOtpVerified, setIsOtpVerified] = React.useState(false);
  axios.defaults.withCredentials = true;
  const {bancendUrl}=useContext(AppContent)

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
    }
  };

  const handleSubmitEmail = async(e) => {
    e.preventDefault();
    try{
      const {data}=await axios.post(bancendUrl+"/api/auth/send-reset-otp", {email});
      data.success?toast.success(data.message):toast.error(data.message);
      data.success?setIsEmailSent(true):setIsEmailSent(false);

    }
    catch(err){
      // toast.error(data. message);
      alert("Something went wrong!");
      
    }
  };

  const handleVerifyOtp =async (e) => {
    e.preventDefault();
   
    






    setIsOtpVerified(true);
  };

  const handleResetPassword = async(e) => {
    e.preventDefault();
    try{
      const {data}=await axios.post(bancendUrl+"/api/auth/resetPassword", {email, otp, newPassword});
      data.success?toast.success(data.message):toast.error(data.message);
      if(data.success){
        setIsEmailSent(true);
        setIsOtpVerified(false);
        setEmail("");
        setOtp("");
        setNewPassword("");
      }
      else{
        setIsEmailSent(true);
        setIsOtpVerified(true);
      }

      
     


    }
    catch(error){
      toast.error("Something went wrong!");

    }
   
  };


  useEffect(()=>{
    if(isEmailSent){
      setIsOtpVerified(false);
    }
  },[isEmailSent]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          
          {/* Step 1: Email Form */}
          {!isEmailSent && (
            <form onSubmit={handleSubmitEmail} className="bg-white shadow-lg rounded-xl p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Reset Password</h1>
                <p className="mt-2 text-gray-600">Enter your email to reset your password</p>
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input 
                  id="email"
                  type="email" 
                  placeholder="Enter your email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
              >
                Send Otp
              </button>
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Remembered your password? <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium">Login</a>
                </p>
              </div>
            </form>
          )}
          
          {/* Step 2: OTP Verification */}
          {!isOtpVerified && isEmailSent && (
            <form onSubmit={handleVerifyOtp} className="bg-white shadow-lg rounded-xl p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Verify Email</h2>
                <p className="mt-2 text-gray-600">We've sent a code to {email}</p>
              </div>
              <div className="mb-6">
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">Enter 6 digit OTP</label>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  maxLength={6}
                  onChange={handleChange}
                  placeholder="Enter OTP here"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
              >
                Verify
              </button>
              <div className="text-center mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsEmailSent(false)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Change email address
                </button>
              </div>
            </form>
          )}
          
          {/* Step 3: New Password Form */}
          {isOtpVerified && isEmailSent && (
            <form onSubmit={handleResetPassword} className="bg-white shadow-lg rounded-xl p-8">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Set New Password</h1>
                <p className="mt-2 text-gray-600">Create a strong, secure password</p>
              </div>
              <div className="mb-6">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input 
                  id="newPassword"
                  type="password" 
                  placeholder="Enter your new password" 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
             
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
              >
                Reset Password
              </button>
              <div className="text-center mt-6 space-y-2">
                <p className="text-sm text-gray-600">
                  Remembered your password? <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium">Login</a>
                </p>
                <p className="text-sm text-gray-600">
                  Don't have an account? <a href="/register" className="text-blue-600 hover:text-blue-800 font-medium">Register</a>
                </p>
                <p className="text-sm text-gray-600">
                  Go back to <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">Home</a>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ResetPassword