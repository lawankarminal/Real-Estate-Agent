import React, { useState } from "react";
import { Search, ChevronDown, X, User } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTags, setSearchTags] = useState(["Hiranandani Estate"]);

  const removeTag = (tagToRemove) => {
    setSearchTags(searchTags.filter((tag) => tag !== tagToRemove));
  };

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

        {/* Search and Navigation */}
        <div className="flex-1 flex items-center justify-center gap-4 mx-4">
          {/* Buy Dropdown */}

          {/* Search Bar */}
          <div className="flex-1 flex items-center relative">
            <div className="flex items-center bg-white rounded px-2 py-2 w-full">
              <div className="flex items-center bg-white rounded px-2 py-2 cursor-pointer border-r ">
                <span className="text-[#00A58E] font-medium mr-1">Buy</span>
                <ChevronDown size={16} className="text-[#00A58E] " />
              </div>
              <Search size={20} className="text-gray-400 mr-2 pl-2" />

              <div className="flex flex-wrap items-center flex-1 gap-1">
                {searchTags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-blue-50 text-blue-600 text-sm px-2 py-1 rounded-full"
                  >
                    {tag}
                    <X
                      size={14}
                      className="ml-1 cursor-pointer"
                      onClick={() => removeTag(tag)}
                    />
                  </div>
                ))}

                <input
                  type="text"
                  placeholder="Search Here"
                  className="flex-1 outline-none border-none bg-transparent text-gray-700 pl-1"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="bg-[#00A58E] text-white font-medium py-2 px-6 rounded">
                Search
              </button>
            </div>
          </div>

          {/* Search Button */}
        </div>

        {/* Post Property Button and User */}
        <div className="flex items-center pl-4 gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-[#00A58E] text-white p-2 rounded-full">
              <User size={16} />
            </div>
            <span className="text-gray-500">Surname N.</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
