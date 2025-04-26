import React, { useState } from "react";
import { Card } from "./ui/card";
import EnquiryModal from "./EnquiryModal";
import ScheduleVisitModal from "./ScheduleVisitModal";
import property1 from "../assets/property1.png";
import room1 from "../assets/room1.png";
import room2 from "../assets/room2.png";
import room3 from "../assets/room3.png";
import Tagname from "../assets/tagname.png";
import verified_property from "../assets/verified.png";

const PropertyCard = ({
  isNew = true,
  property,
  onClick,
  isVerified = false,
}) => {
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [showScheduleVisitModal, setShowScheduleVisitModal] = useState(false);

  const handleEnquiryClick = (e) => {
    e.stopPropagation();
    setShowEnquiryModal(true);
  };

  const handleScheduleVisitClick = (e) => {
    e.stopPropagation();
    setShowScheduleVisitModal(true);
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(property);
    }
  };

  function formatPrice(price) {
    if (price >= 10000000) {
      return `${(price / 10000000).toFixed(2)} Cr`; // Convert to Crores
    } else if (price >= 100000) {
      return `${(price / 100000).toFixed(2)} Lakh`; // Convert to Lakhs
    }
    return `${price} Rs`; // Default format
  }

  function timeAgo(dateString) {
    if (!dateString) return "Unknown Date"; // Handle null or undefined cases

    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (const [unit, seconds] of Object.entries(intervals)) {
      const count = Math.floor(diffInSeconds / seconds);
      if (count >= 1) {
        return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
      }
    }

    return "Just now";
  }

  return (
    <>
      <div className="bg-[#F6F8F9] mb-6 rounded-2xl" onClick={handleCardClick}>
        <Card className="bg-white rounded-2xl  shadow-xl overflow-hidden cursor-pointer hover:shadow-xl  transform transition-transform duration-300 hover:scale-105">
          {" "}
          {/*increased shadow from md to xl */}
          <div className="grid md:grid-cols-2 gap-4 bg-[#F6F8F9]">
            {" "}
            {/*I've removed from here p-4 */}
            {/* Images Section */}
            <div className="relative flex gap-0.5">
              <div className="w-3/4">
                <img
                  src={property.propertyImages[0] || property1}
                  srcSet={property1}
                  alt="Main Property"
                  className="w-full h-full object-cover rounded "
                />
              </div>
              <div className="w-1/4 flex flex-col gap-0.5">
                {[room1, room2, room3].map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Property View ${index + 1}`}
                    className="w-full h-1/3 object-cover "
                  />
                ))}
              </div>
            </div>
            {/* Details Section */}
            <div className="relative p-2 flex flex-col justify-around">
              {" "}
              {/*added p-2 here and istead justify-between i added around */}
              {isNew && (
                <img
                  src={Tagname}
                  className="absolute top-3 right-0 w-[75px]"
                  alt="New Tag"
                />
              )}
              <div>
                <h3 className="font-semibold text-lg text-[#252A31] flex items-center gap-2">
                  {property.name}
                  {"Luxury Apartmen"}
                  {isVerified && (
                    <img
                      src={verified_property}
                      className="size-4"
                      alt="Verified Property"
                    />
                  )}
                </h3>
                <p className="text-[#697D95] font-semibold text-left ">
                  {" "}
                  {/*I've removed from here mt-2 */}
                  {property.additionalDetails}
                </p>
              </div>
              <div className="flex flex-row gap-x-4">
                <div className=" border-gray-300 basis-24 border-r ">
                  <h3 className="text-lg font-bold text-left">
                    {formatPrice(property.priceDetails.expectedPrice)}
                  </h3>
                  <p className="text-[#697D95] text-base text-left">
                    {property.priceDetails.pricePerSqFt}/Sqft
                  </p>
                </div>

                <div className=" border-r basis-32 border-gray-300">
                  <h3 className="text-lg font-bold text-left">
                    {property.location.city}
                  </h3>
                  <p className="text-[#697D95] text-base text-left">
                    {property.location.area}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-left">
                    {property.flatType}
                  </h3>
                  <p className="text-[#697D95] text-base">
                    {property.propertyStatus}
                  </p>
                </div>
              </div>
              <div className=" flex gap-x-2">
                <h3 className="text-sm font-semibold text-left">Highlights:</h3>
                <div className="flex gap-x-2 ">
                  {property?.nearbyFacilities?.map((highlight, index) => (
                    <span
                      key={index}
                      className="px-2 py-1  bg-[#E7EAEC] text-[#697D95] text-xs rounded"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-xs text-[#697D95] text-left ">
                {property.description}
                {`Spacious ${property.flatType} with modern interiors...`}
              </p>
              <div className="flex flex-wrap justify-between items-center w-full mt-4  ">
                <div className="text-xs ">
                  <p className="text-[#697D95] text-left mb-2">
                    Dealer &nbsp;&nbsp; {timeAgo(property.createdAt)}
                  </p>
                  <p className=" text-left text-[#252A31] font-[500]">
                    {property.agentDetails.name}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    className="px-3 py-2 border border-[#00BFA5] rounded bg-[#ECF8F7] text-[#007F6D] text-xs hover:bg-[#BFE8E2] hover:text-[#006657] transition-colors"
                    onClick={handleEnquiryClick}
                  >
                    Send Enquiry
                  </button>
                  <button
                    className="px-3 py-2 bg-[#00A58E] rounded text-white text-xs hover:bg-[#00A58E]/90 transition-colors"
                    onClick={handleScheduleVisitClick}
                  >
                    Schedule Visit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <EnquiryModal
        isOpen={showEnquiryModal}
        onClose={() => setShowEnquiryModal(false)}
        property={property}
        propertyprice={formatPrice(property.priceDetails.expectedPrice)}
      />
      <ScheduleVisitModal
        isOpen={showScheduleVisitModal}
        onClose={() => setShowScheduleVisitModal(false)}
        property={property}
        propertyprice={formatPrice(property.priceDetails.expectedPrice)}
      />
    </>
  );
};

export default PropertyCard;
