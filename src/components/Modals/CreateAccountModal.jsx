import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateAccountModal = ({
  isOpen,
  onClose,
  phoneNumber,
  fullName,
  setFullName,
  email,
  setEmail,
  isAgent,
  setIsAgent,
  agreedToTerms,
  setAgreedToTerms,
  onCreateAccount,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/v1/signup", {
        phone: `+91${phoneNumber}`, // Match backend field
        name: fullName, // Match backend field
        email,
        isAgent,
        agreedToTerms, // Ensure this is included
      });

      console.log("Signup Response:", response.data);

      if (response.data.success) {
        onCreateAccount(response.data.token);
        navigate("/");
      } else {
        setError(response.data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
        <h2 className="text-2xl font-bold mb-4 text-left">Create Account</h2>

        <form onSubmit={handleCreateAccount}>
          <div className="space-y-4">
            {/* Full Name Input */}
            <div>
              <input
                type="text"
                placeholder="Full name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <input
                type="email"
                placeholder="Email Id"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Phone Number Field */}
            <div>
              <div className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-700">
                <label className="text-gray-500 text-sm">Phone Number</label>
                <div>+91 {phoneNumber}</div>
              </div>
              <div className="flex mt-1 items-center">
                <button
                  type="button"
                  className="text-[#00BFA5] text-sm hover:underline transition-colors flex items-center"
                  onClick={() => {
                    onClose();
                    navigate("/LoginModal.jsx");
                  }}
                >
                  Change number
                  <span className="ml-1 w-4 h-4 rounded-full border border-[#00BFA5] inline-flex items-center justify-center text-xs text-[#00BFA5]">
                    i
                  </span>
                </button>
              </div>
            </div>

            {/* Agent Selection */}
            <div className="pt-2">
              <p className="text-black mb-2">Are you a Real Estate Agent?</p>
              <div className="flex gap-4 justify-start">
                <button
                  type="button"
                  className={`py-2 px-10 rounded-lg border text-sm text-left ${
                    isAgent
                      ? "bg-[#E5F7F4] border-[#00BFA5] text-[#00BFA5]"
                      : "bg-white border-gray-300 text-gray-700"
                  } transition-colors duration-200`}
                  onClick={() => setIsAgent(true)}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`py-1 px-10 rounded-lg border text-sm text-left ${
                    !isAgent
                      ? "bg-[#E5F7F4] border-[#00BFA5] text-[#00BFA5]"
                      : "bg-white border-gray-300 text-gray-700"
                  } transition-colors duration-200`}
                  onClick={() => setIsAgent(false)}
                >
                  No
                </button>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="pt-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 rounded border-gray-300"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  required
                />
                <span className="text-sm">
                  I agree to the{" "}
                  <a href="#" className="text-[#00BFA5]">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#00BFA5]">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#00BFA5] text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors duration-200 mt-4"
              disabled={loading || !agreedToTerms}
            >
              {loading ? "Creating Account..." : "Continue"}
            </button>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm text-center mt-2">{error}</p>
            )}
          </div>
        </form>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default CreateAccountModal;
