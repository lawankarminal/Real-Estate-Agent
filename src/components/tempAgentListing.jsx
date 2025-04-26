import { FaStar } from "react-icons/fa";

import Headers from "./Headers";
import SmallCrumb from "./SmallCrumb";
import { useNavigate } from "react-router-dom";
import image from "../assets/image.png";
import { useEffect } from "react";


//This card is super confirmed
const agentsData = [
  {
    id: 1,
    name: "Name of Dealer 1",
    location: "Location of Office 1",
    rating: 4.2,
    propertiesForSale: 115,
    propertiesForRent: 21,
    operatingAreas:
      "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
    about:
      "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
  },
  {
    id: 2,
    name: "Name of Dealer 2",
    location: "Location of Office 2",
    rating: 4.5,
    propertiesForSale: 95,
    propertiesForRent: 30,
    operatingAreas:
      "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
    about:
      "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
  },
  {
    id: 3,
    name: "Name of Dealer 2",
    location: "Location of Office 2",
    rating: 4.5,
    propertiesForSale: 95,
    propertiesForRent: 30,
    operatingAreas:
      "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
    about:
      "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
  },
  {
    id: 4,
    name: "Name of Dealer 2",
    location: "Location of Office 2",
    rating: 4.5,
    propertiesForSale: 95,
    propertiesForRent: 30,
    operatingAreas:
      "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
    about:
      "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
  },
  {
    id: 5,
    name: "Name of Dealer 2",
    location: "Location of Office 2",
    rating: 4.5,
    propertiesForSale: 95,
    propertiesForRent: 30,
    operatingAreas:
      "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
    about:
      "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
  },
  {
    id: 6,
    name: "Name of Dealer 2",
    location: "Location of Office 2",
    rating: 4.5,
    propertiesForSale: 95,
    propertiesForRent: 30,
    operatingAreas:
      "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
    about:
      "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
  },
  {
    id: 7,
    name: "Name of Dealer 2",
    location: "Location of Office 2",
    rating: 4.5,
    propertiesForSale: 95,
    propertiesForRent: 30,
    operatingAreas:
      "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
    about:
      "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
  },
];

function AgentCard({ agent, onViewDetails }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/agents/agent-details/${agent.id}`);
  };

  const handleShowProperties = () => {
    navigate(`/agents/${agent.id}/properties`);
  };

  return (
    <div className="max-w-[45rem] w-full bg-[#F5F7F9] rounded-xl p-5 text-left">
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="flex gap-4 flex-1">
          <img
            src={image}
            alt="Dealer Logo"
            className="w-[130px] h-[130px] border border-gray-300 rounded-md"
          />
          <div className="flex border-r-2 border-[#697D95] flex-col flex-1">
            <h2 className="text-xl text-[#252A31] font-[600]">{agent.name}</h2>
            <p className="text-md font-[500] mt-1 text-[#697D95]">
              {agent.location}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-sm text-[#4F5E71] font-medium">
                {agent.rating}
              </span>
              <div className="flex text-yellow-500">
                {[...Array(Math.round(agent.rating))].map((_, i) => (
                  <FaStar key={i} size={14} />
                ))}
              </div>
            </div>
            <p className="text-sm font-semibold mt-2 flex gap-3">
              {agent.propertiesForSale}{" "}
              <span className="font-normal text-[#697D95]">
                Properties for sale
              </span>
            </p>
            <p className="text-sm font-semibold flex gap-4">
              {agent.propertiesForRent}{" "}
              <span className="font-normal text-[#697D95]">
                Properties for rent
              </span>
            </p>
          </div>
        </div>
        <div className="flex-1 md:pl-2">
          <h3 className="text-base mt-4 text-[#252A31] font-[600]">
            Operating Areas :
          </h3>
          <p className="text-md font-[500] mt-1 text-[#697D95]">
            {agent.operatingAreas}
          </p>
        </div>
      </div>
      <div className="mt-2">
        <h3 className="text-base font-semibold text-[#252A31]">About</h3>
        <p className="text-sm font-[500] text-[#697D95]">{agent.about}</p>
      </div>
      <div className="flex gap-4 mt-4">
        <button  
        onClick={handleViewDetails}
        className="px-4 py-2 bg-[#ECF8F7] cursor-pointer hover:bg-[#BFE8E2] transition-all duration-300 ease-in-out font-[600] text-[#007F6D] text-sm rounded-sm">
          View Details
        </button>
        <button
          onClick={handleShowProperties}
          className="px-4 py-2 bg-[#00A991] cursor-pointer font-[600] text-[#ffffff] text-sm rounded-sm"
        >
          Show Properties
        </button>
      </div>
    </div>
  );
}

export default function AgentListingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Headers />

      <SmallCrumb />

      <div className="w-full min-h-screen bg-white bg-cover bg-center">
        <h1 className="px-[10%] py-8 pb-4 text-2xl font-medium text-left">
          {agentsData.length} results for Agents in Pune
        </h1>
        <div className="p-6 flex flex-col gap-6 items-center">
          {agentsData.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </>
  );
}
