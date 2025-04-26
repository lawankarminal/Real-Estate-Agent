import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const TestFooter = () => {
  const location = useLocation(); // Get the current route               confirmed page

  // Function to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <footer className="w-full max-w-[1920px]  bg-[#181818] text-gray-300 mx-auto text-left">
      <div className="px-12 py-8 md:px-28  flex flex-col md:flex-row justify-between">
        {/* Left Section - Company Info */}
        <div className="max-w-[400px]">
          <h3 className="text-white font-bold text-lg">Company Info</h3>
          <p className="text-sm mt-3 font-[400] leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Etiam enim quis nisl arcu.
            Molestie eu vel eu sollicitudin sed sapien cras. Vivamus tortor
            pellentesque proin viverra maecenas.
          </p>
        </div>

        {/* Center Links Section */}
        <div className="flex flex-wrap justify-around gap-32 mt-8 md:mt-0">
          <div>
            <span className="text-white font-bold text-lg">About Us</span>
            <ul className="mt-3 space-y-2">
              <li>
                <span
                  className={`hover:text-red-500 hover:underline transition-all duration-300 ${
                    isActive("/contact") ? "text-blue-500 font-bold" : ""
                  }`}
                >
                  Contact
                </span>
              </li>
              <li>
                <span
                  className={`hover:text-red-500 hover:underline transition-all duration-300 ${
                    isActive("/careers") ? "text-blue-500 font-bold" : ""
                  }`}
                >
                  Careers
                </span>
              </li>
              <li>
                <span
                  className={`hover:text-red-500 hover:underline transition-all duration-300 ${
                    isActive("/blogs") ? "text-blue-500 font-bold" : ""
                  }`}
                >
                  Blogs
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg">Explore</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <span
                  className={`hover:text-red-500 hover:underline transition-all duration-300 ${
                    isActive("/buy-rent") ? "text-blue-500 font-bold" : ""
                  }`}
                >
                  Buy/Rent
                </span>
              </li>
              <li>
                <span
                  className={`hover:text-red-500 hover:underline transition-all duration-300 ${
                    isActive("/sell") ? "text-blue-500 font-bold" : ""
                  }`}
                >
                  Sell
                </span>
              </li>
              <li>
                <Link
                  to="/agents"
                  className={`hover:text-red-500 hover:underline transition-all duration-300 ${
                    isActive("/agents") ? "text-blue-500 font-bold" : ""
                  }`}
                >
                  Agents
                </Link>
              </li>
              <li>
                <span
                  className={`hover:text-red-500 hover:underline transition-all duration-300 ${
                    isActive("/services") ? "text-blue-500 font-bold" : ""
                  }`}
                >
                  Services
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg">Support</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  to="/faq"
                  className={`hover:text-red-500 hover:underline transition-all duration-300 ${
                    isActive("/faq") ? "text-blue-500 font-bold" : ""
                  }`}
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className={`hover:text-red-500 hover:underline transition-all duration-300 ${
                    isActive("/privacy-policy") ? "text-blue-500 font-bold" : ""
                  }`}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className={`hover:text-red-500 hover:underline transition-all duration-300 ${
                    isActive("/terms") ? "text-blue-500 font-bold" : ""
                  }`}
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <div className="flex space-x-3">
                <a href="#" className="text-[#767F8C] hover:text-white transition-all duration-300"> <FaFacebookF /></a>
                <a href="#" className="text-[#767F8C] hover:text-white transition-all duration-300"> <FaYoutube /></a>
                <a href="#" className="text-[#767F8C] hover:text-white transition-all duration-300"> <FaInstagram /></a>
                <a href="#" className="text-[#767F8C] hover:text-white transition-all duration-300"> <FaTwitter /></a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="border-t border-gray-700 w-full"></div>

      {/* Bottom Copyright Section */}
      <div className="w-full max-w-[1920px] h-[68px] flex items-center justify-around  md:px-24">
        <p className="text-sm text-[#767F8C]">
          @ 2024 - Real Estate Platform. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default TestFooter;
