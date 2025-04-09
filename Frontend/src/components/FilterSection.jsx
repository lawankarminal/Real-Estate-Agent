import React from "react";
import useFilterStore from "../hooks/useFilterStore";

// Reusable FilterTag component
const FilterTag = ({ name, label, active, onToggle }) => (
  <button
    onClick={() => onToggle(name)}
    className={`px-2 py-2 rounded-full text-sm flex items-center gap-1 transition-colors ${
      active
        ? "bg-[#E1FFFB69] text-[#00A58E] text-base border-2 border-[#00A58E]"
        : "bg-[#E1FFFB69] text-[#A0ABC0] hover:bg-gray-200 text-sm border border-[#A0ABC0]"
    }`}
  >
    {label}
    {active ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    )}
  </button>
);

const FilterSection = ({ onFilterChange }) => {
  const {
    filters,
    budget,
    budgetDisplay,
    toggleFilter,
    clearFilters,
    setBudget,
  } = useFilterStore();

  const handleFilterToggle = (filterName) => {
    toggleFilter(filterName);
    if (onFilterChange) {
      onFilterChange({ ...filters, [filterName]: !filters[filterName] });
    }
  };

  const handleBudgetChange = (e) => {
    setBudget(parseInt(e.target.value));
  };

  const renderFilterTags = () => {
    const filterData = [
      { name: "readyToMove", label: "Ready to Move" },
      { name: "bhk3", label: "3BHK" },
      { name: "rentalProperties", label: "Rental Properties" },
      { name: "bhk2", label: "2BHK" },
      { name: "residentialProperties", label: "Residential Properties" },
      { name: "verified", label: "Verified" },
      { name: "underConstruction", label: "Under Construction" },
    ];

    return filterData.map((filter) => (
      <FilterTag
        key={filter.name}
        name={filter.name}
        label={filter.label}
        active={filters[filter.name]}
        onToggle={handleFilterToggle}
      />
    ));
  };

  return (
    <div className="container mx-auto px- py-6">
      <div className="bg-[#F6F8F9] rounded-lg shadow p-6 mb-2">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Apply Filters</h2>
          <button
            className="text-[#00BFA5] text-sm hover:underline"
            onClick={clearFilters}
          >
            Clear All
          </button>
        </div>
        <div className="flex flex-wrap gap-3">{renderFilterTags()}</div>
      </div>

      <div className="bg-[#F6F8F9] rounded-lg shadow p-6 mb-2">
        <div className="flex items-center mb-2">
          <h2 className="text-lg font-semibold text-left">
            Verified Properties only
          </h2>
          <div className="ml-auto">
            <div
              className={`w-12 h-6 rounded-full flex items-center cursor-pointer transition-colors ${
                filters.verified ? "bg-[#00BFA5]" : "bg-gray-200"
              }`}
              onClick={() => handleFilterToggle("verified")}
            >
              <div
                className={`w-5 h-5 rounded-full shadow-md transform transition-transform ${
                  filters.verified
                    ? "translate-x-6 bg-white"
                    : "translate-x-0 bg-white"
                }`}
              ></div>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500 text-left">
          Show verified properties only.
        </p>
      </div>

      {/* Budget Section */}
      <div className="bg-[#F6F8F9] rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Budget</h2>
        <div className="text-[#00BFA5] font-semibold mb-2">{budgetDisplay}</div>
        <div className="relative mb-4">
          <input
            type="range"
            min="0"
            max="5000" // ✅ Supports up to 50 Cr
            step="10" // ✅ Smooth transition
            value={budget}
            onChange={handleBudgetChange}
            className="w-full h-2 bg-gray-200 rounded-full appearance-none"
            style={{ height: "0.5rem" }}
          />
          <div
            className="absolute top-0 left-0 h-2 bg-[#00BFA5] rounded-full"
            style={{ width: `${(budget / 5000) * 100}%` }}
          ></div>
          <div
            className="absolute top-0 h-5 w-5 bg-white border-2 border-[#00BFA5] rounded-full -mt-1.5"
            style={{ left: `${(budget / 5000) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>0</span>
          <span>50 Cr</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
