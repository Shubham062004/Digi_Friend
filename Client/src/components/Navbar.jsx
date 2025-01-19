import React, { useState } from "react";
import { SignIn, SignUp, useUser, useClerk } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";

const Navbar = () => {
  // State management for various UI elements
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Authentication hooks from Clerk
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  // Toggle handlers for menus
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);

  /**
   * Handles the authentication modal display
   * @param {boolean} isSignUpMode - Whether to show signup (true) or signin (false) form
   */
  const handleAuthClick = (isSignUpMode) => {
    setIsSignUp(isSignUpMode);
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  return (
    <div>
      {/* Main Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Brand Name Section */}
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0">
                <img className="h-10 w-auto" src={logo} alt="Logo" />
              </Link>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <Link
                  to="/"
                  className="font-robot text-xl font-medium text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md"
                >
                  Digi Friend
                </Link>
              </div>
            </div>

            {/* Desktop Authentication Section */}
            <div className="hidden md:ml-6 md:flex md:items-center">
              {isSignedIn ? (
                <div className="relative">
                  {/* User Profile Button */}
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <img
                      src={user.avatarUrl}
                      alt={user.fullName}
                      className="h-8 w-8 rounded-full mr-2"
                    />
                    <span>{user.fullName}</span>
                  </button>

                  {/* User Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                      <button
                        onClick={() => signOut()}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                      <button
                        onClick={() => handleAuthClick(true)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Switch Account
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => handleAuthClick(false)}
                  className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <FaTimes className="block h-6 w-6" />
                ) : (
                  <FaBars className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-700 hover:bg-gray-50"
            >
              Home
            </Link>
            <Link
              to="/reviews"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-700 hover:bg-gray-50"
            >
              Reviews
            </Link>
            <Link
              to="/chatpage"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-700 hover:bg-gray-50"
            >
              Chat
            </Link>
            <Link
              to="https://cal.com/shubham-kumar-chaurasia-fll1ki"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-700 hover:bg-gray-50"
            >
              Meeting
            </Link>
            <Link
              to="pricing"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-700 hover:bg-gray-50"
            >
              Pricing
            </Link>
            <Link
              to="/support"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-700 hover:bg-gray-50"
            >
              Support

            </Link>
            {isSignedIn ? (
              <>
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-700 hover:bg-gray-50"
                >
                  Logout
                </button>
                <button
                  onClick={() => handleAuthClick(true)}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-700 hover:bg-gray-50"
                >
                  Switch Account
                </button>
              </>
            ) : (
              <button
                onClick={() => handleAuthClick(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-700 hover:bg-gray-50"
              >
                Login
              </button>
            )}
          </div>
        </div>

        {/* Secondary Navigation Bar */}
        <div className="hidden md:block">
          <div className="border-t border-gray-400 w-4/5 mx-auto sm:w-11/12 md:w-10/12" />
          <div>
            <div className="flex justify-center py-2">
              {[
                { to: "/reviews", text: "Reviews" },
                { to: "/chatpage", text: "Chat" },
                {
                  to: "https://cal.com/shubham-kumar-chaurasia-fll1ki",
                  text: "Meeting",
                },
                { to: "/blog", text: "Blog" },
                { to: "/pricing", text: "Pricing" },
                { to: "/support", text: "Support" },
              ].map((link) => (
                <Link
                  key={link.text}
                  to={link.to}
                  className="text-gray-900 hover:text-gray-700 px-10 py-2 rounded-md text-sm font-medium"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={closeAuthModal}
          />
          <div className="relative max-w-md w-full">
            {/* Auth Form */}
            <div className="mt-8">
              {isSignUp ? (
                <SignUp signInUrl="#" afterSignUpUrl="/" />
              ) : (
                <SignIn signUpUrl="#" afterSignInUrl="/" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
