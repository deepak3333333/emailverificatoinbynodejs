import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";


const Navbar = () => {
    const navigate = useNavigate();
    const { userData , bancendUrl,setIsLoggedIn,setUserData} = useContext(AppContent);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);



    const deleteAccount=async()=>{
        try{
            axios.defaults.withCredentials=true
            const {data}=await axios.delete(bancendUrl+'/api/auth/deleteuser')
            data.success && setUserData(null)
            data.success && toast.success(data.message)
            data.success && setIsLoggedIn(false)
            navigate('/login')
        }catch(err){
            toast.error(err.message)
        }




    }

    const logout=async()=>{
      try{
        axios.defaults.withCredentials=true
        const {data}=await axios.post(bancendUrl+'/api/auth/logout')
        // data.success && setIsLoggedIn(false)
         data.success && setUserData(null)
        data.success && toast.success(data.message)

      }catch(err){
        toast.error(err.message)
      }
    }


    const handlesendOtp=async()=>{
        try{
            axios.defaults.withCredentials=true
            const {data}=await axios.post(bancendUrl+'/api/auth/send-verification-otp')
            data.success && toast.success(data.message)
            navigate('/email-verify')
        }catch(err){
            toast.error(err.message)
        }
    }
    useEffect(()=>{
        
    },userData)

    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white shadow-lg">
            {/* Logo with Fade In/Out Animation */}
            <motion.div 
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            >
                <div
                
                onClick={()=>navigate("/")}
                className="bg-blue-500 text-white font-bold text-lg p-2 rounded-lg">
                    AuthApp
                </div>
            </motion.div>

            {/* User Section */}
            {userData ? (
                <div 
                    className="relative"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    // onMouseLeave={() => setIsDropdownOpen(false)}
                >
                    <div 
                        className="cursor-pointer hover:bg-gray-700 px-3 py-2 rounded-md transition duration-300"
                    >
                        {userData.name}
                    </div>
                    
                    {isDropdownOpen && (
                        <ul className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-10">
                            {!userData.isAccountVerified && (
                                <li 
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition duration-300"
                                 onClick={handlesendOtp}
                                >
                                    Verify Account
                                </li>
                            )}
                            <li 
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition duration-300"
                                onClick={logout}
                            >
                                Logout
                            </li>
                            <li 
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition duration-300"
                                onClick={deleteAccount}
                            >
                                delete account
                            </li>
                        </ul>
                    )}
                </div>
            ) : (
                <button  
                    onClick={() => navigate('/login')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                    Login
                </button>
            )}
        </nav>
    );
};

export default Navbar;