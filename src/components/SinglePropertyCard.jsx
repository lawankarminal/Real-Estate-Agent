import React, { useState } from "react";
import EnquiryModal from "./EnquiryModal";
import ScheduleVisitModal from "./ScheduleVisitModal";
import Tagname from "../assets/tagname.png";
import placeholderImage from "../assets/image.png";

const SinglePropertyCard = ({ property, onClick }) => {
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
    if (onClick) onClick(property);
  };

  return (
    <>
      <div className="bg-[#F6F8F9] w-[48rem] mb-4 rounded-2xl" onClick={handleCardClick}>
        <div className="bg-[#F6F8F9] rounded-2xl overflow-hidden cursor-pointer transform transition-transform duration-200 ease-in-out hover:scale-105">
          <div className="grid md:grid-cols-2 gap-4 bg-[#F6F8F9]">
            
            {/* Images Section */}
            <div className="relative flex gap-0.5">
              <div className="w-full md:w-3/4">
                <img
                  src={property.propertyImages.length > 0 ? property.propertyImages[0] : placeholderImage}
                  alt={property.flatType || "Property Image"}
                  className="w-full h-full object-cover rounded"
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="relative p-2 flex flex-col justify-around">
              {property.propertyVisibility.featuredListing && (
                <img src={Tagname} className="absolute top-4 right-0 w-[75px]" alt="Featured" />
              )}
              
              <div>
                <h3 className="font-semibold text-lg text-[#252A31] flex items-center gap-2">
                  {property.flatType || "No Name Available"}
                </h3>
                <p className="text-[#697D95] font-semibold text-left">
                  {property.location.area || "Unknown Location"}, {property.location.city || "Unknown City"}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-x-4">
                <div className="border-gray-300 sm:basis-24 border-r">
                  <h3 className="text-lg font-bold text-left">
                    ₹{property.priceDetails.expectedPrice.toLocaleString() || "N/A"}
                  </h3>
                  <p className="text-[#697D95] text-base text-left">
                    {property.priceDetails.pricePerSqFt ? `₹${property.priceDetails.pricePerSqFt}/Sqft` : "N/A"}
                  </p>
                </div>

                <div className="border-r sm:basis-40 border-gray-300">
                  <h3 className="text-lg font-bold text-left">{property.areaDetails.carpetArea || "N/A"} Sqft</h3>
                  <p className="text-[#697D95] text-base text-left">{property.propertyStatus || "Unknown"}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold">{property.flatType || "N/A"}</h3>
                  <p className="text-[#697D95] text-base">{property.propertyAge ? `${property.propertyAge} years old` : "N/A"}</p>
                </div>
              </div>

              <div className="flex gap-x-2">
                <h3 className="text-sm font-semibold text-left">Amenities:</h3>
                <div className="flex gap-x-2 flex-wrap">
                  {property.amenities && property.amenities.length > 0 ? (
                    property.amenities.map((amenity, index) => (
                      <span key={index} className="px-2 py-1 bg-[#E7EAEC] text-[#697D95] text-xs rounded">
                        {amenity}
                      </span>
                    ))
                  ) : (
                    <span className="text-[#697D95] text-xs">No Amenities Available</span>
                  )}
                </div>
              </div>

              <p className="text-xs text-[#697D95] text-left">
                {property.additionalDetails || "No Description Available"}
              </p>

              <div className="flex flex-wrap justify-between items-center w-full mt-4">
                <div className="text-xs">
                  <p className="text-[#697D95] text-left mb-2">
                    {property.agentDetails.name || "Unknown Dealer"} &nbsp;&nbsp; {new Date(property.createdAt).toDateString()}
                  </p>
                  <p className="text-left text-[#252A31] font-[500]">{property.agentDetails.email || "No Email Provided"}</p>
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
        </div>
      </div>

      <EnquiryModal isOpen={showEnquiryModal} onClose={() => setShowEnquiryModal(false)} property={property} />
      <ScheduleVisitModal isOpen={showScheduleVisitModal} onClose={() => setShowScheduleVisitModal(false)} property={property} />
    </>
  );
};

export default SinglePropertyCard;
