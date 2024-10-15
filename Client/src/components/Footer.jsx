// import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and social icons */}
          <div className="mb-8 md:mb-0">
            <Link to="/" className="flex items-center mb-4">
              <img className="h-8 w-auto mr-3" src={logo} alt="Logo" />
              <span className="font-robot text-xl font-bold">Digi Friend</span>
            </Link>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Links columns */}
          {[1, 2, 3].map((column) => (
            <div key={column}>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Column {column}
              </h3>
              <ul className="space-y-2">
                {[1, 2, 3, 4, 5].map((item) => (
                  <li key={item}>
                    <Link to="#" className="text-gray-300 hover:text-white">
                      Link {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;