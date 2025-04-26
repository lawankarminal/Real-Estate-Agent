import { useState } from "react";
import { X } from "lucide-react";

const ScheduleVisitModal = ({ isOpen, onClose, property }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    message: "I am interested in this property",
    shareDetails: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Schedule visit form submitted:", formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white  w-[450px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center px-1 py-1 pb-2 pt-0 bg-black bg-opacity-85">
          <h2 className="text-lg font-medium text-white ">Schedule Visit</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X size={18} />
          </button>
        </div>

        <div className="px-4 py-3 border-t border-b bg-gray-50">
          <h3 className="text-[#252A31] font-medium text-left">
            {property?.name || "Property"}
          </h3>
          <p className="text-[#697D95] text-sm text-left">
            {property?.description}
          </p>

          <div className="grid grid-cols-3 gap-4 mt-3">
            <div className="border-r pr-4">
              <h4 className="text-lg font-semibold">{property?.price}</h4>
              <p className="text-sm text-gray-500">{property?.pricePerSqft}</p>
            </div>
            <div className="border-r px-4">
              <h4 className="text-lg font-semibold">{property?.area}</h4>
              <p className="text-sm text-gray-500">Super Built-up Area</p>
            </div>
            <div className="pl-4">
              <h4 className="text-lg font-semibold">{property?.type}</h4>
              <p className="text-sm text-gray-500">{property?.status}</p>
            </div>
          </div>
        </div>

        <div className="pb-2 pt-2 bg-black bg-opacity-90"> </div>

        <div className="p-4">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-rows gap-3">
              <div className=" space-y-4 md:w-2/3 border-2 border-solid rounded-xl p-3 ">
                <h3 className="text-gray-700 font-medium text-left mb-3">
                  Select Date & Time
                </h3>
                <div>
                  <div>
                    <label className="block text-sm text-gray-600 text-left mb-1 ">
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
                    <label className="block text-sm text-gray-600 text-left mb-1 ">
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
              className="w-[120px] bg-[#00BFA5] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#00BFA5]/90 transition-colors flex flex-col"
            >
              Schedule Visit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleVisitModal;
