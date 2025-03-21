import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [state, setState] = useState('Sign Up')
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
    const navigate=useNavigate()


    const sumithandler=()=>{
    
      console.log(name,email,password);
      

    }
  
  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              {state === 'Sign Up' ? 'Create Account' : 'Login Account'}
            </h2>
            <p className="mt-2 text-gray-600">
              {state === 'Sign Up' 
                ? 'Join us to get started with your journey' 
                : 'Welcome back, please enter your details'}
            </p>
          </div>
          
          <form className="space-y-6">
            {state === 'Sign Up' && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                onChange={(e)=>setName(e.target.value)}

                value={name}
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
              onChange={(e)=>setEmail(e.target.value)}
              value={email}



                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
            
            {state === 'Login' && (
              <div className="flex items-center justify-end">
                <button onClick={()=>navigate('/reset-password')} className="text-sm text-blue-600 hover:text-blue-800">
                  Forgot password?
                </button>
              </div>
            )}
            
            <button
            onClick={sumithandler}
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              {state}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            {state === 'Sign Up' ? (
              <p className="text-gray-600">
                Already have an account?{' '}
                <span 
                  onClick={() => setState('Login')} 
                  className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium"
                >
                  Login here
                </span>
              </p>
            ) : (
              <p className="text-gray-600">
                Don't have an account?{' '}
                <span 
                  onClick={() => setState('Sign Up')} 
                  className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium"
                >
                  Sign Up
                </span>
              </p>
            )}
          </div>
          
          <div className="mt-8 pt-5 border-t border-gray-200">
            <div className="text-sm text-center text-gray-500">
              By continuing, you agree to our{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  )
}

export default Login