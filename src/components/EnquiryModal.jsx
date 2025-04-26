import React, { useState } from "react";
import { X } from "lucide-react";
import ViewDetailsModal from "./ViewDetailsModal";

const EnquiryModal = ({ isOpen, onClose, property }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "I am interested in this property",
    reason: "investment",
    isDealer: false,
    agreeToTerms: false,
  });
  const [showViewDetails, setShowViewDetails] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRadioChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setShowViewDetails(true); // Show the ViewDetailsModal
  };

  const handleViewDetailsClose = () => {
    setShowViewDetails(false);
    onClose(); // Close the EnquiryModal after ViewDetailsModal is closed
  };

  if (!isOpen && !showViewDetails) return null;

  return (
    <>
      {!showViewDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 md:p-0">
          <div className="bg-white  w-full max-w-[550px] max-h-[90vh] overflow-y-auto relative">
            <div className="sticky top-0 z-10 bg-white">
              <div className="flex justify-between items-center border-b pb-2 pt-0 bg-black bg-opacity-85 ">
                <h2 className="text-base md:text-lg font-medium text-white">
                  Request for Enquiry and Advertiser Details.
                </h2>
                <button
                  onClick={onClose}
                  className="text-white hover:text-gray-200"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="bg-gray-50 p-2 text-sm border-b flex flex-col md:flex-row justify-between">
              <div>
                <p className="text-gray-500 text-left md:text-lg uppercase mb-1">
                  POSTED BY DEALER:
                </p>
                <p className="text-gray-700">
                  +91**83****09 | *******@gmail.com
                </p>
                <p className="text-gray-600 text-left">Avi Patel</p>
              </div>
              <div className="mt-2 md:mt-0 md:text-right">
                <p className="text-gray-500 text-left md:text-lg uppercase mb-1">
                  POSTED ON 04TH JAN 2025
                </p>
                <p className="text-gray-700 text-left">
                  ₹ 51.58 lac | Building Name
                </p>
                <p className="text-gray-600 text-left">
                  1050 SQ FT | 2BHK Residential Apartment
                </p>
              </div>
            </div>

            <h2 className="text-white font-medium  md:text-lg text-left items-center border-b pb-4 pt-4 bg-black bg-opacity-90 ">
              Please fill your details to be shared with your advertiser only.
            </h2>
            <div className="p-3">
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-gray-700 font-medium text-left">
                  BASIC INFORMATION
                </h3>

                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
                  <p className="text-gray-600 text-sm">Your reason to buy is</p>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="reason"
                        checked={formData.reason === "investment"}
                        onChange={() =>
                          handleRadioChange("reason", "investment")
                        }
                        className="peer/draft"
                      />
                      <span className="text-sm peer-checked/draft:text-primary">
                        Investment
                      </span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="reason"
                        checked={formData.reason === "self-use"}
                        onChange={() => handleRadioChange("reason", "self-use")}
                        className="peer/draft"
                      />
                      <span className="text-sm peer-checked/draft:text-primary">
                        Self Use
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
                  <p className="text-black text-sm">
                    Are you a property dealer
                  </p>
                  <div className="flex  items-center gap-4">
                    <label for="draft" className="  flex items-center gap-2 ">
                      <input
                        type="radio"
                        id="draft"
                        name="isDealer"
                        checked={formData.isDealer === true}
                        onChange={() => handleRadioChange("isDealer", true)}
                        className="peer/draft"
                      />
                      <span className="text-sm peer-checked/draft:text-primary">
                        Yes
                      </span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="isDealer"
                        checked={formData.isDealer === false}
                        onChange={() => handleRadioChange("isDealer", false)}
                        className="peer/draft"
                      />
                      <span className="text-sm peer-checked/draft:text-primary">
                        No
                      </span>
                    </label>
                  </div>
                </div>
                <div className="flex flex-rows gap-3">
                  <div className="space-y-4  md:w-1/2 ">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded text-sm bg-white text-black"
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Ph. Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded text-sm bg-white text-black"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded text-sm bg-white text-black"
                      required
                    />
                  </div>
                  <div className="space-y-4 basis-1/2 ">
                    <textarea
                      name="message"
                      placeholder={formData.message}
                      onChange={handleChange}
                      className="w-full h-[150px] p-2 border border-gray-300 rounded text-sm resize-none bg-white text-black"
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-4">
                  <label className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="mt-1 bg-white"
                      required
                    />
                    <span className="text-xs text-black">
                      I agree to the{" "}
                      <a href="#" className="text-primary">
                        Terms & Conditions
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-primary">
                        Privacy Policy
                      </a>
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="w-[120px] bg-[#00BFA5] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#00BFA5]/90 transition-colors"
                    disabled={!formData.agreeToTerms}
                  >
                    View Details
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <ViewDetailsModal
        isOpen={showViewDetails}
        onClose={handleViewDetailsClose}
      />
    </>
  );
};

export default EnquiryModal;
