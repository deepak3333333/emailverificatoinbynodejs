import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function EmailVerify() {
  const [otp, setOtp] = React.useState("");
  const { bancendUrl, isLoggedIn, userData, setIsLoggedIn, setUserData, getUserData } = useContext(AppContent);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(bancendUrl + '/api/auth/verifyaccount', { otp });
      if (data.success) {
        toast.success(data.message, { position: "bottom-left" });
        setIsLoggedIn(true);
        getUserData();
        setOtp('');
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 w-full max-w-sm">
          <h2 className="text-2xl font-semibold text-center mb-4">Verify Email</h2>
          <label className="block text-sm font-medium text-gray-700 mb-2">Enter 6 digit OTP</label>
          <input
            type="text"
            value={otp}
            maxLength={6}
            onChange={handleChange}
            placeholder="Enter OTP here"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Verify
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default EmailVerify;
