import React, { useState } from "react";
import axios from "axios"; // Make sure to import axios
import { X } from "lucide-react";
import ViewDetailsModal from "./ViewDetailsModal";

const EnquiryModal = ({ isOpen, onClose, property, propertyprice }) => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    message: "I am interested in this property",
    reasonToBuy: "Investment",
    isPropertyDealer: false,
    termsAccepted: false,
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

  const [warning, setWarning] = useState(""); // State for warning message

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!property?._id) {
      console.error("Property ID is missing");
      return;
    }

    const {
      name,
      phoneNumber,
      email,
      message,
      reasonToBuy,
      isPropertyDealer,
      termsAccepted,
    } = formData;

    if (!termsAccepted) {
      alert("You must accept the Terms & Conditions.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/create/${property._id}`,
        {
          reasonToBuy,
          isPropertyDealer,
          name,
          phoneNumber,
          email,
          message,
          termsAccepted,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      console.log("API Response:", response.data);
      setShowViewDetails(true);
      setWarning(""); // Clear warning on success
    } catch (error) {
      console.error("Error submitting form:", error);

      // Handle login errors
      if (error.response?.status === 401) {
        setWarning("⚠️ Unauthorized! Please log in again.");
      } else if (error.response?.status === 403) {
        setWarning("⚠️ Access Denied! You do not have permission.");
      } else {
        setWarning("⚠️ Failed to submit! Enquiry already registered.");
      }

      // Automatically hide the warning after 2 seconds
      setTimeout(() => {
        setWarning("");
      }, 1500);
    }
  };

  const handleViewDetailsClose = () => {
    setShowViewDetails(false);
    onClose(); // Close the EnquiryModal after ViewDetailsModal is closed
  };

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

  if (!isOpen && !showViewDetails) return null;

  return (
    <>
      <div>
        {!showViewDetails && (
          <div>
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 md:p-0">
              <div className="bg-white w-full max-w-[550px] max-h-[90vh] overflow-y-auto relative">
                <div className="sticky top-0 z-10 bg-white">
                  <div className="flex justify-between items-center border-b pb-2 pt-0 bg-black bg-opacity-85 ">
                    <h2 className="text-base md:text-lg font-medium text-white pl-1">
                      Request for Enquiry and Advertiser Details.
                    </h2>
                    <button
                      onClick={onClose}
                      className="text-white hover:text-gray-200 pr-1"
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
                      {property?.dealer?.phone
                        ? `+91${property.dealer.phone}`
                        : "+91**89****09"}{" "}
                      | {property?.dealer?.email || "********@gmail.com"}
                    </p>
                    <p className="text-gray-600 text-left">
                      {property?.agentDetails?.name || "Unknown Dealer"}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0 md:text-right">
                    <p className="text-gray-500 text-left md:text-lg uppercase mb-1">
                      POSTED ON{" "}
                      {formatDate(property?.createdAt) || "Unknown Date"}
                    </p>
                    <p className="text-gray-700 text-left">
                      ₹ {propertyprice || "Price Not Available"} |{" "}
                      {property?.buildingName || "Building Name"}
                    </p>
                    <p className="text-gray-600 text-left">
                      {property?.priceDetails?.pricePerSqFt || "Unknown Area"}{" "}
                      SQ.FT. | {property?.flatType || "Unknown Type"}{" "}
                      Residential Apartment
                    </p>
                  </div>
                </div>

                <h2 className="text-white font-medium  md:text-lg text-left items-center border-b pb-4 pt-4 bg-black bg-opacity-90 pl-1 ">
                  Please fill your details to be shared with your advertiser
                  only.
                </h2>
                <div className="p-3">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-gray-700 font-medium text-left">
                      BASIC INFORMATION
                    </h3>

                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
                      <p className="text-gray-600 text-sm">
                        Your reason to buy is
                      </p>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="reasonToBuy"
                            checked={formData.reasonToBuy === "Investment"}
                            onChange={() =>
                              handleRadioChange("reasonToBuy", "Investment")
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
                            name="reasonToBuy"
                            checked={formData.reasonToBuy === "Self Use"}
                            onChange={() =>
                              handleRadioChange("reasonToBuy", "Self Use")
                            }
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
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="isPropertyDealer"
                            checked={formData.isPropertyDealer === true}
                            onChange={() =>
                              handleRadioChange("isPropertyDealer", true)
                            }
                            className="peer/draft"
                          />
                          <span className="text-sm peer-checked/draft:text-primary">
                            Yes
                          </span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="isPropertyDealer"
                            checked={formData.isPropertyDealer === false}
                            onChange={() =>
                              handleRadioChange("isPropertyDealer", false)
                            }
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
                          name="phoneNumber"
                          placeholder="Ph. Number"
                          value={formData.phoneNumber}
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
                          name="termsAccepted"
                          checked={formData.termsAccepted}
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
                      <div className="flex gap-8">
                        <button
                          type="submit"
                          className="w-[120px] bg-[#00BFA5] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#00BFA5]/90 transition-colors"
                          disabled={!formData.termsAccepted}
                        >
                          Submit Enquiry
                        </button>

                        {warning && (
                          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-1 mb-1">
                            {warning}
                          </div>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        <ViewDetailsModal
          isOpen={showViewDetails}
          onClose={handleViewDetailsClose}
          propertyprice={propertyprice}
          property={property}
        />
      </div>
    </>
  );
};

export default EnquiryModal;
