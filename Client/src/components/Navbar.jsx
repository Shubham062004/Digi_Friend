  import React, { useState } from 'react';
  import { SignIn, SignUp, useUser, useClerk } from "@clerk/clerk-react";
  import { Link } from 'react-router-dom';
  import { FaBars, FaTimes } from 'react-icons/fa';
  import logo from '../assets/logo.png';

  const Navbar = () => {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { isSignedIn, user } = useUser();
    const { signOut } = useClerk();

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleUserMenu = () => setShowUserMenu(!showUserMenu);

    const handleAuthClick = (isSignUpMode) => {
      setIsSignUp(isSignUpMode);
      setShowAuthModal(true);
    };

    const closeAuthModal = () => {
      setShowAuthModal(false);
    };

    return (
      <div>
        {/* Navbar */}
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex-shrink-0">
                <img className="h-10 w-auto" src={logo} alt="Logo" />
                </Link>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  <Link to="/" className="font-robot text-xl font-medium text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md">
                    Digi Friend
                  </Link>
                </div>
              </div>
              <div className="hidden md:ml-6 md:flex md:items-center">
                {isSignedIn ? (
                  <div className="relative">
                    <button 
                      onClick={toggleUserMenu}
                      className="flex items-center text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      <img 
  src={user.avatarUrl || '/placeholder.svg?height=32&width=32'}
                        alt={user.fullName} 
                        className="h-8 w-8 rounded-full mr-2"
                      />
                      <span>{user.fullName}</span>
                    </button>
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                        <button onClick={() => signOut()} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Logout
                        </button>
                        <button onClick={() => handleAuthClick(true)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Switch Account
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button onClick={() => handleAuthClick(false)} className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                    Login / Sign Up
                  </button>
                )}
              </div>
              <div className="-mr-2 flex md:hidden">
                <button
                  onClick={toggleMenu}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <span className="sr-only">Open main menu</span>
                  {isOpen ? <FaTimes className="block h-6 w-6" /> : <FaBars className="block h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-700 hover:bg-gray-50">Home</Link>
              <Link to="/reviews" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-700 hover:bg-gray-50">Reviews</Link>
              {isSignedIn ? (
                <>
                  <button onClick={() => signOut()} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-700 hover:bg-gray-50">Logout</button>
                  <button onClick={() => handleAuthClick(true)} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-700 hover:bg-gray-50">Switch Account</button>
                </>
              ) : (
                <button onClick={() => handleAuthClick(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-700 hover:bg-gray-50">Login / Sign Up</button>
              )}
            </div>
          </div>

          {/* Additional bar */}
          <div className="border-t border-gray-200">
            {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}
              <div className="flex justify-center py-2">
                <Link to="/reviews" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Customer Reviews
                </Link>
                <Link to="/chatpage" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Chat
                </Link>
                <Link to="https://cal.com/shubham-kumar-chaurasia-fll1ki" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  schdule Meeting
                </Link>
                <Link to="/Blog" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Blog
                </Link>
                <Link to="/pricing" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Pricing
                </Link>
                <Link to="/support" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Support
                </Link>
              </div>
            {/* </div> */}
          </div>
        </nav>

        {/* Auth Modal */}
        {showAuthModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeAuthModal}></div>
            <div className="relative bg-white rounded-lg p-8 max-w-md w-full m-4">
              <button
                onClick={closeAuthModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {isSignUp ? 'Create your account' : 'Sign in to your account'}
              </h2>
              <div className="mt-8">
                {isSignUp ? (
                  <SignUp signInUrl="#" afterSignUpUrl="/" />
                ) : (
                  <SignIn signUpUrl="#" afterSignInUrl="/" />
                )}
              </div>
              <div className="mt-4 text-center">
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default Navbar;