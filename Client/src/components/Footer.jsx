// import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-1">
            <img className="h-10" src="/logo.svg" alt="Digi Friend" />
            <p className="text-gray-600 mt-2">Digi Friend</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="col-span-4 grid grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">About</h3>
              <ul className="mt-4 space-y-4">
                <li><Link to="/about" className="text-base text-gray-500 hover:text-gray-900">Company</Link></li>
                <li><Link to="/team" className="text-base text-gray-500 hover:text-gray-900">Team</Link></li>
                <li><Link to="/careers" className="text-base text-gray-500 hover:text-gray-900">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Services</h3>
              <ul className="mt-4 space-y-4">
                <li><Link to="/chat" className="text-base text-gray-500 hover:text-gray-900">Chat</Link></li>
                <li><Link to="/schedule" className="text-base text-gray-500 hover:text-gray-900">Schedule</Link></li>
                <li><Link to="/support" className="text-base text-gray-500 hover:text-gray-900">Support Groups</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Resources</h3>
              <ul className="mt-4 space-y-4">
                <li><Link to="/blog" className="text-base text-gray-500 hover:text-gray-900">Blog</Link></li>
                <li><Link to="/faq" className="text-base text-gray-500 hover:text-gray-900">FAQ</Link></li>
                <li><Link to="/help" className="text-base text-gray-500 hover:text-gray-900">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li><Link to="/privacy" className="text-base text-gray-500 hover:text-gray-900">Privacy</Link></li>
                <li><Link to="/terms" className="text-base text-gray-500 hover:text-gray-900">Terms</Link></li>
                <li><Link to="/cookies" className="text-base text-gray-500 hover:text-gray-900">Cookies</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; 2023 Digi Friend. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}