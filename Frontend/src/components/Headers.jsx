import React, { useState, useEffect, useRef } from "react";
import { Search, ChevronDown, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginSystem from "./Modals/LoginSystem";

const Headers = ({ onLoginClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { authToken, logout, user } = useAuth();
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-[#E8EDF1] py-2 px-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="bg-[#00A58E] text-white px-8 py-2 rounded hover:bg-[#00A58E]/90 transition-colors duration-200"
        >
          Logo
        </Link>

        {/* Search Bar */}
        <div className="flex-1 flex items-center justify-center gap-4 mx-4">
          <div className="flex-1 flex items-center relative">
            <div className="flex items-center bg-white rounded px-2 py-2 w-full border">
              <div className="flex items-center cursor-pointer border-r pr-2">
                <span className="text-[#00A58E] font-medium mr-1">Buy</span>
                <ChevronDown size={16} className="text-[#00A58E]" />
              </div>
              <Search size={20} className="text-gray-400 mr-2 pl-2" />
              <input
                type="text"
                placeholder="Search Here"
                className="flex-1 outline-none border-none bg-transparent text-gray-700 pl-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="bg-[#00A58E] text-white font-medium py-2 px-6 rounded">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* User & Authentication */}
        <div className="flex items-center gap-4">
          {authToken ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
              >
                <User className="w-6 h-6 text-gray-600" />
                <span className="text-gray-800 font-medium">
                  {user?.name || "User"}
                </span>
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute top-12 right-0 bg-white w-64 rounded-lg shadow-md p-4">
                  <LoginSystem />
                  <button
                    onClick={logout}
                    className="w-full mt-2 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="text-gray-800 text-xl hover:text-[#00A58E] flex items-center"
            >
              <div className="w-8 h-8 rounded-full bg-[#00A58E] flex items-center justify-center">
                <User className="text-white w-5 h-5" />
              </div>
              <span className="ml-2">Login/Register</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Headers;
