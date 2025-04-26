import React, { useState } from "react";

import Breadcrumb from "./Breadcrumb";
import { Card } from "./ui/card";
import EnquiryModal from "./EnquiryModal";
import ScheduleVisitModal from "./ScheduleVisitModal";
import property1 from "../assets/property1.png";
import room1 from "../assets/room1.png";
import room2 from "../assets/room2.png";
import room3 from "../assets/room3.png";
import similar_prop1 from "../assets/similar_prop1.png";
import similar_prop2 from "../assets/similar_prop2.png";
import similar_prop3 from "../assets/similar_prop3.svg";

const PropertyDetails = ({ property, onBack }) => {
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [showScheduleVisitModal, setShowScheduleVisitModal] = useState(false);
  // Default property data if none is provided
  const defaultProperty = {
    id: 1,
    name: "Name of Building",
    building: "2BHK Flat in Hiranandani Estate, Pune",
    price: "3.5 Cr",
    pricePerSqft: "17,692/sqft",
    area: "850 sqft",
    areaType: "Super Built-up Area",
    type: "2BHK",
    status: "Ready",
    highlights: ["East Facing", "Close to School"],
    detail:
      "Lorem ipsum dolor sit amet consectetur. Ut morbi sed consectetur facilisis. Erat sit nulla elit ultricies. Congue magna nulla varius bibendum massa. Ultricies est lorem condimentum nisi turpis bibendum placerat.",
    dealer: {
      name: "Avi Patel",
      phone: "+91**83****09",
      email: "*******@gmail.com",
    },
    postedDate: "04TH JAN 2025",
    propertyType: "2BHK Residential Apartment",
    amenities: [
      { name: "Street Light", icon: "🚦" },
      { name: "Water Storage", icon: "💧" },
      { name: "Parking Service", icon: "🅿️" },
      { name: "Gym/Fitness Area", icon: "🏋️" },
      { name: "Play Area", icon: "🎮" },
      { name: "Intercom Service", icon: "📞" },
      { name: "Network Connectivity", icon: "🌐" },
      { name: "Lift Service", icon: "🔼" },
      { name: "Park", icon: "🌳" },
      { name: "Waste Disposal", icon: "🗑️" },
      { name: "Swimming Pool", icon: "🏊" },
    ],
    images: [property1, room1, room2, room3],
    similarProperties: [
      {
        id: 101,
        title: "Card title",
        subHeading: "Sub Heading",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu et nisl consectetur.",
        image: [similar_prop1],
      },
      {
        id: 102,
        title: "Card title",
        subHeading: "Sub Heading",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu et nisl consectetur.",
        image: [similar_prop2],
      },
      {
        id: 103,
        title: "Card title",
        subHeading: "Sub Heading",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu et nisl consectetur.",
        image: [similar_prop3],
      },
      {
        id: 103,
        title: "Card title",
        subHeading: "Sub Heading",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu et nisl consectetur.",
        image: [similar_prop3],
      },
      {
        id: 103,
        title: "Card title",
        subHeading: "Sub Heading",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu et nisl consectetur.",
        image: [similar_prop3],
      },
    ],
  };

  // Use the provided property data or the default if none is provided
  const propertyData = property
    ? {
        ...defaultProperty,
        ...property,
        // Ensure nested objects are properly structured
        dealer: {
          name: property.dealer || "Avi Patel",
          phone: "+91**83****09",
          email: "*******@gmail.com",
        },
        // Ensure these arrays exist
        amenities: defaultProperty.amenities,
        images: defaultProperty.images,
        similarProperties: defaultProperty.similarProperties,
        building: property.bulding || defaultProperty.building, // Fix typo in property name
        postedDate: "04TH JAN 2025",
        propertyType: "2BHK Residential Apartment",
      }
    : defaultProperty;

  const handleEnquiryClick = () => {
    setShowEnquiryModal(true);
  };
  const handleScheduleVisityClick = () => {
    setShowScheduleVisitModal(true);
  };

  return (
    <div className="min-h-screen bg-[#F6F8F9]">
      <div className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-4 flex items-center text-primary hover:text-primary/80"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Listings
        </button>

        {/* Main Property Info Section */}
        <Card className="bg-[#E8EDF1] flex rounded-2xl shadow-lg overflow-hidden p-4">
          <div className="flex flex-col md:flex-row mb-8">
            {/* Left Column - Property Details */}
            <div className="md:w-1/2 pl-20 pr-20 ">
              <div className="flex flex-row mb-4  mt-6 ">
                <div className="border-r pr-4  border-gray-300">
                  <h2 className="text-xl font-bold">{propertyData.price}</h2>
                  <p className="text-sm text-gray-500">
                    {propertyData.pricePerSqft}/sqft
                  </p>
                </div>
                <div className="border-r pr-3 pl-3 border-gray-300">
                  <h2 className="text-xl font-bold">{propertyData.area}</h2>
                  <p className="text-sm text-gray-500">
                    {propertyData.areaType}
                  </p>
                </div>
                <div className="pl-3">
                  <h2 className="text-xl font-bold">{propertyData.type}</h2>
                  <p className="text-sm text-gray-500">{propertyData.status}</p>
                </div>
              </div>

              <div className="text-left mb-4">
                <h1 className="text-2xl font-bold pt-6">{propertyData.name}</h1>
                <p className="text-xl text-gray-600 pt-3">
                  {propertyData.building}
                </p>
              </div>

              <div className="mb-6 text-left">
                <h3 className="text-lg font-semibold mb-2">Overview</h3>
                <p className="text-gray-600 text-sm">{propertyData.detail}</p>
              </div>

              <div className="flex gap-3 justify-center pt-6">
                <button
                  className="bg-white border border-[#00A58E] text-[#00A58E] px-4 py-1.5 rounded text-sm hover:bg-[#BFE8E2] hover:text-[#006657] transition-colors"
                  onClick={handleEnquiryClick}
                >
                  Send Enquiry
                </button>
                <button
                  className="bg-[#00A58E] text-white px-4 py-1.5 rounded text-sm hover:bg-[#00A58E]/90 transition-colors"
                  onClick={handleScheduleVisityClick}
                >
                  Schedule Visit
                </button>
              </div>
            </div>

            {/* Right Column - Property Images */}
            <div className="flex w-1/2 gap-1 rounded-md pr-16 pt-6   ">
              <div className="w-3/4  ">
                <img
                  src={propertyData.images[0]}
                  alt="Main Property"
                  className="w-full h-full object-cover rounded-l-lg"
                />
              </div>
              <div className="w-1/4 flex flex-col rounded-md">
                {propertyData.images.slice(1, 4).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Property View ${index + 1}`}
                    className="w-full h-1/3 object-cover"
                  />
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Amenities Section */}
        <div className="bg-[#F6F8F9] rounded-lg shadow-md p-6 mb-8 mt-6">
          <h2 className="text-xl font-bold mb-6 text-left">Amenities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {propertyData.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-xl">{amenity.icon}</span>
                <span className="text-gray-700">{amenity.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* About Advertiser Section */}
        <div className="bg-[#F6F8F9] flex rounded-2xl shadow-lg overflow-hidden p-4">
          <div className="bg-[#F6F8F9] p-6 mb-8 md:w-1/2">
            <h2 className="text-xl font-bold mb-6 text-left">
              About Advertiser
            </h2>
            <div className="flex flex-col md:flex-row justify-between">
              <div className="text-left mb-4 md:mb-3 ">
                <p className="text-gray-500 mb-1 font-medium">
                  POSTED BY DEALER:
                </p>
                <p className="font-medium">
                  {propertyData.dealer.phone} | {propertyData.dealer.email}
                </p>
                <p className="text-gray-500 text-xs">
                  {propertyData.dealer.name}
                </p>
              </div>
              <div className="md:w-2/3 text-left  ">
                <p className="text-gray-500 mb-1  font-medium">
                  POSTED ON {propertyData.postedDate}
                </p>
                <p className="font-medium">
                  {propertyData.price} | {propertyData.name}
                </p>
                <p className="text-gray-500 text-xs">
                  {propertyData.area} | {propertyData.propertyType}
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                className="bg-white border border-[#00A58E] text-[#00A58E] px-4 py-1.5 rounded text-sm hover:bg-[#BFE8E2] hover:text-[#006657] transition-colors"
                onClick={handleEnquiryClick}
              >
                Send Enquiry
              </button>
              <button
                className="bg-[#00A58E] text-white px-4 py-1.5 rounded text-sm hover:bg-[#00A58E]/90 transition-colors"
                onClick={handleScheduleVisityClick}
              >
                Schedule Visit
              </button>
            </div>
          </div>
        </div>

        {/* Similar Properties Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-6 text-left mt-6">
            Similar Properties
          </h2>
          <div className="flex overflow-x-auto relative space-x-4 mt-4 md:px-2 pb-8 pt-4 scroll-container ">
            {propertyData.similarProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-lg snap-start border-[#007A69] border-[1.5px] overflow-visible flex flex-col transform transition-transform duration-300 hover:scale-105 hover:z-50 w-[70%] sm:w-[380px] flex-shrink-0 cursor-pointer relative"
              >
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute top-[200px] right-3 border-[2px] border-[#00A58E] p-2 rounded-md">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 18.35L8.55 17.03C3.4 12.36 0 9.27 0 5.5C0 2.41 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.08C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.41 20 5.5C20 9.27 16.6 12.36 11.45 17.03L10 18.35Z"
                        fill="#F1474A"
                      />
                    </svg>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-left">
                    {property.title}
                  </h3>

                  <p className="text-sm text-gray-500 text-left">
                    {property.subHeading}
                  </p>
                  <p className="text-gray-600 text-sm mt-2 text-left">
                    {property.description}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <button className="bg-[#00A58E] text-white px-4 py-1 rounded text-sm">
                      Details
                    </button>
                    <button className="border border-[#00A58E] text-[#00A58E] px-4 py-1 rounded text-sm">
                      Review
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <EnquiryModal
        isOpen={showEnquiryModal}
        onClose={() => setShowEnquiryModal(false)}
        property={propertyData}
      />

      <ScheduleVisitModal
        isOpen={showScheduleVisitModal}
        onClose={() => setShowScheduleVisitModal(false)}
        property={property}
      />
    </div>
  );
};

export default PropertyDetails;
