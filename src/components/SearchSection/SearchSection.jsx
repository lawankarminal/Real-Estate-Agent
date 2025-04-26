import { useNavigate } from "react-router-dom";
import RecentSearches from "./RecentSearches";
import FloatingActions from "./FloatingActions";

const SearchSection = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  recentSearches
}) => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate({
      pathname: "/property-listings",
      search: `?category=${encodeURIComponent(selectedCategory)}&query=${encodeURIComponent(searchQuery)}`
    });
  };

  return (
    <div className="relative">
      {/* Background Image Section */}
      <div
        className="relative h-[400px] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/background.png')" }}
      >


{/* Search Container */}
<div className="absolute left-1/2 bottom-[-40px] transform -translate-x-1/2 w-full max-w-4xl z-10">
  <div className="bg-white rounded-lg shadow-lg p-6 mx-6 md:mx-14">
    {/* Category Tabs Container */}
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
            
            {/* Animated Horizontal Line */}
            <div className={`
              absolute left-0 -bottom-2 
              w-full h-[3px] 
              transition-transform duration-300 
              ${selectedCategory === category
                ? "bg-[#00A58E] translate-y-0"
                : " opacity-0 group-hover:opacity-100 group-hover:translate-y-0"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
    
    {/*  Horizontal Line */}
    <div className={`
      border-t border-gray-300 mt-6
      transition-all duration-300
      ${selectedCategory ? '-translate-y-6' : ''}
    `}></div>
            
    {/* Search Bar */}
    <div className="flex gap-14">
      <div className="flex-2 relative after:absolute after:right-[-1rem] after:top-1/2 after:-translate-y-1/2 after:h-24 after:w-px after:bg-[#b0b0b0] after:opacity-50">
        <select
          className="w-full p-2 text-lg text-[#00A58E] font-bold"
          value="All Residents"
        >
          <option>All Residents</option>
          <option>Houses</option>
          <option>All Apartments</option>
          <option>Plots</option>
        </select>
      </div>
              
      <div className="flex-1 gap-x-4 flex items-center px-4 border-b-2 border-gray-200">
        <svg
          className="h-5 w-5 text-[#00A58E]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search Here"
          className="w-full px-2 py-4 focus:outline-none text-gray-600"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
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

      {/* Gray Section with Components */}
      <div className="pt-32 pb-36 bg-gray-200 relative overflow-hidden rounded-b-3xl">
        <RecentSearches searches={recentSearches} />
        <FloatingActions />
      </div>
    </div>
  );
};

export default SearchSection;