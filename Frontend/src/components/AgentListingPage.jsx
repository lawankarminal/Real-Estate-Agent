import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Headers from "./Headers";
import SmallCrumb from "./SmallCrumb";
import image from "../assets/image.png";
import { dummyAgent } from "../DonotUsedata/dummyAgentData"; // now an array

const API_ENDPOINT = "http://localhost:5000/api/v1/agent/agent-users";

function AgentCard({ agent }) {
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
            alt="Agent"
            className="w-[130px] h-[130px] border border-gray-300 rounded-md"
          />
          <div className="flex border-r-2 border-[#697D95] flex-col flex-1">
            <h2 className="text-xl text-[#252A31] font-[600]">{agent.name}</h2>
            <p className="text-md font-[500] mt-1 text-[#697D95]">{agent.locality}</p>
            <p className="text-sm text-[#697D95] font-semibold mt-2">
              <span className="text-[#252A31]">{agent.propertiesForSale}</span> Properties for sale
            </p>
            <p className="text-sm text-[#697D95] font-semibold">
              <span className="text-[#252A31]">{agent.propertiesForRent}</span> Properties for rent
            </p>
          </div>
        </div>
        <div className="flex-1 md:pl-2">
          <h3 className="text-base mt-4 text-[#252A31] font-[600]">Operating Areas :</h3>
          <p className="text-md font-[500] mt-1 text-[#697D95]">{agent.operatingAreas}</p>
        </div>
      </div>
      <div className="mt-2">
        <h3 className="text-base font-semibold text-[#252A31]">About</h3>
        <p className="text-sm font-[500] text-[#697D95]">{agent.about}</p>
      </div>
      <div className="flex gap-4 mt-4">
        <button
          onClick={handleViewDetails}
          className="px-4 py-2 bg-[#ECF8F7] hover:bg-[#BFE8E2] font-[600] text-[#007F6D] text-sm rounded-sm"
        >
          View Details
        </button>
        <button
          onClick={handleShowProperties}
          className="px-4 py-2 bg-[#00A991] font-[600] text-white text-sm rounded-sm"
        >
          Show Properties
        </button>
      </div>
    </div>
  );
}

export default function AgentListingPage() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(API_ENDPOINT)
      .then((response) => {
        if (response.data.success && Array.isArray(response.data.users)) {
          const filteredAgents = response.data.users.filter((user) => user.role === "agent");
          setAgents(filteredAgents.length ? filteredAgents : dummyAgent);
        } else {
          setAgents(dummyAgent);
        }
      })
      .catch(() => setAgents(dummyAgent));
  }, []);

  return (
    <>
      <Headers />
      <SmallCrumb />
      <div className="w-full min-h-screen bg-white">
        <h1 className="px-[10%] py-8 text-2xl font-medium text-left">
          {agents.length} results for Agents
        </h1>
        <div className="p-6 flex flex-col gap-6 items-center">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </>
  );
}
