import React, { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";

const LoginSystem = () => {
  // Reference to hidden file input element
  const fileInputRef = useRef(null);
  const { logout } = useAuth();

  // State to manage user data
  const [userData, setUserData] = useState({
    name: "Mahi Sharma",
    email: "mahisharma01@gmail.com",
    phone: "1234567890",
    profilePicture: null,
  });

  // State to control popup visibility
  const [showLoginPopup, setShowLoginPopup] = useState(true);
  const [showPersonalInfoPopup, setShowPersonalInfoPopup] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  // Handler for saving user data
  const handleSaveUserData = (updatedData) => {
    setUserData(updatedData);
    setShowPersonalInfoPopup(false);
  };

  // Handler for logout
  const handleLogout = () => {
    setShowLogoutConfirmation(false);
    setShowLoginPopup(false);
    // Add actual logout logic here
    console.log("User logged out");
  };

  // Handler for profile picture upload button click
  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  // Handler for when a file is selected
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserData({
          ...userData,
          profilePicture: event.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex  ">
      {/* Main Login Popup */}
      {showLoginPopup && (
        <div className="absolute top-0  left-[65%] transform -translate-x-1/2 bg-white w-64 rounded-lg shadow-md z-50">
          {/* User Profile Section */}
          <div className="flex items-center p-4 border-b border-gray-200">
            <div className="relative mr-3">
              <div className="h-12 w-12 rounded-full overflow-hidden">
                {userData.profilePicture ? (
                  <img
                    src={userData.profilePicture}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src="/api/placeholder/48/48"
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-gray-800">{userData.name}</span>
              <span className="text-sm text-gray-600">{userData.email}</span>
              <span className="text-sm text-gray-600">{userData.phone}</span>
            </div>
          </div>

          {/* Personal Info Section with Button */}
          <button
            onClick={() => setShowPersonalInfoPopup(true)}
            className="flex items-center px-4 py-3 border-b border-gray-200 w-full text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex-1 z-50">
              <span className="text-gray-500">Personal Info</span>
              <div className="text-xs text-gray-400">
                name, email, contact....
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </button>

          {/* Log out Section with Button */}
          <button
            onClick={() => setShowLogoutConfirmation(true)}
            className="flex items-center px-4 py-3 w-full text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex-1">
              <span className="text-red-500 font-medium">Log out</span>
            </div>
            <div className="text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4a1 1 0 10-2 0v6.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L14 13.586V7z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </button>
        </div>
      )}

      {/* Edit Personal Information Popup */}
      {showPersonalInfoPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center  z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl text-gray-500 font-normal">
                Edit Personal Information
              </h2>
              <button
                onClick={() => setShowPersonalInfoPopup(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Upload Profile Picture */}
              <div className="flex flex-col items-center mb-6">
                <button
                  onClick={handleUploadButtonClick}
                  className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-2 cursor-pointer hover:bg-gray-300 transition-colors"
                >
                  {userData.profilePicture ? (
                    <img
                      src={userData.profilePicture}
                      alt="Profile"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                  )}
                </button>
                <p className="text-sm text-gray-600">
                  Upload Your Profile picture{" "}
                  <span className="text-gray-400">(Optional)</span>
                </p>

                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={userData.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    readOnly
                  />
                  <input
                    type="text"
                    placeholder="Enter New Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    id="newName"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="email"
                    value={userData.email}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    readOnly
                  />
                  <input
                    type="email"
                    placeholder="Updated Email ID"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    id="newEmail"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={userData.phone}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    readOnly
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => {
                    const newName = document.getElementById("newName").value;
                    const newEmail = document.getElementById("newEmail").value;
                    const newPhone = document.getElementById("newPhone").value;

                    const updatedData = {
                      name: newName || userData.name,
                      email: newEmail || userData.email,
                      phone: newPhone || userData.phone,
                      profilePicture: userData.profilePicture,
                    };

                    handleSaveUserData(updatedData);
                  }}
                  className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-10 rounded-md transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Popup */}
      {showLogoutConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-sm rounded-lg shadow-lg p-8">
            {/* Heading */}
            <h2 className="text-2xl font-medium text-center text-gray-800 mb-4">
              Log out
            </h2>

            {/* Confirmation text */}
            <p className="text-center text-gray-600 mb-6">
              Are you sure want to log out?
            </p>

            {/* Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-8 rounded"
              >
                Log Out
              </button>

              <button
                onClick={() => setShowLogoutConfirmation(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-8 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginSystem;
