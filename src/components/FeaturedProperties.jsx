import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import newtag from "../assets/tagname.png";
import leaf from "../assets/Leaf.png";
import { motion } from "framer-motion";
import image1 from "../assets/crousal-component1.jpg";
import image2 from "../assets/crousal-component2.jpg";
import image3 from "../assets/variant3.jpg";

const properties = [
  { id: 1, title: "Premium Listings", count: "+2000", image: image2 },
  { id: 2, title: "Luxury Apartments", count: "+1000", image: image3 },
  { id: 3, title: "Ready to Move", count: "+5000", image: image1 },
  { id: 4, title: "Beachside Villas", count: "+750", image: image3 },
  { id: 5, title: "Penthouse Suites", count: "+300", image: image1 },
  { id: 6, title: "Countryside Homes", count: "+400", image: image2 },
  { id: 7, title: "Modern Condos", count: "+600", image: image3 },
  { id: 8, title: "Spacious Lofts", count: "+850", image: image1 },
];

const logos = Array(12).fill("https://via.placeholder.com/50");

const FeaturedProperties = () => {
  return (
    <div className="w-full max-w-auto mx-auto py-8 relative">
      <div className="absolute top-0 left-0 w-[60%] h-[420px] bg-gray-200 rounded-3xl z-0 pointer-events-none"></div>

      <div className="relative z-10 h-full flex flex-col">
        <h2 className="text-4xl md:text-5xl font-bold text-[#00A58E] self-start ml-14 mb-1">
          Featured Properties
        </h2>

        <div className="relative w-full">
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#00A58E] p-3 rounded-full shadow-md z-30"
            onClick={() => document.querySelector(".scroll-container").scrollBy({ left: -350, behavior: "smooth" })}
          >
            <FaChevronLeft className="text-white text-xl" />
          </button>

          <div className="scroll-container flex gap-4 w-full overflow-x-scroll mt-4 pb-4 scrollbar-hide pt-4 md:px-6 box-border" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {properties.map((property) => (
              <div
                key={property.id}
                className="relative min-w-[300px] sm:min-w-[350px] md:min-w-[350px] max-h-[700px] h-[450px] rounded-3xl overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105 z-20"
              >
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-auto transform scale-[1.01] object-cover"
                />
                <div>
                  <img
                    className="absolute top-8 right-0 w-[80px] h-[35px]"
                    src={newtag}
                    alt="New Tag"
                  />
                </div>
                <div className="absolute top-4 left-2 px-3 py-2 rounded w-[70%]">
                  <h3 className="text-[#004D41] text-[22px] md:text-[24px] lg:text-[27px] font-bold break-words">
                    {property.title}
                  </h3>
                  <span className="text-[20px] md:text-[20px] lg:text-[25px] text-[#697D95] font-semibold">
                    {property.count}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#00A58E] p-3 rounded-full shadow-md z-30"
            onClick={() => document.querySelector(".scroll-container").scrollBy({ left: 350, behavior: "smooth" })}
          >
            <FaChevronRight className="text-white text-xl" />
          </button>
        </div>

        <div className="mt-8 overflow-hidden w-full">
          <motion.div
            className="flex gap-6"
            initial={{ x: "-50%" }}
            animate={{ x: "0%" }}
            transition={{ repeat: Infinity, repeatType: "loop", duration: 12, ease: "linear" }}
          >
            {[...logos, ...logos].map((logo, index) => (
              <div key={index} className="flex flex-col items-center min-w-[100px]">
                <img
                  src={leaf}
                  alt="Company Logo"
                  className="w-[40px] h-[67px] sm:w-[75px] sm:h-[109px] md:w-[80px] md:h-[120px] lg:w-[100px] lg:h-[145px] object-contain"
                />
                <p className="text-[#00A58E] text-base font-bold mt-2">Name</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProperties;
