import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import logo from "../assets/logo.png";

const Footer = () => {
  // Navigation link data organized by section
  const navigationLinks = {
    solutions: [
      { to: "/chat", text: "Chat", isExternal: false },
      { to: "/support-groups", text: "Support Groups", isExternal: false },
      { to: "/events", text: "Events", isExternal: false },
      { to: "/resources", text: "Resources", isExternal: false }
    ],
    support: [
      { to: "/pricing", text: "Pricing", isExternal: false },
      { to: "/documentation", text: "Documentation", isExternal: false },
      { to: "https://cal.com/shubham-kumar-chaurasia-fll1ki", text: "Meeting", isExternal: true },
      { to: "/api-status", text: "API Status" }
    ],
    company: [
      { to: "/about", text: "About", isExternal: false },
      { to: "/blog", text: "Blog", isExternal: false },
      { to: "/jobs", text: "Jobs", isExternal: false },
      { to: "/press", text: "Press", isExternal: false }
    ],
    legal: [
      { to: "/privacy", text: "Privacy", isExternal: false },
      { to: "/terms", text: "Terms", isExternal: false }
    ]
  };

  // Social media links configuration
  const socialLinks = [
    { icon: Facebook, name: "Facebook" },
    { icon: Instagram, name: "Instagram" },
    { icon: Twitter, name: "Twitter" },
    { icon: Linkedin, name: "LinkedIn" }
  ];

  /**
   * Renders a navigation link based on whether it's internal or external
   * @param {Object} link - The link object containing to, text, and isExternal properties
   * @returns {JSX.Element} - The appropriate link element
   */
  const renderLink = (link) => {
    const linkClassName = "text-base text-gray-300 hover:text-white";

    return link.isExternal ? (
      <a
        href={link.to}
        className={linkClassName}
        target="_blank"
        rel="noopener noreferrer"
      >
        {link.text}
      </a>
    ) : (
      <Link to={link.to} className={linkClassName}>
        {link.text}
      </Link>
    );
  };

  /**
   * Renders a complete navigation section
   * @param {string} title - The section title
   * @param {Array} links - Array of link objects
   * @returns {JSX.Element} - The complete navigation section
   */
  const renderNavSection = (title, links) => (
    <div>
      <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
        {title}
      </h3>
      <ul className="mt-4 space-y-4">
        {links.map((link) => (
          <li key={link.to}>{renderLink(link)}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        {/* Main Footer Grid */}
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Company Information Section */}
          <div className="space-y-8 xl:col-span-1">
            {/* Logo and Company Name */}
            <div className="flex items-center gap-4">
              <img className="h-10 w-auto" src={logo} alt="Logo" />
              <span className="text-lg font-semibold">Digi Friend</span>
            </div>

            {/* Company Description */}
            <p className="text-gray-400 w-80 text-base">
              Connecting people, fostering growth, and building a supportive
              digital community.
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="text-gray-400 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{social.name}</span>
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Sections Grid */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            {/* First Navigation Column */}
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {renderNavSection("Solutions", navigationLinks.solutions)}
              <div className="mt-12 md:mt-0">
                {renderNavSection("Support", navigationLinks.support)}
              </div>
            </div>

            {/* Second Navigation Column */}
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {renderNavSection("Company", navigationLinks.company)}
              <div className="mt-12 md:mt-0">
                {renderNavSection("Legal", navigationLinks.legal)}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {new Date().getFullYear()} Digi Friend, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;