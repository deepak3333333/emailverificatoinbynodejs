import React, { useContext } from 'react';
import { AppContent } from '../context/AppContext';



const Header = () => {

  const {userData}=useContext(AppContent)
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-8 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Robot and Welcome Message Section */}
          <div className="flex items-center mb-6 md:mb-0">
            <div className="bg-white p-3 rounded-full mr-4 shadow-lg">
              <svg className="w-12 h-12 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2zm-1-4a1 1 0 11-2 0 1 1 0 012 0zm-2-3a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 11-2 0 1 1 0 012 0zM7 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                <path d="M5 5a1 1 0 011-1h8a1 1 0 011 1v5a1 1 0 01-1 1H6a1 1 0 01-1-1V5z" />
                <path fillRule="evenodd" d="M5 12a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Hey {userData?userData.name:'Developer'}</h1>
              <p className="text-blue-100">Welcome to our app. Let's start a quick journey!</p>
            </div>
          </div>

          {/* Navigation and CTA Section */}
          <div className="flex flex-col md:flex-row items-center">
            <nav className="flex space-x-6 mb-4 md:mb-0 md:mr-8">
              <a href="#" className="hover:text-blue-200 transition-colors font-medium">Features</a>
              <a href="#" className="hover:text-blue-200 transition-colors font-medium">Docs</a>
              <a href="#" className="hover:text-blue-200 transition-colors font-medium">Community</a>
            </nav>
            <button className="bg-white text-blue-600 hover:bg-blue-100 px-6 py-2 rounded-lg font-semibold transition-colors shadow-md">
              Get Started
            </button>
          </div>
        </div>

        {/* Additional Features Preview */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-blue-600 bg-opacity-30 rounded-lg p-4 backdrop-blur-sm">
            <div className="inline-block bg-blue-700 rounded-full p-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-bold">Quick Setup</h3>
            <p className="text-sm text-blue-100">Get your project running in minutes</p>
          </div>
          
          <div className="bg-blue-600 bg-opacity-30 rounded-lg p-4 backdrop-blur-sm">
            <div className="inline-block bg-blue-700 rounded-full p-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-bold">Secure Authentication</h3>
            <p className="text-sm text-blue-100">Enterprise-grade security built-in</p>
          </div>
          
          <div className="bg-blue-600 bg-opacity-30 rounded-lg p-4 backdrop-blur-sm">
            <div className="inline-block bg-blue-700 rounded-full p-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-bold">Advanced Analytics</h3>
            <p className="text-sm text-blue-100">Track performance in real-time</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;