import { PieChart, Pie, Cell, Tooltip } from "recharts";
import image from "../assets/image.png";
import { useParams, useNavigate } from "react-router-dom";
import Headers from "./Headers";
import SmallCrumb from "./SmallCrumb";
import { dummyAgent, dummyChartData } from "../DonotUsedata/dummyAgentData"; // <-- import your dummy data

export default function AgentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const agent = dummyAgent.find((agent) => agent.id === id) || dummyAgent[0];
  const chartData = dummyChartData;
  const totalProperties = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <>
      <Headers />
      <div className="bg-white min-h-screen">
        <SmallCrumb />
        <div className="flex p-6 mt-5 flex-col justify-between lg:flex-row gap-4 max-w-[65rem] mx-auto">
          {/* Left Section */}
          <div className="flex-[0.6] border border-gray-100 p-6 md:p-12 bg-[#F9F9F9] text-left rounded shadow h-auto">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <img
                className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] border border-gray-300 rounded object-cover"
                src={agent.image || image}
                alt="Agent"
              />
              <div className="flex flex-col gap-1 text-center sm:text-left">
                <h2 className="text-lg sm:text-xl text-[#252A31] font-semibold">{agent.name}</h2>
                <p className="text-sm sm:text-lg text-[#697D95]">{agent.locality}</p>
                <div>
                  <p className="text-sm font-medium text-[#697D95]">
                    <span className="text-[#252A31]">{agent.propertiesForSale}</span> Properties for sale
                  </p>
                  <p className="text-sm font-medium text-[#697D95]">
                    <span className="text-[#252A31]">{agent.propertiesForRent}</span> Properties for rent
                  </p>
                </div>
              </div>
            </div>

            {/* Operating Areas */}
            <div className="mt-6">
              <h3 className="text-lg sm:text-xl font-semibold">Operating Areas :</h3>
              <p className="text-sm sm:text-lg font-medium text-[#697D95] mt-1">
                {agent.operatingAreas}
              </p>
            </div>

            {/* About Section */}
            <div className="mt-4">
              <h3 className="font-semibold text-lg sm:text-xl">About</h3>
              <p className="text-sm sm:text-lg font-medium text-[#697D95] mt-1">
                {agent.about}
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-[0.45] border border-gray-100 md:p-14 bg-[#F9F9F9] rounded shadow h-auto">
            <h3 className="font-semibold text-[#252A31] text-lg text-center sm:text-left mb-4">Property Insights</h3>

            {/* Legend */}
            <div className="mt-4 grid grid-cols-2 gap-y-4 gap-x-2">
              {chartData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-base text-[#4F5E71] font-medium">{item.name}</span>
                </div>
              ))}
            </div>

            {/* Pie Chart */}
            {totalProperties === 0 ? (
              <p className="text-center text-[#697D95] mt-6">No property status data available</p>
            ) : (
              <PieChart width={250} height={250} className="mt-6 mx-auto">
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={110}
                  outerRadius={125}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <text
                  x="50%"
                  y="45%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-lg sm:text-xl text-[#004D41] font-semibold"
                >
                  {totalProperties}
                </text>
                <text
                  x="50%"
                  y="55%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-lg sm:text-xl text-[#004D41] font-semibold"
                >
                  Properties Listed
                </text>
                <Tooltip />
              </PieChart>
            )}

            <a
              href="#"
              className="block font-medium w-[90%] text-center py-1 bg-[#00A58E] text-white rounded mt-8 mx-auto"
            >
              View Contact Details
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-6xl mx-auto mt-auto pb-6">
          <button
            onClick={() => navigate("/agents")}
            className="py-1 font-medium px-10 bg-[#ECF8F7] text-[#007F6D] border rounded text-center"
          >
            Back to list of Dealers
          </button>
          <button
            onClick={() => navigate(`/agents/${id}/properties`)}
            className="py-1 px-14 bg-[#00A58E] font-medium text-white rounded text-center"
          >
            View Properties
          </button>
        </div>
      </div>
    </>
  );
}
