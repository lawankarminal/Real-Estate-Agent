import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const LoginSuccessModal = ({ isOpen, onClose, token }) => {
  const { login } = useAuth();

  useEffect(() => {
    if (isOpen && token) {
      login(token); // Store token in localStorage & update state
      setTimeout(() => {
        onClose(); // Auto-close modal after 1.5s
      }, 1500);
    }
  }, [isOpen, token, login, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200 text-2xl"
        >
          &times;
        </button>
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-2 text-center">
          Logged in Successfully!
        </h2>
        <div className="text-center">
          <p className="text-gray-600">Welcome back</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSuccessModal;
