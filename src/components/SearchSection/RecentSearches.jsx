const recentSearches = ["1bhk flat in pune", "Apartment in Pune", "Chip"];

const RecentSearches = ({ searches = recentSearches, onRemove }) => {
  return (
    <div className="max-w-4xl mx-auto px-32 -mt-10">
      <div className="flex items-center text-[#00A58E]">
        <span className="mr-6 text- font-bold">Recent Searches:</span>
        <div className="flex flex-wrap gap-2">
          {searches.length > 0 ? (
            searches.map((search, index) => (
              <span
                key={`${search}-${index}`}
                className="bg-[#00A58E] text-white px-3 py-1 rounded-full flex items-center hover:bg-[#00A58E] transition-colors duration-200"
              >
                {search}
                <button
                  onClick={() => onRemove?.(index)}
                  className="ml-2 hover:text-[#00A58E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#00A58E] focus:ring-offset-1 rounded-full"
                  aria-label={`Remove ${search}`}
                >
                  &times;
                </button>
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-sm">(None yet)</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentSearches;