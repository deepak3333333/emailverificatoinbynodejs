import React from 'react'

function ResetPassword() {
  return (
    <div>
        Reset Password
      
    </div>
  )
}

export default ResetPassword





// import React, { useState } from 'react';

// export default function OTPForm() {
//   const [otp, setOtp] = useState('');

//   const handleChange = (e) => {
//     const value = e.target.value;
//     // Allow only digits and max 6 characters
//     if (/^\d{0,6}$/.test(value)) {
//       setOtp(value);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (otp.length === 6) {
//       alert(`OTP Submitted: ${otp}`);
//     } else {
//       alert('Please enter a 6-digit OTP');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 max-w-sm mx-auto">
//       <label className="block mb-2 text-sm font-medium">Enter 6-digit OTP:</label>
//       <input
//         type="text"
//         value={otp}
//         onChange={handleChange}
//         maxLength="6"
//         className="w-full p-2 border border-gray-300 rounded mb-4"
//         placeholder="Enter OTP"
//       />
//       <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//         Submit
//       </button>
//     </form>
//   );
// }
