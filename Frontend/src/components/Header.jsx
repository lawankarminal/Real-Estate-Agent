import React, { useState, useEffect, useCallback } from "react";
import { useRef } from "react";
import { Search, ChevronDown, X, User } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import debounce from "lodash/debounce";
import { useAuth } from "../context/AuthContext";
import LoginSystem from "./Modals/LoginSystem";

const Header = ({ onLoginClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTags, setSearchTags] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("Buy");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { authToken, logout, user } = useAuth();
  const userMenuRef = useRef(null);
  // Scroll handler

  useEffect(() => {
    const query = searchParams.get("query") || "";
    const tags = query.split(",").filter((tag) => tag.trim() !== "");
    setSearchTags(tags);
  }, [searchParams]);

  const updateSearchParams = useCallback(
    debounce((tags) => {
      setSearchParams(tags.length ? { query: tags.join(",") } : {});
    }, 300),
    [setSearchParams]
  );

  useEffect(() => {
    updateSearchParams(searchTags);
  }, [searchTags, updateSearchParams]);

  const addSearchTag = () => {
    const trimmedTerm = searchTerm.trim();
    if (trimmedTerm && !searchTags.includes(trimmedTerm)) {
      setSearchTags((prevTags) => [...prevTags, trimmedTerm]);
      setSearchTerm("");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const removeTag = (tagToRemove) => {
    setSearchTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  const handleSearchSubmit = () => {
    const trimmedTerm = searchTerm.trim();
    if (trimmedTerm && !searchTags.includes(trimmedTerm)) {
      setSearchTags((prevTags) => [...prevTags, trimmedTerm]);
    }
    setSearchTerm(""); // Clear the input field
    setSearchParams({}); // Clear URL params (optional)
  };

  return (
    <header className="w-full bg-[#E8EDF1] py-2 px-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="bg-[#00A58E] text-white px-8 py-2 rounded">
          Logo
        </Link>

        <div className="flex-1 flex items-center justify-center gap-4 mx-4">
          <div className="flex-1 flex items-center relative bg-white rounded shadow-sm px-3 py-2">
            <div className="relative">
              <button
                className="flex items-center text-[#00A58E] font-medium pr-4 border-r border-gray-300"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {selectedCategory} <ChevronDown size={16} className="ml-1" />
              </button>
              {dropdownOpen && (
                <div className="absolute left-0 top-full mt-1 bg-white shadow-lg rounded-md w-32 z-10">
                  {["Buy", "Rent", "Sell"].map((category) => (
                    <button
                      key={category}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setSelectedCategory(category);
                        setDropdownOpen(false);
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Search size={20} className="text-gray-400 mx-3" />

            <div className="flex flex-wrap items-center flex-1 gap-2">
              {searchTags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center bg-[#E1FFFB69] text-[#00A58E] px-3 py-1 rounded-full border border-[#00A58E]"
                >
                  <span>{tag}</span>
                  <X
                    size={16}
                    className="ml-1 cursor-pointer"
                    onClick={() => removeTag(tag)}
                  />
                </div>
              ))}
              <input
                type="text"
                placeholder={searchTags.length ? "Add more" : "Search Here"}
                className="flex-1 outline-none border-none bg-transparent text-gray-700 pl-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
              />
            </div>

            <button
              className="bg-[#00A58E] text-white font-medium py-2 px-6 rounded ml-3"
              onClick={handleSearchSubmit}
            >
              Search
            </button>
          </div>
        </div>

        <div className="flex items-center pl-4 gap-4">
          <div className="flex items-center gap-2">
            {/* <div className="bg-[#00A58E] text-white p-2 rounded-full">
              <User size={16} />
            </div> */}
            <div className="pl-8 ">
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
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 border">
                      <LoginSystem />
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onLoginClick}
                  className={` "text-gray-800" 
                   text-xl hover:text-[#00A58E] flex items-center`}
                >
                  <div className="w-8 h-8 rounded-full bg-[#00A58E] relative">
                    <div
                      className="absolute left-[16.67%] right-[16.67%] top-[16.67%] bottom-[16.67%] bg-white"
                      style={{
                        maskImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E\")",
                        maskSize: "contain",
                        maskPosition: "center",
                        maskRepeat: "no-repeat",
                        WebkitMaskImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E\")",
                        WebkitMaskSize: "contain",
                        WebkitMaskPosition: "center",
                        WebkitMaskRepeat: "no-repeat",
                      }}
                    />
                  </div>
                  <span className="ml-2">Login/Register</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
