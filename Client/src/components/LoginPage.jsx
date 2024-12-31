import React from 'react';
import { useState } from 'react';
import { SignIn, SignUp } from "@clerk/clerk-react";

export default function AuthPage() {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    // <>This is Auth Page</>
    <div className="min-h-screen bg-gray-100 relative">
      {/* Main content */}
      <div className={`min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-all duration-300 ${showSignUp ? 'blur-sm' : ''}`}>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <SignIn />
            <div className="mt-6">
              <button
                onClick={() => setShowSignUp(true)}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create an account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sign Up Modal */}
      {showSignUp && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowSignUp(false)}></div>
          <div className="relative bg-white rounded-lg p-8 max-w-md w-full m-4">
            <button
              onClick={() => setShowSignUp(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <SignUp />
          </div>
        </div>
      )}
    </div>
  );
}
