import { useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import API from "../context/api";

const ScheduleVisitModal = ({ isOpen, onClose, property, propertyprice }) => {
  const { authToken } = useAuth();
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    message: "I am interested in this property",
    shareDetails: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authToken) {
      setError("You must be logged in to schedule a visit.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await API.post(
        `/visit/${property?._id}/schedule`,
        {
          visitDate: formData.date,
          visitTime: formData.time,
          message: formData.message,
          shareWithDealer: formData.shareDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Ensure the token is sent
          },
        }
      );

      console.log("Visit scheduled successfully:", response.data);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
    console.log("Auth Token:", authToken);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white w-[450px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center px-1 py-1 pb-2 pt-0 bg-black bg-opacity-85">
          <h2 className="text-lg font-medium text-white pl-1">
            Schedule Visit
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 pr-1"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-4 py-3 border-t border-b bg-gray-50">
          <h3 className="text-[#252A31] font-medium text-left">
            {property?.agentDetails?.Bulding || "Name of Building"}
          </h3>
          <p className="text-[#697D95] text-sm text-left">
            {property?.additionalDetails}
          </p>

          <div className="grid grid-cols-3 gap-4 mt-3 text-left">
            <div className="border-r pr-4">
              <h4 className="text-lg font-semibold">{propertyprice}</h4>
              <p className="text-sm text-gray-500">
                {property?.priceDetails?.pricePerSqFt}/sqft
              </p>
            </div>
            <div className="border-r px-4">
              <h4 className="text-lg font-semibold">
                {property?.location?.city}
              </h4>
              <p className="text-sm text-gray-500">
                {property?.location?.area}
              </p>
            </div>
            <div className="pl-4">
              <h4 className="text-lg font-semibold">{property?.flatType}</h4>
              <p className="text-sm text-gray-500">
                {property?.propertyStatus}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4">
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-rows gap-3">
              <div className="space-y-4 md:w-2/3 border-2 border-solid rounded-xl p-3">
                <h3 className="text-gray-700 font-medium text-left mb-3">
                  Select Date & Time
                </h3>
                <div>
                  <label className="block text-sm text-gray-600 text-left mb-1">
                    Select date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded text-sm bg-white text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 text-left mb-1">
                    Select time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded text-sm bg-white text-black"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4 basis-1/2">
                <textarea
                  name="message"
                  placeholder={formData.message}
                  onChange={handleChange}
                  className="w-full h-[220px] p-2 border border-gray-300 rounded text-sm resize-none bg-white text-black"
                />
              </div>
            </div>
            <label className="flex items-center gap-2 mb-4 mt-2">
              <input
                type="checkbox"
                name="shareDetails"
                checked={formData.shareDetails}
                onChange={handleChange}
                className="rounded border-gray-300 text-[#00A58E]"
              />
              <span className="text-sm text-gray-600">
                Share my details with Dealer
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-[120px] bg-[#00BFA5] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#00BFA5]/90 transition-colors flex justify-center"
            >
              {loading ? "Scheduling..." : "Schedule Visit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleVisitModal;
