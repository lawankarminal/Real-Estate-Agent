import { useState } from "react";
import axios from "axios";

const LoginModal = ({
  isOpen,
  onClose,
  onContinue,
  phoneNumber,
  setPhoneNumber,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Submitting phone number:", `+91${phoneNumber}`);

      const response = await axios.post(
        "http://localhost:5000/api/v1/send-otp",
        {
          phone: `+91${phoneNumber}`, // Ensure correct field name
        }
      );

      console.log("Response received:", response.data);

      if (response.data.success) {
        onContinue();
      } else {
        setError(response.data.message || "Failed to send OTP. Try again.");
      }
    } catch (err) {
      console.error("Error sending OTP:", err);

      if (err.response) {
        console.error("Server Response:", err.response.data);
        setError(err.response.data.message || "An error occurred.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-left">Login / Register</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">
              Please Enter your Phone Number
            </label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <span className="px-4 py-2 bg-gray-100 border-r">+91</span>
              <input
                type="tel"
                className="w-full px-4 py-2 outline-none focus:ring-2 focus:ring-[#00A58E]"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                pattern="[0-9]{10}"
                maxLength="10"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#00A58E] text-white py-2 rounded-lg hover:bg-[#008C75] transition-colors duration-200 mb-4"
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Continue"}
          </button>
        </form>

        <div className="flex items-center mb-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">Or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 mb-4">
          Continue with Email/Username
        </button>

        <p className="text-sm text-gray-500 text-left">
          Read{" "}
          <a
            href="#"
            className="text-[#00A58E] hover:underline"
            onClick={(e) => e.preventDefault()}
          >
            Terms and Conditions
          </a>
        </p>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200 text-lg"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
