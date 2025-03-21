import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


const Navbar = () => {
    const navigate=useNavigate()
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white shadow-lg">
      {/* Logo with Fade In/Out Animation */}
      <motion.div 
        className="flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="bg-blue-500 text-white font-bold text-lg p-2 rounded-lg">
          AuthApp
        </div>
      </motion.div>

      {/* Styled Login Button */}
      <button  onClick={()=>navigate('/login')}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
        Login
      </button>
    </nav>
  );
};

export default Navbar;
