import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import RecentSearches from "./RecentSearches";
import FloatingActions from "./FloatingActions";

const SearchSection = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  recentSearches,
  setSearchTags, // To update Header search bar
}) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();

  // Clear search input when returning to the search page
  useEffect(() => {
    if (location.pathname === "/") {
      setSearchQuery("");
    }
  }, [location.pathname]);

  // Sync search params with query state
  useEffect(() => {
    setSearchParams({
      category: selectedCategory || "all",
      query: searchQuery || "",
    });
  }, [searchQuery, selectedCategory, setSearchParams]);

  // Handle input changes
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setErrorMessage(""); // Clear error message when user types
  };

  // Handle search submission
  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) {
      setErrorMessage("Please enter a city before searching!");
      return;
    }

    const savedSearches = JSON.parse(localStorage.getItem("searchTags")) || [];
    if (!savedSearches.includes(trimmedQuery)) {
      const updatedSearches = [...savedSearches, trimmedQuery];
      localStorage.setItem("searchTags", JSON.stringify(updatedSearches));
      setSearchTags(updatedSearches);
    }

    navigate({
      pathname: "/property-listings",
      search: `?category=${encodeURIComponent(
        selectedCategory
      )}&query=${encodeURIComponent(trimmedQuery)}`,
    });
  };

  return (
    <div className="relative">
      {/* Background Section */}
      <div
        className="relative h-[400px] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/background.png')" }}
      >
        {/* Search Container */}
        <div className="absolute left-1/2 bottom-[-40px] transform -translate-x-1/2 w-full max-w-4xl z-10">
          <div className="bg-white rounded-lg shadow-lg p-6 mx-6 md:mx-14">
            {/* Category Tabs */}
            <div className="mb-3 overflow-x-visible">
              <div className="flex space-x-12 md:space-x-14 px-14 pb-2 w-max min-w-full">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`relative text-xl md:text-2xl whitespace-nowrap font-semibold pb-6 ${
                      selectedCategory === category
                        ? "text-[#00A58E]"
                        : "text-[#697D95]"
                    } group hover:text-[#00A58E] transition-all duration-300 min-w-fit`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                    <div
                      className={`absolute left-0 -bottom-2 w-full h-[3px] transition-transform duration-300 ${
                        selectedCategory === category
                          ? "bg-[#00A58E] translate-y-0"
                          : "opacity-0 group-hover:opacity-100 group-hover:translate-y-0"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            {/*  Horizontal Line */}
            <div
              className={`
      border-t border-gray-300 mt-6
      transition-all duration-300
      ${selectedCategory ? "-translate-y-6" : ""}
    `}
            ></div>

            {/* Search Bar */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-14">
                <div className="flex-2 relative after:absolute after:right-[-1rem] after:top-1/2 after:-translate-y-1/2 after:h-24 after:w-px after:bg-[#b0b0b0] after:opacity-50">
                  <select
                    className="w-full p-2 text-lg text-[#00A58E] font-bold"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="All Residents">All Residents</option>
                    <option value="Houses">Houses</option>
                    <option value="Apartments">Apartments</option>
                    <option value="Plots">Plots</option>
                  </select>
                </div>

                <div className="flex-1 gap-x-4 flex items-center px-4 border-b-2 border-gray-200 relative">
                  <input
                    type="text"
                    placeholder="Search Here"
                    className="w-full px-2 py-4 focus:outline-none text-gray-600"
                    value={searchQuery}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSearch();
                      }
                    }}
                  />
                  {errorMessage && (
                    <p className="text-red-500 text-sm absolute -left-1 -bottom-6">
                      {errorMessage}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleSearch}
                  className="bg-[#00A58E] text-white px-8 h-[40px] rounded-lg hover:bg-emerald-600 transition-colors duration-200 flex items-center justify-center"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gray Section with Components */}
      <div className="pt-32 pb-36 bg-gray-200 relative overflow-hidden rounded-b-3xl">
        <RecentSearches searches={recentSearches} />
        <FloatingActions />
      </div>
    </div>
  );
};

export default SearchSection;
