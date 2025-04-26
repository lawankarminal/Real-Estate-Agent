import React, { useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const properties = Array.from({ length: 5 }, (_, index) => ({
  id: `property-${index}`, // Unique ID
  title: "Card title",
  subHeading: "Sub Heading",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu sit nibh consectetur.",
  image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
}));

const Section = ({ title }) => {
  const scrollRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);
  const [likedProperties, setLikedProperties] = useState({});

  const toggleLike = (id) => {
    setLikedProperties((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = container.clientWidth * 0.8;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else if (
        direction === "right" &&
        container.scrollLeft < maxScrollLeft
      ) {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div
      className="w-full text-left mx-auto py-8   relative overflow-visible"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      {" "}
      {/*changed the padding here py-8 and px-4*/}
      <div className="absolute top-0 left-0 w-[60%] h-[420px] bg-gray-200 rounded-3xl z-0 pointer-events-none"></div>
      <div className="relative z-10 w-full  flex flex-col">
        <h2 className="text-4xl md:text-5xl font-bold text-[#00A58E] self-start ml-14 mb-1">
          {title}
        </h2>

        <div className="relative">
          {showArrows && (
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#00A58E] text-white shadow-md p-3 rounded-full z-50 pointer-events-auto hover:bg-[#007A69] transition-all duration-300"
              onClick={() => scroll("left")}
            >
              <FiChevronLeft size={28} />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex overflow-x-auto relative space-x-4 scrollbar-hide mt-4 md:px-4 pb-8 pt-4 no-scrollbar scroll-smooth scroll-snap-x z-20"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-lg border-[#007A69] border-[1.5px] overflow-visible flex flex-col transform transition-transform duration-300 hover:scale-105 hover:z-30 w-[90%] sm:w-[440px] max-w-[576px] max-h-[585px] flex-shrink-0 cursor-pointer relative scroll-snap-start"
              >
                <div className="h-56 ">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full rounded-t-lg object-cover"
                  />
                  {/*<div className="absolute top-2 right-2 border-[2px] border-[#00A58E] p-2 rounded-md">
                    <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 18.35L8.55 17.03C3.4 12.36 0 9.27 0 5.5C0 2.41 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.08C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.41 20 5.5C20 9.27 16.6 12.36 11.45 17.03L10 18.35Z" fill="#F1474A" />
                    </svg>
                  </div>*/}
                </div>
                <div className="p-4 flex relative justify-between h-full flex-col">
                  <button onClick={() => toggleLike(property.id)} className="absolute top-3 right-3 border-[2px] border-[#00A58E] p-2 rounded-md">
                    <svg
                      width="20"
                      height="20"
                      viewBox="-1 0 21 19"
                      
                      fill={likedProperties[property.id] ? "#F1474A" : "none"}
                      stroke={likedProperties[property.id] ? "#F1474A" : "#00A58E"}
                      strokeWidth="2"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 18.35L8.55 17.03C3.4 12.36 0 9.27 0 5.5C0 2.41 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.08C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.41 20 5.5C20 9.27 16.6 12.36 11.45 17.03L10 18.35Z"
                        
                      />
                    </svg>
                  </button>
                  <h3 className="text-xl font-bold text-[#007A69]">
                    {property.title}
                  </h3>
                  <h4 className="text-lg font-bold text-[#697D95]">
                    {property.subHeading}
                  </h4>
                  <p className="text-sm font-[400] text-[#697D95] mb-2">
                    {property.description}
                  </p>
                  <div className="flex space-x-2">
                    <button className="px-3 py-2 text-sm font-medium bg-[#00A58E] text-white rounded-lg transition-colors">
                      Send Enquiry
                    </button>
                    <button className="px-3 py-2 text-sm font-medium border border-2 border-[#00A58E] text-[#00A58E] rounded-lg transition-colors">
                      Schedule Visit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {showArrows && (
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#00A58E] text-white shadow-md p-3 rounded-full z-50 pointer-events-auto hover:bg-[#007A69] transition-all duration-300"
              onClick={() => scroll("right")}
            >
              <FiChevronRight size={28} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Recommendations = () => <Section title="Recommendations" />;
const PropertyOnSale = () => <Section title="Properties on Sale" />;

const PageOne = () => {
  return (
    <div className="relative z-0 overflow-visible">
      <Recommendations />
      <PropertyOnSale />
    </div>
  );
};

export default PageOne;
