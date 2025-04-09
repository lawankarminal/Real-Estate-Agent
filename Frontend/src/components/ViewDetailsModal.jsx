import React from "react";
import { X } from "lucide-react";
import similar_prop1 from "../assets/similar_prop1.png";
import similar_prop2 from "../assets/similar_prop2.png";
import similar_prop3 from "../assets/similar_prop3.svg";

const ViewDetailsModal = ({ isOpen, onClose, property, propertyprice }) => {
  const similarProperties = [
    {
      id: 1,
      image: [similar_prop1],
      title: "Card title",
      subHeading: "Sub Heading",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu et nisl consectetur.",
    },
    {
      id: 2,
      image: [similar_prop2],
      title: "Card title",
      subHeading: "Sub Heading",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu et nisl consectetur.",
    },
    {
      id: 3,
      image: [similar_prop3],
      title: "Card title",
      subHeading: "Sub Heading",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu et nisl consectetur.",
    },
    {
      id: 3,
      image: [similar_prop3],
      title: "Card title",
      subHeading: "Sub Heading",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu et nisl consectetur.",
    },
    {
      id: 3,
      image: [similar_prop3],
      title: "Card title",
      subHeading: "Sub Heading",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu et nisl consectetur.",
    },
  ];

  function formatDate(dateString) {
    if (!dateString) return "Unknown Date"; // Handle undefined/null cases
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = date
      .toLocaleDateString("en-GB", options)
      .toUpperCase();

    return formattedDate
      .replace(",", "")
      .replace(/(\d{2}) (\w+) (\d{4})/, "$1TH $2 $3");
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 md:p-0">
      <div className="bg-white  w-full max-w-[1000px] max-h-[90vh] overflow-y-auto relative">
        <div className="sticky top-0 z-10 bg-white">
          <div className="flex justify-between items-center border-b pb-2 pt-0 bg-black bg-opacity-85 ">
            <h2 className="text-base md:text-lg font-medium text-white pl-1">
              Requested details of Advertiser.
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 pr-1"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="bg-gray-50 p-4 text-sm border-b">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <p className="text-gray-500 text-left text-lg font-semibold uppercase mb-1">
                POSTED BY DEALER:
              </p>
              <p className="text-green-500 text-left text-base ">
                {property?.agentDetails?.phoneNumber}
              </p>
              <p className="text-green-500 text-left text-base ">
                {property?.agentDetails?.email}
              </p>
              <p className="text-gray-600 text-left text-sm">
                {property?.agentDetails?.name}
              </p>
            </div>
            <div className="mt-2 md:mt-0 md:text-right">
              <p className="text-gray-500 text-left md:text-lg uppercase mb-1">
                POSTED ON {formatDate(property?.createdAt) || "Unknown Date"}
              </p>
              <p className="text-[#697D95]  text-left text-lg">
                {propertyprice} | Building Name
              </p>
              <p className="text-gray-600 text-left text-xs">
                {property?.priceDetails?.pricePerSqFt} SQ.FT. |{" "}
                {property?.flatType || "Unknown Type"} Residential Apartment
              </p>
            </div>
          </div>
        </div>
        <div className="pb-3 pt-3 bg-black bg-opacity-90"></div>

        <div className="p-4">
          <h2 className="text-xl font-bold mb-6 text-left text-[#697D95] ">
            Similar Properties
          </h2>
          <div className="flex overflow-x-auto relative space-x-4 mt-4 md:px-2 pb-4 scroll-container">
            {similarProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-lg snap-start border-[#007A69] border-[1.5px] overflow-visible flex flex-col transform transition-transform duration-300 hover:scale-105 hover:z-50 sm:w-[360px] flex-shrink-0 cursor-pointer relative"
              >
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-40 rounded-lg object-cover"
                  />
                  <div className="absolute top-[170px] right-3 border-[2px] border-[#00A58E] p-2 rounded-md">
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
                  <h3 className="text-lg font-semibold text-left text-[#00A58E]">
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
    </div>
  );
};

export default ViewDetailsModal;
